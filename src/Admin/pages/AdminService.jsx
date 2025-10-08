import React, { useState } from 'react';
import AdminSideBar from "../components/AdminSideBar";
import AdminHeader from "../components/AdminHeader";
import Footer from "../../components/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import Tooltip from '@mui/material/Tooltip';

function AdminService() {


  return (
    <>
      <div className="md:grid grid-cols-7 min-h-screen">
        <div className='md:col-span-1 md:block hidden'>
          <AdminSideBar />
        </div>

        <div className='col-span-6'>
          <AdminHeader insideHeader={true} placeholder={'Search by provider or service'} />

          <div className='flex flex-col items-center justify-center mt-10'>
            <h2 className='headingFont text-2xl font-medium text-green-900'>Service Providers</h2>
          </div>
          <div className="md:grid grid-cols-4 md:px-10 mt-15 md:gap-4 flex flex-col items-center justify-center gap-4">
            {/* duplicate card */}
            <div className="relative bg-white rounded-xl shadow-xl p-6 w-64 h-56 flex flex-col items-center justify-center group hover:scale-105 transition-transform duration-300">
              {/* Normal view */}
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full overflow-hidden shadow-sm">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLpGh_iVtnRdvFi61zAP5iC8OuwCvuEyK0l9rrbWvob5x0JNwgSSrMsWWFwrt6nT3fhKc&usqp=CAU"
                    alt="Employee"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-lg mt-4 font-semibold text-green-900">Ewaan Amish</h2>
                <p className="text-sm text-gray-600 font-semibold">Cleaner</p>
                <p className="text-sm text-blue-500 font-medium mt-1">Active</p>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-green-900 bg-opacity-90 text-white rounded-xl p-4 flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h2 className="text-lg font-bold mb-2">Ewaan Amish</h2>
                <p className="text-sm mt-2">Cleaner</p>
                <p className="text-sm mt-2">ewaan@gmail.com</p>
                <p className="text-sm mt-2">9876543210</p>
                <p className="text-sm mt-2">Joined on 12/5/2025</p>
                <div className="mt-4">
                  <Tooltip title="Edit">
                    <button>
                      <FontAwesomeIcon icon={faPen} className="px-2 hover:text-blue-500 cursor-pointer" />
                    </button>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <button>
                      <FontAwesomeIcon icon={faTrash} className="px-2 hover:text-red-500 cursor-pointer" />
                    </button>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
      <Footer />
    </>
  )
}

export default AdminService;
