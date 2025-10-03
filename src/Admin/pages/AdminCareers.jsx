import React from 'react'
import AdminSideBar from "../components/AdminSideBar";
import AdminHeader from "../components/AdminHeader";
import Footer from "./../../components/Footer";


function AdminCareers() {
  return (
        <>
   <div className="md:grid grid-cols-7 min-h-screen">
    <div className='col-span-1'>
      <AdminSideBar/>
    </div>
    <div className='col-span-6'>
      <AdminHeader insideHeader/>
    </div>

   </div>
   Admin Careers
    <Footer/>
    </>
  )
}

export default AdminCareers