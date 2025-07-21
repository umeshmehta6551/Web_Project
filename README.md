# 🍽️ Restaurant Management System

This is a full-stack restaurant management web application built using **HTML/CSS/JS (Frontend)**, **Node.js + Express (Backend)**, and **MongoDB** as the database. It allows staff to place orders, manage order statuses, view current/completed orders, and generate PDF bills.

---

## 🚀 Features

- ✅ Place new customer orders with menu items.
- 📋 View all current (Pending) orders.
- ✔️ Mark orders as "Completed".
- 🧾 Generate downloadable PDF bills.
- 📜 View completed order history.

---

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Localhost)
- **PDF Generation**: jsPDF

---

## 📂 Folder Structure

Restaurant_Management_System/
├── backend/
│ ├── server.js
│ ├── models/
│ │ └── Order.js
│ ├── routes/
│ │ └── order.js
├── Frontend/
│ ├── index.html
│ ├── order.html
│ ├── order-history.html
│ ├── generate-bill.html
│ ├── inventory.html
│ └── notifications.html
├── README.md
└── package.json

## 🔧 Prerequisites

Make sure you have the following installed on your system:

- [Node.js & npm](https://nodejs.org/)
- [MongoDB Community Edition](https://www.mongodb.com/try/download/community)

---

## 🛠️ Project Setup

### 1. Clone the repository/download

```bash
git clone https://github.com/your-username/restaurant-management-system.git
cd restaurant-management-system/backend

### after download chnage dir to backend 
cd backend
and then write in terminal npm start 

or

### 2. Install dependencies

npm install

### 3. Start MongoDB locally
Make sure MongoDB is running on the default port:

mongod

### 4. Start the backend server
npm start

🌐 Access Frontend Pages
Open any of the following in your browser:

http://localhost:5000/index.html

http://localhost:5000/order.html

http://localhost:5000/order-history.html

http://localhost:5000/generate-bill.html

📦 Dependencies
express

mongoose

cors

body-parser

nodemon (for development)

