import React, { useEffect, useState } from 'react'
import AdminSideBar from "../components/AdminSideBar";
import AdminHeader from "../components/AdminHeader";
import Footer from "./../../components/Footer";
import { getAllUsersAdminAPI } from '../../Services/allAPI';
import SERVERURL from '../../Services/server';

function AdminCustomer() {
  const [allUsers, setAllUsers] = useState([])
  const [searchKey, setSearchKey] = useState("")

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      const adminToken = sessionStorage.getItem("token")
      getAllUsers(adminToken)
    }
  }, [searchKey])

  console.log(allUsers);


  const getAllUsers = async (adminToken) => {
    const reqHeader = {
      'Authorization': `Bearer ${adminToken}`
    }
    try {
      const result = await getAllUsersAdminAPI(searchKey, reqHeader)
      if (result.status == 200) {
        setAllUsers(result.data)
      } else {
        console.log(result);

      }
    } catch (err) {
      console.log(err);

    }
  }

  return (
    <>
      <div className="md:grid grid-cols-7 min-h-screen">
        <div className='md:col-span-1 md:block hidden'>
          <AdminSideBar />
        </div>
        <div className='col-span-6'>

          <AdminHeader insideHeader={true} placeholder={'Search by name or email'} onSearch={setSearchKey} />
          {/* heading */}
          <div className='flex items-center justify-center mt-10 flex-col'>
            <h2 className='headingFont text-2xl font-medium text-green-900'>Customers</h2>
          </div>


          {/* duplicate card */}

          <div className='md:grid grid-cols-3 mt-15 gap-8 px-20'>
            {
              allUsers?.length > 0 ?
                allUsers?.map((item, index) => (
                  <div key={index} className='shadow-lg rounded-xl p-6 bg-gray-100 flex items-center space-x-4 hover:shadow-2xl transition-shadow duration-300'>
                    {/* Profile Image */}
                    <div>
                      <img
                        src="https://t3.ftcdn.net/jpg/06/19/26/46/360_F_619264680_x2PBdGLF54sFe7kTBtAvZnPyXgvaRw0Y.jpg"
                        alt="user profile"
                        className="w-16 h-16 rounded-full object-cover border-2 border-green-300"
                      />


                    </div>

                    {/* User Info */}
                    <div className='text-left'>
                      <h2 className='text-lg font-bold text-green-900'>{item?.username}</h2>
                      <h3 className='text-sm font-semibold text-gray-700 mt-1'>{item?.email}</h3>
                      <p className='text-sm text-gray-500 mt-1'>{ }</p>
                    </div>
                  </div>


                ))
                :
                <div>No Users yet!!!</div>
            }
          </div>

        </div>
      </div>
      <Footer />


    </>
  )
}

export default AdminCustomer