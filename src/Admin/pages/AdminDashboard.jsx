import React from 'react'
import AdminSideBar from "../components/AdminSideBar";
import AdminHeader from "../components/AdminHeader";
import Footer from "./../../components/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faClipboardList, faHourglassHalf, faUsers } from '@fortawesome/free-solid-svg-icons';

function AdminDashboard() {
  return (
    <>
      <div className="md:grid grid-cols-7 min-h-screen">
        <div className='md:col-span-1 md:block hidden'>
          <AdminSideBar />
        </div>
        <div className='col-span-6'>
          <AdminHeader />

          {/* cards */}
          <div className="md:grid grid-cols-4 gap-5 p-5">

            <div className='bg-yellow-400 rounded text-white font-semibold p-4 text-xl'>
              <div className='flex justify-center items-center flex-col'>
                <div className='flex'>
                  <FontAwesomeIcon icon={faClipboardList} className='text-2xl' />
                  <h2>Total Bookings</h2>
                </div>
                <h2 className='text-2xl mt-1'>120</h2>
              </div>
            </div>

            <div className='bg-blue-400 rounded text-white font-semibold p-4 text-xl'>
              <div className='flex justify-center items-center flex-col'>
                <div className='flex'>
                  <FontAwesomeIcon icon={faHourglassHalf} className='text-2xl' />
                  <h2>Pending Bookings</h2>
                </div>
                <h2 className='text-2xl mt-1'>8</h2>
              </div>
            </div>

            <div className='bg-lime-400 rounded text-white font-semibold p-4 text-xl'>
              <div className='flex justify-center items-center flex-col'>
                <div className='flex'>
                  <FontAwesomeIcon icon={faCheckCircle} className='text-2xl me-1' />
                  <h2>Completed Bookings</h2>
                </div>
                <h2 className='text-2xl mt-1'>112</h2>
              </div>
            </div>

            <div className='bg-emerald-400 rounded text-white font-semibold p-4 text-xl'>
              <div className='flex justify-center items-center flex-col'>
                <div className='flex'>
                  <FontAwesomeIcon icon={faUsers} className='text-2xl me-2' />
                  <h2>Total Customers</h2>
                </div>
                <h2 className='text-2xl mt-1'>200</h2>
              </div>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  )
}

export default AdminDashboard