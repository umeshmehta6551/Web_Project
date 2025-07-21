const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Order = mongoose.model("Order", new mongoose.Schema({
  customerName: String,
  tableNumber: String,
  items: [String],
  total: Number,
  status: { type: String, default: "Pending" },
  createdAt: {
    type: Date,
    default: Date.now
  }
}));

// Create order
router.post("/", async (req, res) => {
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
      total
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    console.error("❌ Failed to create order:", err);
    res.status(500).json({ message: "Error creating order" });
  }
});

// Get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders" });
  }
});

// Update order status
router.patch("/:id/status", async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ message: "Failed to update order status" });
  }
});

module.exports = router;
