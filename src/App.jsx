import { useContext, useEffect, useState } from 'react';
import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from "./Users/Pages/Home";
import Profile from "./Users/Pages/Profile";
import Services from "./Users/Pages/Services";
import Auth from "./pages/Auth";
import Pnf from "./pages/Pnf";
import Preloader from "./components/Preloader";
import Careers from "./Users/Pages/Careers";
import ServiceDetails from "./Users/Pages/ServiceDetails";
import BookingPage from "./Users/Pages/BookingPage";
import EmergencyServices from "./Users/Pages/EmergencyServices";

import AdminDashboard from "./Admin/pages/AdminDashboard";
import AdminCareers from "./Admin/pages/AdminCareers";
import AdminBookings from "./Admin/pages/AdminBookings";
import AdminCustomer from "./Admin/pages/AdminCustomer";
import AdminServiceProvider from "./Admin/pages/AdminServiceProvider";
import AdminService from "./Admin/pages/AdminService";
import AdminSettings from "./Admin/pages/AdminSettings";
import { userAuthContext } from './contextAPI/AuthContext';

// Admin Route wrapper
const AdminRoute = ({ children, loading, role }) => {
  if (loading) return <Preloader />;
  if (role !== "admin") return <Navigate to="/login" />;
  return children;
};

function App() {
  const [loading, setLoading] = useState(true);
  const { role } = useContext(userAuthContext);

  // Simulate Preloader delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={loading ? <Preloader /> : <Home />} />
        <Route path='/services' element={<Services />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/register' element={<Auth register />} />
        <Route path='/careers' element={<Careers />} />
        <Route path='/emergency' element={<EmergencyServices />} />
        <Route path='/booking' element={<BookingPage />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/service/:id/details' element={<ServiceDetails />} />

        {/* Admin Routes */}
        <Route
          path='/admin-dashboard'
          element={
            <AdminRoute loading={loading} role={role}>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path='/admin-careers'
          element={
            <AdminRoute loading={loading} role={role}>
              <AdminCareers />
            </AdminRoute>
          }
        />
        <Route
          path='/admin-bookings'
          element={
            <AdminRoute loading={loading} role={role}>
              <AdminBookings />
            </AdminRoute>
          }
        />
        <Route
          path='/admin-customer'
          element={
            <AdminRoute loading={loading} role={role}>
              <AdminCustomer />
            </AdminRoute>
          }
        />
        <Route
          path='/admin-serviceProvider'
          element={
            <AdminRoute loading={loading} role={role}>
              <AdminServiceProvider />
            </AdminRoute>
          }
        />
        <Route
          path='/admin-service'
          element={
            <AdminRoute loading={loading} role={role}>
              <AdminService />
            </AdminRoute>
          }
        />
        <Route
          path='/admin-settings'
          element={
            <AdminRoute loading={loading} role={role}>
              <AdminSettings />
            </AdminRoute>
          }
        />

        {/* 404 Page */}
        <Route path='/*' element={<Pnf />} />
      </Routes>
    </>
  );
}

export default App;
