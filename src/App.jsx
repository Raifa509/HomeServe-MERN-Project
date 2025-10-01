import { useEffect, useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from "./Users/Pages/Home";
import Profile from "./Users/Pages/Profile";
import Services from "./Users/Pages/Services";
import AdminDashboard from "./Admin/pages/AdminDashboard";
import AdminCareers from "./Admin/pages/AdminCareers";
import Auth from "./pages/Auth";
import Pnf from "./pages/Pnf";
import Preloader from "./components/Preloader";
import Careers from "./Users/Pages/Careers";



function App() {
 const [loading,setLoading]=useState(true)

 useEffect(()=>{
  setTimeout(() => {
    setLoading(false)
  }, 3000);
 })

  return (
    <>
      <Routes>
        <Route path='/' element={loading?<Preloader/>:<Home/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/services' element={<Services/>}/>
        <Route path='/admin-dashboard' element={<AdminDashboard/>}/>
        <Route path='/admin-careers' element={<AdminCareers/>}/>
        <Route path='/login' element={<Auth/>}/>
        <Route path='/register' element={<Auth register/>}/>
        <Route path='/careers' element={<Careers/>}/>
        <Route path='/*' element={<Pnf/>}/>
      </Routes>
    </>
  )
}

export default App
