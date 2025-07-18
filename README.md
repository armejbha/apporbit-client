# 🚀 AppOrbit

AppOrbit is a full-stack MERN application that allows users to discover, share, and review innovative tech products including AI tools, web apps, mobile apps, games, and more—similar to [Product Hunt](https://producthunt.com). It features role-based access (User, Moderator, Admin), product moderation, premium membership subscriptions via Stripe, and more.

## 🌐 Live Site

[👉 Visit AppOrbit Live](https://app-orbit69.web.app/)

## 🔐 Admin Credentials

- **Email**: `admin@gmail.com`  
- **Password**: `Admin0`

## 📚 Features

### 🚦 Authentication & Authorization
- Firebase authentication (Email/Password + Google)
- Role-based access control (User, Moderator, Admin)
- JWT-based route protection

### 🧑 User Features
- Submit one product (limit lifted after subscribing)
- Upvote/downvote tech products
- Review and report products
- View product details (private route)
- Responsive and mobile-friendly design

### 🧑‍💻 Moderator Features
- Approve/reject submitted products
- Manage reported content
- Mark products as featured

### 👑 Admin Features
- Dashboard with pie chart statistics
- Manage users (promote to Moderator/Admin)
- Manage coupons for membership discount

### 💳 Payment Integration
- Stripe checkout for premium membership
- Use coupon codes for discounts

### 🔍 Advanced Product Listing
- Full search system based on tags
- Backend-powered pagination
- Trending and featured product sections

### ✨ Extra Features
- Downvote functionality
- Rising Products carousel (10+ upvotes)
- Coupon Carousel
- Framer Motion animations
- Loading spinners on data fetch
- Dynamic dashboard layouts

---

## 💻 Tech Stack

| Category          | Technology Used                        |
|-------------------|----------------------------------------|
| **Frontend**      | React.js, Tailwind CSS, DaisyUI        |
| **Backend**       | Node.js, Express.js                    |
| **Database**      | MongoDB                                |
| **Auth**          | Firebase Authentication                |
| **API & Query**   | React Query (TanStack Query)           |
| **Charting**      | Recharts (Pie Chart)                   |
| **Animation**     | Framer Motion                          |
| **Forms**         | React Hook Form                        |
| **Payment**       | Stripe                                 |
| **Routing**       | React Router DOM                       |
| **Others**        | React Toastify, SweetAlert2, AOS       |

---

## 📦 Main NPM Packages Used

```bash
"axios"
"firebase"
"jsonwebtoken"
"react"
"react-dom"
"react-router"
"sweetalert2"
"react-icons"
"@tanstack/react-query"
"react-tag-input"
"framer-motion"
"recharts"
"stripe"
"swiper"

🛠️ Project Setup
🚗 Client Side

cd client
npm install
npm run dev




🌍 Environment Variables
Both client and server use .env files to protect Firebase and MongoDB credentials.

Client .env:


VITE_API_URL= https://apporbit-server-ruddy.vercel.app/apps
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...