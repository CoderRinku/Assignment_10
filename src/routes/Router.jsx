import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import DashboardLayout from '../layouts/DashboardLayout'
import Home from '../pages/Home'
import AllProperties from '../pages/AllProperties'
import PropertyDetails from '../pages/PropertyDetails'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Payment from '../pages/Payment'
import Profile from '../pages/Profile'
import NotFound from '../pages/NotFound'
import PrivateRoute from './PrivateRoute'
import AdminRoute from './AdminRoute'
import OwnerRoute from './OwnerRoute'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'properties',
        element: <AllProperties />,
      },
      {
        path: 'property/:id',
        element: (
          <PrivateRoute>
            <PropertyDetails />
          </PrivateRoute>
        ),
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'payment/:id',
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'bookings',
        element: <Profile />,
      },
      {
        path: 'favorites',
        element: <Profile />,
      },
      {
        path: 'owner-analytics',
        element: (
          <OwnerRoute>
            <Profile />
          </OwnerRoute>
        ),
      },
      {
        path: 'add-property',
        element: (
          <OwnerRoute>
            <Profile />
          </OwnerRoute>
        ),
      },
      {
        path: 'my-properties',
        element: (
          <OwnerRoute>
            <Profile />
          </OwnerRoute>
        ),
      },
      {
        path: 'booking-requests',
        element: (
          <OwnerRoute>
            <Profile />
          </OwnerRoute>
        ),
      },
      {
        path: 'users',
        element: (
          <AdminRoute>
            <Profile />
          </AdminRoute>
        ),
      },
      {
        path: 'all-properties',
        element: (
          <AdminRoute>
            <Profile />
          </AdminRoute>
        ),
      },
      {
        path: 'all-bookings',
        element: (
          <AdminRoute>
            <Profile />
          </AdminRoute>
        ),
      },
      {
        path: 'transactions',
        element: (
          <AdminRoute>
            <Profile />
          </AdminRoute>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])
