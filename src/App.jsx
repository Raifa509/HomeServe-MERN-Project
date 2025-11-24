import { useContext, useEffect, useState } from 'react'
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




function App() {
  const [loading, setLoading] = useState(true)
  const { role, authorisedUser, setAuthorisedUser } = useContext(userAuthContext)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 3000);
  })

  return (
    <>
      <Routes>
        <Route path='/' element={loading ? <Preloader /> : <Home />} />

        <Route path='/services' element={<Services />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/register' element={<Auth register />} />
        <Route path='/careers' element={<Careers />} />
        <Route path='/emergency' element={<EmergencyServices />} />

        { role=="user" &&

        <>
          <Route path='/booking' element={<BookingPage />} />
          <Route path='/service/:id/details' element={<ServiceDetails />} />
          <Route path='/profile' element={<Profile />} />
        </>

        }


     {
     role =="admin" &&  
      <>
          <Route path='/admin-dashboard' element={loading ? <Preloader /> : <AdminDashboard />} />
          <Route path='/admin-careers' element={<AdminCareers />} />
          <Route path='/admin-bookings' element={<AdminBookings />} />
          <Route path='/admin-customer' element={<AdminCustomer />} />
          <Route path='/admin-serviceProvider' element={<AdminServiceProvider />} />
          <Route path='/admin-service' element={<AdminService />} />
          <Route path='/admin-settings' element={<AdminSettings />} />
       </>}


        <Route path='/*' element={<Pnf />} />
      </Routes>
    </>
  )
}

export default App
