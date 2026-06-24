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
import MyBookings from '../pages/MyBookings'
import Favorites from '../pages/Favorites'
import OwnerAnalytics from '../pages/OwnerAnalytics'
import AddProperty from '../pages/AddProperty'
import MyProperties from '../pages/MyProperties'
import AllUsers from '../pages/AllUsers'
import AdminAllProperties from '../pages/AdminAllProperties'
import ErrorPage from '../pages/ErrorPage'
import PrivateRoute from './PrivateRoute'
import AdminRoute from './AdminRoute'
import OwnerRoute from './OwnerRoute'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
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
        element: <MyBookings />,
      },
      {
        path: 'favorites',
        element: <Favorites />,
      },
      {
        path: 'owner-analytics',
        element: (
          <OwnerRoute>
            <OwnerAnalytics />
          </OwnerRoute>
        ),
      },
      {
        path: 'add-property',
        element: (
          <OwnerRoute>
            <AddProperty />
          </OwnerRoute>
        ),
      },
      {
        path: 'my-properties',
        element: (
          <OwnerRoute>
            <MyProperties />
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
            <AllUsers />
          </AdminRoute>
        ),
      },
      {
        path: 'all-properties',
        element: (
          <AdminRoute>
            <AdminAllProperties />
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
