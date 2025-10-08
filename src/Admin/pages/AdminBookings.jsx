import React, { useState } from 'react'
import AdminSideBar from "../components/AdminSideBar";
import AdminHeader from "../components/AdminHeader";
import Footer from "./../../components/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import Tooltip from '@mui/material/Tooltip';


function AdminBookings() {
  const [activeTab, setActiveTab] = useState("all")
  const [dropdownOpen, setDropdownOpen] = useState(false);

const tabs = ["all", "emergency", "pending", "confirmed", "completed"];
const tabLabels = {
  all: "All Bookings",
  emergency: "Emergency",
  pending: "Pending",
  confirmed: "Confirmed",
  completed: "Completed"
};


  return (
    <>
      <div className="md:grid grid-cols-7 min-h-screen">
        <div className='md:col-span-1 md:block hidden'>
          <AdminSideBar />
        </div>
        <div className='col-span-6'>
          <AdminHeader insideHeader={true} placeholder={'Search by service or customer'} />
          {/* heading */}
          <div className='flex items-center justify-center mt-10 flex-col'>
            <h2 className='headingFont text-2xl font-medium text-green-900'>Bookings</h2>

            {/* tab switch */}
            <div className='md:flex overflow-x-auto scrollbar-hide mt-10 space-x-2 px-2 hidden'>
              <p onClick={() => { setActiveTab("all") }}
                className={activeTab === "all" ? 'text-orange-500 px-4 py-2 border-gray-200 cursor-pointer border-l border-r border-t font-medium' : 'border-b border-gray-200 cursor-pointer px-4 py-3'}>All Bookings</p>
              <p onClick={() => { setActiveTab("emergency") }}
                className={activeTab === "emergency" ? 'text-orange-500 px-4 py-2 border-gray-200 cursor-pointer border-l border-r border-t font-medium' : 'border-b border-gray-200 cursor-pointer px-4 py-3'}>Emergency</p>
              <p onClick={() => { setActiveTab("pending") }}
                className={activeTab === "pending" ? 'text-orange-500 px-4 py-2 border-gray-200 cursor-pointer border-l border-r border-t font-medium' : 'border-b border-gray-200 cursor-pointer px-4 py-3'}>Pending</p>
              <p onClick={() => { setActiveTab("confirmed") }}
                className={activeTab === "confirmed" ? 'text-orange-500 px-4 py-2 border-gray-200 cursor-pointer border-l border-r border-t font-medium' : 'border-b border-gray-200 cursor-pointer px-4 py-3'}>Confirmed</p>
              <p onClick={() => { setActiveTab("completed") }}
                className={activeTab === "completed" ? 'text-orange-500 px-4 py-2 border-gray-200 cursor-pointer border-l border-r border-t font-medium' : 'border-b border-gray-200 cursor-pointer px-4 py-3'}>Completed</p>

            </div>

            {/* small device */}
            {/* small device dropdown */}
            <div className='md:hidden w-1/2 mt-4 relative'>
              <button
                className="w-full  text-orange-400 underline text-center mt-2"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {tabLabels[activeTab]}
              </button>

              {dropdownOpen && (
                <div className="absolute w-full bg-white rounded shadow mt-1 z-10">
                  {tabs.map(tab => (
                    <p
                      key={tab}
                      className="px-4 py-2 cursor-pointer hover:bg-green-50"
                      onClick={() => {
                        setActiveTab(tab);
                        setDropdownOpen(false);
                      }}
                    >
                      {tabLabels[tab]}
                    </p>
                  ))}
                </div>
              )}
            </div>



            <div className='w-full overflow-x-auto'>
              <div className="md:px-25 md:mt-25 mt-15 ">
                <table className='w-full shadow my-5'>
                  <thead className='bg-green-50 text-green-950 font-semibold text-center'>
                    <tr>
                      <td className='p-1 border border-gray-300'>ID</td>
                      <td className='p-1 border border-gray-300'>Customer Name</td>
                      <td className='p-1 border border-gray-300'>Service</td>
                      <td className='p-1 border border-gray-300'>Date</td>
                      <td className='p-1 border border-gray-300'>Assigned Employee</td>
                      <td className='p-1 border border-gray-300'>Status</td>
                      <td className='p-1 border border-gray-300'>Actions</td>
                    </tr>
                  </thead>

                  <tbody className='text-center'>
                    {/* duplicate table content */}
                    <tr>
                      <td className='p-2 border border-gray-300'>1001</td>
                      <td className='p-2 border border-gray-300'>Raifa</td>
                      <td className='p-2 border border-gray-300'>Plumber</td>
                      <td className='p-2 border border-gray-300'>11/2/2025</td>
                      <td className='p-2 border border-gray-300'></td>
                      <td className='p-2 border border-gray-300'>Pending</td>
                      <td className='p-2 border border-gray-300'>
                        <div className='flex space-x-4 items-center justify-center'>
                          <Tooltip title="Edit"> <p className='underline text-blue-500 cursor-pointer hover:text-blue-600'><FontAwesomeIcon icon={faPen} /></p></Tooltip>
                          <Tooltip title='Delete'> <p className='text-red-500 text-xl hover:text-red-600 cursor-pointer'><FontAwesomeIcon icon={faTrash} /></p></Tooltip>

                        </div>
                      </td>
                    </tr>

                  </tbody>

                </table>
              </div>
            </div>
          </div>





        </div>
      </div>
      <Footer />


    </>
  )
}

export default AdminBookings