import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { registerAPI } from '../Services/allAPI';

function Auth({ register }) {
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: ""
  })
  // console.log(userDetails);
  const [showPassword, setShowpassword] = useState(false)

  const navigate = useNavigate()
  //register button handle
  const handleRegister = async () => {
    // console.log('Inside handle Register');
    const { username, email, password } = userDetails
    if (!username || !email || !password) {
      toast.warning('Please fill the form completely')
    } else {
      // toast.success('Proceed to API call')
      try {
        const result = await registerAPI(userDetails)
        console.log(result);
        if (result.status == 201) {
          toast.success("Register Success!! Please Login...")
          setUserDetails({
            username: "",
            email: "",
            password: ""
          })
          navigate('/login')

        } else if (result.status == 409) {
          toast.warning(result.response.data)
          setUserDetails({ username: "", email: "", password: "" })
          navigate('/login')
        }
        else {
          console.log(result);
          toast.error("Something went wrong!!!")
          setUserDetails({ username: "", email: "", password: "" })
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <>
      <div className='h-screen relative' id='auth'>
        <div className=' h-1/2 w-full' style={{ backgroundColor: 'rgb(154, 210, 154)' }}></div>


        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='bg-white w-210 md:h-105 rounded-2xl shadow-lg mx-4 md:mx-0'>
            <h2 className='text-center mt-5 text-3xl headingFont font-semibold text-green-800'>{register ? 'Register' : 'Login'}</h2>

            <div className="md:grid grid-cols-2">

              {/* image */}
              <div className="flex items-center justify-center w-full h-full  md:ml-2">
                {
                  register ?

                    <img
                      src="/register.png"
                      alt="House Service"
                      className="w-full h-full mt-5 object-contain ms-3"
                    />
                    :
                    <img
                      src="https://guelphmaids.ca/wp-content/uploads/2023/01/Group-54-1.webp"
                      alt="House Service"
                      className="w-full h-full mt-4 object-contain ms-3"
                    />

                }
              </div>

              {/* input boxes */}
              <div className='flex flex-col  md:mt-15 mt-6 px-10'>
                {
                  register &&
                  <input value={userDetails.username} onChange={e => setUserDetails({ ...userDetails, username: e.target.value })} type="text" name="" id="" placeholder='Name' className='bg-green-200 px-4 py-2 rounded-md w-full placeholder:text-sm border-2 border-gray-100
               focus:border-green-700 focus:outline-none mb-3' />

                }

                <input value={userDetails.email} onChange={e => setUserDetails({ ...userDetails, email: e.target.value })} type="email" name="" id="" placeholder='Email Id' className='bg-green-200 px-4 py-2 rounded-md w-full placeholder:text-sm border-2 border-gray-100
               focus:border-green-700 focus:outline-none mb-3'/>

                <div className='flex items-center relative'>
                  <input value={userDetails.password} type={showPassword ? 'text' : 'password'} name="" id="" placeholder='Password' className='bg-green-200 px-4 py-2 rounded-md w-full placeholder:text-sm border-2 border-gray-100
                 focus:border-green-700 focus:outline-none mb-2' onChange={e => setUserDetails({ ...userDetails, password: e.target.value })} />

                  <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 cursor-pointer hover:text-gray-700' size='sm' onClick={() => setShowpassword(!showPassword)} />

                </div>

                {!register && <p className='text-end text-xs text-green-900 cursor-pointer'>Forget Password?</p>}

                {
                  register ?
                    <button className='headingFont w-full bg-green-700 text-white p-0.5 text-lg mt-5 rounded hover:bg-green-800 cursor-pointer' onClick={handleRegister}>REGISTER</button>
                    :
                    <button className='headingFont w-full bg-green-700 text-white p-0.5 text-lg mt-5 rounded hover:bg-green-800 cursor-pointer'>LOGIN</button>

                }



                {/* google authentication */}



                {/* link for register/login */}
                {
                  register ?
                    <p className='text-center mt-10 text-sm mb-3'>Are you a already User ? <Link to={'/login'} className='underline text-blue-500'>Login</Link></p>

                    :
                    <p className='text-center mt-10 text-sm mb-3'>Are you a new User ? <Link to={'/register'} className='underline text-blue-500'>Register</Link></p>

                }
              </div>
            </div>
          </div>
        </div>
        <div className=' h-1/2 w-full' style={{ backgroundColor: 'rgb(220, 226, 220)' }}></div>

      </div>

      <ToastContainer
        position="top-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"

      />
    </>
  )
}

export default Auth