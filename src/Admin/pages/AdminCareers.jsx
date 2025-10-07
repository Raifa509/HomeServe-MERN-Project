import React, { useState } from 'react'
import AdminSideBar from "../components/AdminSideBar";
import AdminHeader from "../components/AdminHeader";
import Footer from "./../../components/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faCheck, faCircleCheck, faCircleChevronDown, faCircleChevronUp, faCircleXmark, faClock, faClose, faEdit, faEllipsisV, faLocationDot, faPaperPlane, faPencil, faSearch, faTrash, faUsers } from '@fortawesome/free-solid-svg-icons';
import Tooltip from '@mui/material/Tooltip';

function AdminCareers() {
  const [jobPost, setJobPost] = useState(true)
  const [viewApplicant, setViewApplicant] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <div className="md:grid grid-cols-7 min-h-screen">
        <div className='md:col-span-1 md:block hidden'>
          <AdminSideBar />
        </div>
        <div className='col-span-6'>
          <AdminHeader />


          {/* career page content */}
          <div className='flex items-center justify-center mt-10 flex-col'>
            <h2 className='headingFont text-2xl font-medium text-green-900'>Careers</h2>

            {/* tab section */}

            <div className='flex justify-center items-center mt-10'>
              <p onClick={() => { setJobPost(true); setViewApplicant(false) }}
                className={jobPost ? 'text-orange-500 px-4 py-2 border-gray-200 cursor-pointer border-l border-r border-t font-medium' : 'border-b border-gray-200 cursor-pointer px-4 py-3'}>Job Post</p>
              <p onClick={() => { setViewApplicant(true); setJobPost(false) }}
                className={viewApplicant ? 'text-orange-500 px-4 py-2 border-gray-200 cursor-pointer border-l border-r border-t font-medium' : 'border-b border-gray-200 cursor-pointer px-4 py-3'}>View Applicant</p>
            </div>



          </div>

          {/* job post tab content */}

          {
            jobPost &&
            <div className='md:px-25 md:mt-15 mt-8'>

              {/* search+add */}
              <div className='flex justify-between items-center md:flex-row flex-col'>

                {/* search */}
                <div className='flex justify-center items-center'>
                  <input type="text" className='rounded shadow px-3 py-1 bg-white text-black md:w-80 placeholder-gray-400 border border-gray-50 focus:border-green-600 outline-none placeholder:text-sm' placeholder='Search Job Title' />
                  <button className='bg-green-500 text-white px-2 py-1.5 rounded shadow ms-2 cursor-pointer hover:bg-green-600 text-[16px]'><FontAwesomeIcon icon={faSearch} className='me-1' />Search</button>
                </div>

                {/* Add button */}
                <button className='bg-blue-500 text-white px-3 py-2 rounded shadow ms-2 cursor-pointer hover:bg-blue-600 md:mt-0 mt-7 '><FontAwesomeIcon icon={faAdd} className='me-1' />Add</button>
              </div>

              <div className='mt-10'>

                {/* duplicate job postings */}

                <div className="shadow-md rounded py-5 md:px-7 px-4 w-full md:mb-10 mb-5">
                  <div className='flex justify-between '>
                    <div>
                      <h2 className="font-semibold text-green-900 md:text-xl text-sm">
                        Home Service Technician
                      </h2>
                      <div className="flex items-center text-sm mt-2 text-gray-600 space-x-3">
                        <p>
                          <FontAwesomeIcon icon={faClock} className="me-1" />
                          Full Time
                        </p>
                        <p>
                          <FontAwesomeIcon icon={faLocationDot} className="me-1" />
                          Kochi, Kerala
                        </p>

                        {/* active and inactive shift */}
                        <p className="bg-green-100 text-green-800 px-2 rounded-full text-xs font-semibold">
                          Active
                        </p>
                      </div>
                      <p className="text-gray-500 text-xs mt-2">Posted on : 02 Oct 2025</p>
                    </div>

                    {/* buttons */}
                    <div div className='flex md:flex-row flex-col items-center justify-center md:space-x-3 space-y-3 md:space-y-0'>
                      <FontAwesomeIcon icon={isOpen ? faCircleChevronUp : faCircleChevronDown} className='text-orange-400 me-3 cursor-pointer' onClick={() => setIsOpen(!isOpen)} />

                     <Tooltip title='Delete'>
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="text-orange-400 me-3 cursor-pointer hover:text-orange-500"
                        />
                     </Tooltip>

                      <div className='relative'>
                       <Tooltip title='More'>
                          <FontAwesomeIcon
                            icon={faEllipsisV}
                            className="text-orange-400 cursor-pointer hover:text-orange-500 me-3 md:me-0"
                            onClick={() => setMenuOpen(!menuOpen)}
                          />
                       </Tooltip>
                        {
                          menuOpen &&
                          <div className='absolute  bg-orange-400 w-36 right-0 top-10 text-white text-left text-xs rounded '>
                            <div className='border-b border-b-white p-1 cursor-pointer'><p ><FontAwesomeIcon icon={faPencil} className='me-1 ms-2' />Edit</p></div>
                            <div className='border-b border-b-white p-1 cursor-pointer flex'><FontAwesomeIcon icon={faClose} className='me-1 ms-2' /><p>Close Application</p></div>
                            <div className='border-b border-b-white p-1 '><p><FontAwesomeIcon icon={faUsers} className='me-1 ms-2' />Applicants(6)</p></div>

                          </div>
                        }
                      </div>
                    </div>
                  </div>

                  {
                    isOpen &&
                    <div className='mt-6'>
                      <h4 className='font-semibold'>Job Description</h4>
                      <p className='text-justify mt-3'>We are looking for a Home Service Technician to join our team. You will be responsible for providing high-quality home maintenance and repair services to our customers. This role requires technical skills, excellent customer service, and a proactive attitude.</p>
                      <h4 className='font-semibold mt-5'>Skills</h4>
                      <p className='mt-3'>• Previous experience in home service or technical repair is preferred.</p>
                      <p>• Excellent communication and customer service skills.</p>
                      <p>• Ability to work independently and as part of a team.</p>
                    </div>
                  }
                </div>
              </div>
            </div>
          }


          {/* view Applicant tab content */}
          {
            viewApplicant &&
         <div className='w-full overflow-x-auto'>
              <div className="md:px-25 md:mt-25 mt-20 ">
              <table className='w-full shadow my-5'>
                <thead className='bg-orange-400 text-white text-center'>
                  <tr>
                    <td className='p-1 border border-gray-300'>Sl No</td>
                    <td className='p-1 border border-gray-300'>Applicant Name</td>
                    <td className='p-1 border border-gray-300'>Job Role</td>
                    <td className='p-1 border border-gray-300'>Experience</td>
                    <td className='p-1 border border-gray-300'>Location</td>
                    <td className='p-1 border border-gray-300'>Status</td>
                    <td className='p-1 border border-gray-300'>Actions</td>
                  </tr>
                </thead>
  
                <tbody className='text-center'>
                  {/* duplicate table content */}
                  <tr>
                    <td className='p-2 border border-gray-300'>1</td>
                    <td className='p-2 border border-gray-300'>Raifa</td>
                    <td className='p-2 border border-gray-300'>Plumber</td>
                    <td className='p-2 border border-gray-300'>3 yrs</td>
                    <td className='p-2 border border-gray-300'>Kochi</td>
                    <td className='p-2 border border-gray-300'>Pending</td>
                    <td className='p-2 border border-gray-300'>
                      <div className='flex space-x-4 items-center justify-center'>
                        <p className='underline text-blue-500 cursor-pointer hover:text-blue-600'>View</p>
                       <Tooltip title='Approve'> <p className='text-green-500 text-xl hover:text-green-600 cursor-pointer'><FontAwesomeIcon icon={faCircleCheck}/></p></Tooltip>
                        <Tooltip title='Reject'><p className='text-red-500 text-xl hover:text-red-600 cursor-pointer'><FontAwesomeIcon icon={faCircleXmark}/></p></Tooltip>
                      </div>
                    </td>
                  </tr>
                   <tr>
                    <td className='p-2 border border-gray-300'>1</td>
                    <td className='p-2 border border-gray-300'>Raifa</td>
                    <td className='p-2 border border-gray-300'>Plumber</td>
                    <td className='p-2 border border-gray-300'>3 yrs</td>
                    <td className='p-2 border border-gray-300'>Kochi</td>
                    <td className='p-2 border border-gray-300'>Approved</td>
                    <td className='p-2 border border-gray-300'>
                      <div className='flex space-x-4 items-center justify-center'>
                        <p className='underline text-blue-500 cursor-pointer hover:text-blue-600'>View</p>
                        <p className='text-red-500 text-xl hover:text-red-600 cursor-pointer'><FontAwesomeIcon icon={faCircleXmark}/></p>
                      </div>
                    </td>
                  </tr>
                </tbody>
  
              </table>
            </div>
         </div>
          }
        </div>
      </div>
      <Footer />
    </>
  )
}

export default AdminCareers