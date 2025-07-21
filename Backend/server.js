const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../Frontend")));

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/restaurant", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// Order model
const orderSchema = new mongoose.Schema({
  customerName: String,
  tableNumber: String,
  items: [String],
  total: Number,
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model("Order", orderSchema);

// Create a new order
app.post("/api/orders", async (req, res) => {
  try {
    const { customerName, tableNumber, items } = req.body;

    const itemPrices = {
      "Pizza": 200,
      "Burger": 120,
      "Pasta": 150,
      "Cold Drink": 50,
      "Fries": 80,
      "Sandwich": 90
    };

    const total = items.reduce((sum, item) => sum + (itemPrices[item] || 0), 0);

    const newOrder = new Order({
      customerName,
      tableNumber,
      items,
      total,
      status: "Pending"
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    console.error("❌ Error placing order:", err);
    res.status(400).json({ message: "Failed to place order." });
  }
});

// Get all orders
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("❌ Error fetching orders:", err);
    res.status(500).json({ message: "Error loading orders." });
  }
});

// Update order status
app.patch("/api/orders/:id/status", async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error("❌ Error updating order:", err);
    res.status(400).json({ message: "Failed to update status." });
  }
});

// Serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
