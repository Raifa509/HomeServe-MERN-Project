import { useEffect, useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from "./Users/Pages/Home";
import Profile from "./Users/Pages/Profile";
import Services from "./Users/Pages/Services";
import Auth from "./pages/Auth";
import Pnf from "./pages/Pnf";
import Preloader from "./components/Preloader";
import Careers from "./Users/Pages/Careers";
import ServiceDetails from "./Users/Pages/ServiceDetails";

import AdminDashboard from "./Admin/pages/AdminDashboard";
import AdminCareers from "./Admin/pages/AdminCareers";
import AdminBookings from "./Admin/pages/AdminBookings";
import AdminCustomer from "./Admin/pages/AdminCustomer";
import AdminService from "./Admin/pages/AdminService";
import AdminSettings from "./Admin/pages/AdminSettings";




function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 3000);
  })

  return (
    <>
      <Routes>
        <Route path='/' element={loading ? <Preloader /> : <Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/services' element={<Services />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/register' element={<Auth register />} />
        <Route path='/careers' element={<Careers />} />
        <Route path='/service/:id/details' element={<ServiceDetails />} />

        <Route path='/admin-dashboard' element={<AdminDashboard />} />
        <Route path='/admin-careers' element={<AdminCareers />} />
        <Route path='/admin-bookings' element={<AdminBookings />} />
        <Route path='/admin-customer' element={<AdminCustomer />} />
        <Route path='/admin-service' element={<AdminService />} />
        <Route path='/admin-settings' element={<AdminSettings />} />

        <Route path='/*' element={<Pnf />} />
      </Routes>
    </>
  )
}

export default App
