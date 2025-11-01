import React, { useContext, useEffect, useState } from 'react'
import AdminSideBar from "../components/AdminSideBar";
import AdminHeader from "../components/AdminHeader";
import Footer from "./../../components/Footer";
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SERVERURL from '../../Services/server';
import { toast, ToastContainer } from 'react-toastify'
import { updateAdminProfileAPI } from '../../Services/allAPI';
import { adminUpdateContext } from '../../contextAPI/ContextShares';

function AdminSettings() {
  const [adminDetails, setAdminDetails] = useState({
    username: "", password: "", cpassword: "", profile: ""
  })
  const [preview, setPreview] = useState("")
  const [token, setToken] = useState("")
  const [existingProfile, setExistingProfile] = useState("")
  const {setAdminEditResponse}=useContext(adminUpdateContext)

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      const adminToken = sessionStorage.getItem("token")
      setToken(adminToken)
      const user = JSON.parse(sessionStorage.getItem("user"))
      setAdminDetails({ username: user?.username, password: user?.password, cpassword: user?.password })
      setExistingProfile(user?.profile)

    }
  }, [])
  // console.log(adminDetails);
  const handleReset = () => {
    const user = JSON.parse(sessionStorage.getItem("user"))
    setAdminDetails({ username: user.username, password: user.password, cpassword: user.password })
    setExistingProfile(user.profile)
    setPreview("")
  }

  const handlePictureUpdate = (e) => {
    setAdminDetails({ ...adminDetails, profile: e.target.files[0] })
    const url = URL.createObjectURL(e.target.files[0])
    setPreview(url)
  }

    const handleUpdate = async () => {
    const { username, password, cpassword, profile, } = adminDetails
    if (!username || !password || !cpassword) {
      toast.info("Fill the form completely")
    } else {
      if (password != cpassword) {
        toast.info("Password & Confirm password must be same")
      } else {
        const reqHeader = {
          'Authorization': `Bearer ${token}`
        }
        const reqBody = new FormData()
        if (preview) {
          for (let key in adminDetails) {
            reqBody.append(key, adminDetails[key])
          }
          const result = await updateAdminProfileAPI(reqBody, reqHeader)
          if (result.status == 200) {
            sessionStorage.setItem("user", JSON.stringify(result.data))
            handleReset()
            setAdminEditResponse(result.data)
          } else {
            toast.error("something went wrong!!!")
            console.log(result);
          }
        }
        else {
          const result = await updateAdminProfileAPI({ username, password,profile: existingProfile }, reqHeader)
          if (result.status == 200) {

            toast.success("Profile updated successfully")
            sessionStorage.setItem("user", JSON.stringify(result.data))
            handleReset()
            setAdminEditResponse(result.data)

          }
          else {
            toast.error("something went wrong!!!")
            console.log(result);
          }
        }
      }
    }
  }

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
                      {
                        existingProfile == "" ?
                          <img src={preview ? preview :
                            "https://t3.ftcdn.net/jpg/06/19/26/46/360_F_619264680_x2PBdGLF54sFe7kTBtAvZnPyXgvaRw0Y.jpg"
                          } alt="" style={{ width: '90px', height: '90px', borderRadius: '50%' }} className='mt-5' />
                          :
                          existingProfile.startsWith("https://lh3.googleusercontent.com") ?
                            <img src={preview ? preview : existingProfile} alt="" style={{ width: '90px', height: '90px', borderRadius: '50%' }} className='mt-5' />

                            :
                            <img src={preview ? preview : `${SERVERURL}/uploads/${existingProfile}`} alt="" style={{ width: '90px', height: '90px', borderRadius: '50%' }} className='mt-5' />
                      }
                      <FontAwesomeIcon icon={faPen} className="bg-yellow-400 p-1 text-white rounded absolute right-0 bottom-0" />
                      <input onChange={e => handlePictureUpdate(e)} type="file" className='hidden' id='admicPic' />

                    </label>


                    <input value={adminDetails?.username} onChange={e => setAdminDetails({ ...adminDetails, username: e.target.value })} type="text" placeholder='Username' className='w-full rounded bg-white px-3 py-2 mt-10 shadow' />
                    <input value={adminDetails?.password} onChange={e => setAdminDetails({ ...adminDetails, password: e.target.value })} type="password" placeholder='Password' className='w-full rounded bg-white px-3 py-2 mt-5 shadow' />
                    <input value={adminDetails?.cpassword} onChange={e => setAdminDetails({ ...adminDetails, cpassword: e.target.value })} type="password" placeholder='Confirm Password' className='w-full rounded bg-white px-3 py-2 mt-5 shadow' />
                    <div className="flex mt-7 w-full">
                      <button onClick={handleReset} className='px-4 w-full py-1 bg-orange-400 text-white rounded m-2 cursor-pointer'>Reset</button>
                      <button onClick={handleUpdate} className='px-3 w-full py-1 bg-green-600 text-white rounded m-2 cursor-pointer'>Update</button>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
      <Footer />

 {/* toast for alert */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  )
}

export default AdminSettings