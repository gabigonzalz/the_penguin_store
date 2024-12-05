# 🐧 Penguin Store - Online Store & Admin Panel

Welcome to the **Penguin Store**! This project is an online store application with a front-end for customers and a back-end admin panel to manage orders and products.

## 📖 Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Future Enhancements](#future-enhancements)

---

## 🎯 Features

### Frontend:
- View available products.
- Browse detailed product descriptions.
- Place and confirm orders with a streamlined interface.

### Backend:
- User authentication with JWT.
- Product and order management.
- Secure API endpoints for frontend communication.
- Admin dashboard for order and product tracking.

---

## 🛠️ Technologies Used

### Frontend:
- **HTML** and **CSS** for layout and styling.
- **Go** for backend server logic and template rendering.
- **MongoDB** for database management.

### Backend:
- **Node.js** with **Express.js** for server-side logic.
- **MongoDB** as the primary database.
- **JWT** for user authentication.

---

## 🚀 Setup Instructions

### Prerequisites
1. Install [Go](https://golang.org/dl/) for the frontend server.
2. Install [Node.js](https://nodejs.org/) for the backend server.
3. Install and configure [MongoDB](https://www.mongodb.com/) locally.

### Steps
1. **Frontend Setup**
   - Navigate to the `frontend` directory.
   - Update the `.env` file with your MongoDB URI:
     ```bash
     DB_URI=mongodb://localhost:27017/Online_Store
     ```
   - Run the server:
     ```bash
     go run main.go
     ```
   - Visit the frontend at `http://localhost:8080`.

2. **Backend Setup**
   - Navigate to the `backend` directory.
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the server:
     ```bash
     npm start
     ```
   - Access the admin panel at `http://localhost:3000/login`.

---

## 📂 Project Structure

### Frontend:
- **`main.go`**: Entry point for the Go server.
- **HTML Templates**: Located in the `templates` folder.
- **MongoDB Collections**:
  - `products`: Stores product details.
  - `orders`: Tracks customer orders.

### Backend:
- **Controllers**: Manage application logic (`authController.js`, `orderController.js`, `productController.js`).
- **Routes**: Define API endpoints for admin functionalities.
- **Middleware**: Authentication using JWT.
- **Views**: Templates for login, dashboard, and management.

---

## 🛒 Usage

### For Customers:
1. Visit the store homepage.
2. Browse products and view details.
3. Place orders and confirm them.

### For Admins:
1. Log in using admin credentials.
2. Manage products and orders via the dashboard.

---

## 🚀 Future Enhancements
- Implement a more user-friendly front-end design.
- Add payment gateway integration.
- Introduce user role-based access in the admin panel.

---

## 📞 Contact

For questions or support, please contact [Your Name](mailto:your.email@example.com).

---

Enjoy using **Penguin Store**! 🐧
