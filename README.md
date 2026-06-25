# ResideEase - Property Rental & Booking App

ResideEase is my property rental and booking platform built using the MERN stack. I developed it to make it easy for tenants to find and rent properties, owners to list their properties and track bookings, and admins to manage users and verify listings.

## My Repository Link
- https://github.com/CoderRinku/Assignment_10.git

## What I Implemented (Key Features)

### Tenant Section
- I built a dashboard where tenants can see their booked properties, check if they paid, see transaction IDs, and update their profile details.
- Added a wishlist (favorites) section to save listings and a simple booking modal to reserve a property.
- Integrated Stripe for secure card payments with success redirection.

### Owner Section
- Owners can add new properties with images, specifications, and details (these start in "Pending" status).
- I built an analytics page for owners using Recharts to display total earnings, properties, bookings, and a monthly earnings chart.
- Owners can also accept or reject booking requests from tenants.

### Admin Section
- Admins can view and manage all registered users, change their roles (like making a tenant an owner), or block them.
- I built a property verification dashboard where admins review submitted properties and approve them or reject them with custom feedback.

### Other Cool Features
- Search property listings by location (regex matching).
- Filter by type and sort by price.
- Dark/Light mode toggle.
- Simple loading spinners and error boundary fallback screen.
- Absolutely zero comments in the codebase to keep the files clean.

## Tech Stack I Used

- **Frontend**: React, Vite, Tailwind CSS, Framer Motion, Recharts, Stripe Elements, Lucide Icons, Axios, React Router.
- **Backend**: Node.js, Express.js, MongoDB Atlas, jsonwebtoken (JWT), Stripe SDK.

## How I Set Up the Environment

### Client (`.env.local`)
```env
VITE_API_URL=http://localhost:5000
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

### Server (`server/.env`)
```env
PORT=5000
DB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```

## How to Run locally

### Client
1. Run `npm install`
2. Run `npm run dev`

### Server
1. Go to `server` folder
2. Run `npm install`
3. Run `npm run dev`
