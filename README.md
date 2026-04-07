# Northern Tours - Premium Homestay Booking Platform

Northern Tours is a modern, full-stack Homestay/Offbeat destination booking application designed to showcase the authentic heartbeat of the mountains. Built with the MERN stack (MongoDB, Express.js, React, Node.js), it provides a seamless and visually stunning experience for travelers searching for unique stays in North India.

## 🏔️ Project Overview

Northern Tours connects guests with vetted properties and local hosts, focusing on the beauty of Kalimpong, Nimbong, and beyond. The platform features a premium user interface with interactive elements, direct host communication, and a robust administrative dashboard.

## ✨ Core Features

### 💎 Frontend (React + Vite)
- **High-End Landing Page**: Features a glassmorphic search hub and smooth scroll animations.
- **Dynamic Search**: Instantly find properties by destination, stay duration, and guest count.
- **Inquiry-Based Booking**: A streamlined "Book Now" flow where users send inquiries directly to the platform.
- **Direct Host Connectivity**: Quick-access "WhatsApp" and "Call" buttons to reach hosts (+91 logic included).
- **Interactive Details**: Premium image galleries, detailed descriptions, and localized amenity tracking.
- **Responsive Mastery**: Fully optimized for mobile, tablet, and desktop viewports.
- **Elegant Animations**: Powered by Framer Motion for a fluid, luxurious feel.

### 🛠️ Backend (Node.js + Express)
- **Robust REST API**: Comprehensive endpoints for property discovery, simplified inquiries, and administrative oversight.
- **JWT Authentication**: Secure user and admin login with role-based access control (RBAC).
- **MERN Architecture**: Clean separation of concerns with Mongoose schemas for Users, Properties, and Bookings.
- **Seeding Support**: Built-in script to quickly populate the database with real-world mountain properties.

### 🛡️ Administrative Dashboard
- **Analytics Overview**: Real-time revenue charts and inventory tracking.
- **Inventory Management**: Create, edit, and delete properties with a rich amenity list (Kanchanjunga View, Bonfire, Barbeque, etc.).
- **Booking Management**: View and update the status of guest inquiries (Pending, Confirmed, Cancelled).
- **Master Admin Access**: Centralized control via a dedicated admin account.

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion, Zustand, React Day Picker, Heroicons, Recharts.
- **Backend**: Node.js, Express.js, MongoDB (Atlas/Local), JWT, Bcrypt.js, Cloudinary (Image management).

---

## 🚀 Getting Started (Local Setup)

Follow these steps to run Northern Tours on your local machine.

### 1. Prerequisites
- **Node.js** (v16.x or higher)
- **npm** or **yarn**
- **MongoDB** (Local instance or MongoDB Atlas cluster)

### 2. Installation
Clone the repository and install dependencies for both systems.

```bash
# Clone the repository
git clone <your-repository-url>
cd Homestay

# Install Client dependencies
cd client
npm install

# Install Server dependencies
cd ../server
npm install
```

### 3. Environment Configuration
Create a `.env` file in the `server` directory with the following variables:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_random_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Create a `.env` file in the `client` directory:
```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Database Seeding
To populate the application with initial data (Admin account and sample properties):

```bash
cd server
npm run seed
```
*This will create the master admin: `admin@northerntours.com` / `Admin@123`*

### 5. Running the Application
Open two terminals to run the frontend and backend simultaneously.

**Terminal 1 (Backend):**
```bash
cd server
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd client
npm run dev
```

The application will be live at `http://localhost:5173`.

---

## 📍 Headquarters
**Office Address**: Nimbong, Kalimpong, 734301, West Bengal.

## 🗝️ API Endpoints

### Auth
- `POST /api/auth/register` - New user sign-up
- `POST /api/auth/login` - Secure login

### Properties
- `GET /api/properties` - List properties with dynamic filters (location, price, amenities)
- `POST /api/properties` - Create new listing (Admin only)

### Bookings/Inquiries
- `POST /api/bookings` - Submit a new inquiry
- `GET /api/bookings` - Manage all inquiries (Admin only)
