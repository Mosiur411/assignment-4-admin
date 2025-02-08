# Bike Shop Admin Panel

## Overview
The **Bike Shop Admin Panel** is a role-based management system built with **React.js** and **TypeScript**. It provides administrators with the ability to manage users, products, and orders efficiently.

## Features

### 1. **User Management**
- View a list of registered users.
- Deactivate or activate user accounts.
- Assign or remove admin roles manually.

### 2. **Product Management**
- Create, Read, Update, and Delete (CRUD) products.
- Search products by name, brand, model, or category.
- Implement stock management to track product availability.

### 3. **Order Management**
- View all placed orders.
- Update order statuses (Pending, Processing, Shipped, Delivered).
- Assign estimated delivery dates.
- Ensure stock is available before confirming orders.

### 4. **Authentication & Security**
- Secure login using **JWT authentication**.
- Admin access control using role-based authentication.
- Logout functionality to clear session data.

### 5. **Dashboard Overview**
- Display key statistics such as total users, total orders, and product stock levels.
- Provide graphical insights into sales and inventory.

### 6. **Error Handling & UI Enhancements**
- Show meaningful error messages for invalid actions.
- Implement loaders and toasts for smooth user experience.
- Ensure fully responsive design for desktop and mobile devices.

## Tech Stack
- **Frontend:** React.js, TypeScript, Tailwind CSS
- **State Management:** React Context API / Redux (if required)
- **Authentication:** JWT (JSON Web Token)
- **API Calls:** Fetch / Axios (connected to Node.js backend)
- **UI Components:** React Icons, Toast notifications, Modals

## Installation & Setup
### Prerequisites
Ensure you have **Node.js** and **npm** installed on your machine.

### Live Site Admin Panel
Live: [Site](https://bikeshopadmin.vercel.app/) https://bikeshopadmin.vercel.app

### Steps to Run the Admin Panel
1. Clone the repository:
   ```bash
   git clone https://github.com/Mosiur411/bikeshopserver.git
   cd bike-shop-admin
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add the following variables:
   ```env
   REACT_APP_API_BASE_URL=http://localhost:5000/api
   REACT_APP_JWT_SECRET=your_secret_key
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open `http://localhost:3000` in your browser to access the admin panel.

## API Endpoints (Admin-Specific)
| Method | Endpoint            | Description                     |
|--------|---------------------|---------------------------------|
| GET    | `/users`            | Fetch all registered users     |
| PATCH  | `/users/:id`        | Update user role/status        |
| GET    | `/products`         | Fetch all products             |
| POST   | `/products`         | Add a new product              |
| PUT    | `/products/:id`     | Update product details         |
| DELETE | `/products/:id`     | Delete a product               |
| GET    | `/orders`           | Fetch all orders               |
| PATCH  | `/orders/:id`       | Update order status            |

## Deployment
To deploy the admin panel on **Vercel**:
1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```
2. Login to Vercel:
   ```bash
   vercel login
   ```
3. Deploy:
   ```bash
   vercel --prod
   ```

## Contribution
If you'd like to contribute:
- Fork the repository.
- Create a feature branch (`git checkout -b feature-name`).
- Commit your changes (`git commit -m 'Add feature'`).
- Push to the branch (`git push origin feature-name`).
- Open a pull request.

## License
This project is licensed under the MIT License.

