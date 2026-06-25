# ResideEase - Property Rental & Booking Platform

ResideEase is a comprehensive MERN Stack property rental and booking application designed to streamline the leasing experience for Tenants, Property Owners, and System Administrators.

## Project Links

- **GitHub Repository**: [https://github.com/CoderRinku/Assignment_10.git](https://github.com/CoderRinku/Assignment_10.git)

---

## Core Features

### 1. User Roles & Dashboards
- **Tenant Dashboard**: View reserved properties, payment status tracker, favorites wishlist management, and profile update options.
- **Owner Dashboard**: Add property listings, modify property details, view rental analytics with graphical earnings metrics (Recharts), and manage booking request confirmations.
- **Admin Dashboard**: Manage registered users (role adjustments & block controls), verify submitted property listings with custom feedback response, and monitor overall transaction history.

### 2. Secure Payment Gateway
- Fully integrated with Stripe checkout flow to handle secure credit card payments.
- Success redirection with transaction details, generating print-ready invoice reports.

### 3. Listings Verification Workflow
- Owner listings default to `Pending` status.
- Admin reviews listings, with the capability to reject and provide constructive feedback to owners or approve.
- Only approved property listings are visible in public searches.

### 4. Advanced Query Capabilities
- Search properties by location using regex matching.
- Filter properties by type and price/rent bounds.
- Sort listings in ascending or descending order of price/rent.
- Segment results with server-supported pagination.

### 5. UI Polishing & Premium Interactions
- Animated landing page banner with Framer Motion.
- Quick link sharing copying to clipboard.
- Premium Light/Dark mode toggling.
- Unified Loading spinners and custom global Error Boundary.

---

## Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, Framer Motion, Recharts, Stripe Elements, Lucide Icons, Axios, React Router.
- **Backend**: Node.js, Express.js, MongoDB Atlas driver, jsonwebtoken (JWT), Stripe SDK, Dotenv, CORS.

---

## Environment Configuration

### Client (`.env.local`)
```env
VITE_API_URL=http://localhost:5000
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

### Server (`server/.env`)
```env
PORT=5000
DB_URI=your_mongodb_connection_uri
JWT_SECRET=your_jwt_private_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

---

## Installation & Setup

### 1. Run Client
```bash
npm install
npm run dev
```

### 2. Run Server
```bash
cd server
npm install
npm run dev
```
