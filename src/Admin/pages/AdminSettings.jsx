import React from 'react'
import AdminSideBar from "../components/AdminSideBar";
import AdminHeader from "../components/AdminHeader";
import Footer from "./../../components/Footer";
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function AdminSettings() {
  return (
    <>
      <div className="md:grid grid-cols-7 min-h-screen">
        <div className='md:col-span-1 md:block hidden'>
          <AdminSideBar />
        </div>
        <div className='col-span-6'>
          <AdminHeader />

          {/* settings content */}
          <div className='md:px-40'>
            <div className='flex items-center justify-center mt-10 flex-col w-full'>
              <h2 className='headingFont text-2xl font-medium text-green-900'>Settings</h2>
              <div className=' mt-12 w-full flex justify-center items-center'>
                <div className='bg-green-50 p-4 flex items-center justify-center shadow-md md:w-2/4 rounded-2xl'>
                  <div className='rounded flex justify-center items-center flex-col px-10 py-2 md:mt-0 my-10 w-full'>

                    {/* admic pic change */}
                    <label htmlFor="admicPic" className='relative cursor-pointer'>
                      <img src="https://t3.ftcdn.net/jpg/06/19/26/46/360_F_619264680_x2PBdGLF54sFe7kTBtAvZnPyXgvaRw0Y.jpg" alt="admin profile" style={{ width: '90px', height: '90px', borderRadius: '50%' }} className='mt-5' />
                      <FontAwesomeIcon icon={faPen} className="bg-yellow-400 p-1 text-white rounded absolute right-0 bottom-0" />
                      <input type="file" className='hidden' id='admicPic' />

                    </label>


                    <input type="text" placeholder='Username' className='w-full rounded bg-white px-3 py-2 mt-10 shadow' />
                    <input type="text" placeholder='Password' className='w-full rounded bg-white px-3 py-2 mt-5 shadow' />
                    <input type="text" placeholder='Confirm Password' className='w-full rounded bg-white px-3 py-2 mt-5 shadow' />
                    <div className="flex mt-7 w-full">
                      <button className='px-4 w-full py-1 bg-orange-400 text-white rounded m-2 cursor-pointer'>Reset</button>
                      <button className='px-3 w-full py-1 bg-green-600 text-white rounded m-2 cursor-pointer'>Update</button>
                    </div>
                  </div>
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

export default AdminSettings