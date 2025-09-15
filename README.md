# Shoplio – E-commerce Website

A modern, responsive e-commerce website built with React.js, and styled using **Tailwind CSS**. Shoplio allows users to browse products add items to the cart and place orders seamlessly.

This project is intended as a learning and demonstration project for full-stack web development.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- User authentication (Sign up / Login / Logout)
- Browse products by category
- Product search and filtering
- Add to cart & manage cart items
- Place orders and view order history
- Responsive design for mobile, tablet, and desktop
- Interactive UI with Tailwind CSS and animations
- Secure backend with Node.js and Express
- MongoDB database for storing users, products, and orders

---

## Technologies Used

- **Frontend:** React.js, Tailwind CSS, DaisyUI, Vite
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Others:** JWT for authentication, Axios for API requests, React Router for routing

---

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/shoplio.git
cd shoplio
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

---

## Running the Project

### Development Mode

```bash
npm run dev
```

- Opens the website on `http://localhost:5173`
- Hot reload enabled for live changes

### Production Build

```bash
npm run build
```

- Generates a `dist/` folder ready for deployment

---

## Project Structure

```
shoplio/
├─ src/
│  ├─ components/      # Reusable React components
│  ├─ pages/           # Individual page components
│  ├─ assets/          # Images, fonts, CSS
│  └─ App.jsx          # Main React component
├─ server/             # Backend server (Node.js + Express)
│  ├─ controllers/
│  ├─ models/
│  └─ routes/
├─ package.json
├─ vite.config.js
└─ index.html
```

---

## Screenshots

![Home Page](screenshots/home.png)
![Product Page](screenshots/product.png)
![Cart Page](screenshots/cart.png)

## Future Improvements

- Add payment integration (Stripe, PayPal)
- Implement product reviews and ratings
- Add user profile management
- Enhance UI with animations and advanced filters
- Deploy a fully functional live version

---

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature-name`)
3. Make your changes
4. Commit your changes (`git commit -m "Description"`)
5. Push to the branch (`git push origin feature-name`)
6. Open a pull request

---

## License

This project is for learning and demonstration purposes. You are free to modify, distribute and use it for personal or educational purposes.
