import React from 'react'
import AdminSideBar from "../components/AdminSideBar";
import AdminHeader from "../components/AdminHeader";
import Footer from "./../../components/Footer";


function AdminService() {
  return (
        <>
        <div className="md:grid grid-cols-7 min-h-screen">
        <div className='md:col-span-1 md:block hidden'>
          <AdminSideBar />
        </div>
        <div className='col-span-6'>
          <AdminHeader />

         
      

        </div>
      </div>
      <Footer />
    
    
    </>
  )
}

export default AdminService