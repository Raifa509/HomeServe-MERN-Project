import React, { useContext, useState } from 'react'
import AdminSideBar from "../components/AdminSideBar";
import AdminHeader from "../components/AdminHeader";
import Footer from "./../../components/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faCheck, faCircleCheck, faCircleChevronDown, faCircleChevronUp, faCircleXmark, faClock, faClose, faEdit, faEllipsisV, faLocationDot, faPaperPlane, faPencil, faSearch, faTrash, faUsers } from '@fortawesome/free-solid-svg-icons';
import Tooltip from '@mui/material/Tooltip';
import { closeJobAPI, deleteJobAPI, getAllJobsAPI } from '../../Services/allAPI';
import { useEffect } from 'react';
import dayjs from "dayjs";
import AddJob from '../components/AddJob';
import { adminAddJobContext } from '../../contextAPI/ContextShares';

function AdminCareers() {
  const [jobPost, setJobPost] = useState(true)
  const [viewApplicant, setViewApplicant] = useState(false)
  const [openJobId, setOpenJobId] = useState(null);
  const [menuOpen, setMenuOpen] = useState(null)
  const [allJobs, setAllJobs] = useState([])
  const [searchKey, setSearchKey] = useState("")
  const [deleteStatus, setDeleteStatus] = useState(false)
  const [closeJobStatus, setCloseJobStatus] = useState(false)
  const { addJobResponse } = useContext(adminAddJobContext)

  console.log(allJobs);

  useEffect(() => {
    if (jobPost) {
      getAllJobs()
    }
  }, [searchKey, deleteStatus, closeJobStatus,addJobResponse])

  const getAllJobs = async () => {
    if (sessionStorage.getItem("token")) {
      const userToken = sessionStorage.getItem("token")
      const reqHeader = {
        'Authorization': `Bearer ${userToken}`
      }
      try {
        const result = await getAllJobsAPI(searchKey, reqHeader)
        if (result.status == 200) {
          setAllJobs(result.data)
        }
      } catch (err) {
        console.log(err);
      }
    }

  }

  //handle search
  const handleSearch = (value) => {
    setSearchKey(value)
    getAllJobs()
  }

  //delete job
  const removeJob = async (id) => {
    if (sessionStorage.getItem("token")) {
      const userToken = sessionStorage.getItem("token")
      const reqHeader = {
        'Authorization': `Bearer ${userToken}`
      }
      try {
        const result = await deleteJobAPI(id, reqHeader)
        if (result.status == 200) {
          setDeleteStatus(result.data)
        }
      } catch (err) {
        console.log(err);

      }
    }

  }

  //close job
  const closeJob = async (id) => {
     console.log("Close job triggered for ID:", id);
    if (sessionStorage.getItem("token")) {
      const userToken = sessionStorage.getItem("token")
      const reqHeader = {
        'Authorization': `Bearer ${userToken}`
      }
      try {
        const result = await closeJobAPI(id, reqHeader)
        if (result.status == 200) {
          setCloseJobStatus(result.data)
        }
      } catch (err) {
        console.log(err);

      }
    }
  }


  const toggleJobOpen = (id) => {
    setOpenJobId(openJobId === id ? null : id);
  };
  const toggleMenuOpen = (id) => {
    setMenuOpen(menuOpen === id ? null : id);
  };


  return (
    <>
      <div className="md:grid grid-cols-7 min-h-screen">
        <div className='md:col-span-1 md:block hidden'>
          <AdminSideBar />
        </div>

        {/* header */}
        <div className='col-span-6'>
          {
            jobPost ?
              <AdminHeader insideHeader={true} placeholder={'Search job title'} onSearch={handleSearch} />
              :
              <AdminHeader />

          }

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

              {/* add */}
              <div className='flex justify-end'>
             <AddJob/>
              </div>

              <div className='mt-8'>

                {/* duplicate job postings */}

                {
                  allJobs?.length > 0 ?
                    allJobs.map(item => (
                      <div key={item?._id} className="shadow-md rounded py-5 md:px-7 px-4 w-full md:mb-10 mb-5">
                        <div className='flex justify-between '>
                          <div>
                            <h2 className="font-semibold text-green-900 md:text-xl text-sm">
                              {item?.jobTitle}
                            </h2>
                            <div className="flex items-center text-sm mt-2 text-gray-600 space-x-3">
                              <p>
                                <FontAwesomeIcon icon={faClock} className="me-1" />
                                {item?.jobType}
                              </p>
                              <p>
                                <FontAwesomeIcon icon={faLocationDot} className="me-1" />
                                {item?.location}
                              </p>

                              {/* active and inactive shift */}
                              <p
                                className={`px-2 rounded-full text-xs font-semibold ${item?.status === "Closed"
                                    ? "bg-red-100 text-red-500"
                                    : "bg-green-100 text-green-800"
                                  }`}
                              >
                                {item?.status}
                              </p>
                            </div>
                            <p className="text-gray-500 text-xs mt-2">Posted on : {dayjs(item?.postedDate).format("DD MMM YYYY")}</p>
                          </div>

                          {/* buttons */}
                          <div div className='flex md:flex-row flex-col items-center justify-center md:space-x-3 space-y-3 md:space-y-0'>
                            <FontAwesomeIcon
                              icon={openJobId === item._id ? faCircleChevronUp : faCircleChevronDown}
                              className='text-orange-400 me-3 cursor-pointer'
                              onClick={() => toggleJobOpen(item._id)}
                            />


                            <Tooltip title='Delete'>
                              <FontAwesomeIcon
                                icon={faTrash}
                                className="text-orange-400 me-3 cursor-pointer hover:text-orange-500" onClick={() => removeJob(item?._id)}
                              />
                            </Tooltip>

                            <div className='relative'>
                              <Tooltip title='More'>
                                <FontAwesomeIcon
                                  icon={faEllipsisV}
                                  className="text-orange-400 cursor-pointer hover:text-orange-500 me-3 md:me-0"
                                  onClick={() => toggleMenuOpen(item._id)}
                                />
                              </Tooltip>
                              {
                                menuOpen === item._id &&
                                <div className='absolute  bg-orange-400 w-38 right-0 top-10 text-white text-left text-xs rounded '>

                                  <div className='border-b border-b-white p-2 cursor-pointer flex hover:bg-amber-500' onClick={() => closeJob(item?._id)}><FontAwesomeIcon icon={faClose} className='me-1 ms-2' /><p>Close Application</p></div>
                                  <div className='border-b border-b-white p-2 hover:bg-amber-500 cursor-pointer '><p><FontAwesomeIcon icon={faUsers} className='me-1 ms-2' />Applicants(6)</p></div>

                                </div>
                              }
                            </div>
                          </div>
                        </div>

                        {
                          openJobId === item._id &&
                          <div className='mt-6'>
                            <h4 className='font-semibold'>Job Description</h4>
                            <p className='text-justify mt-3'>{item?.description}</p>
                            <h4 className='font-semibold mt-5'>Requirements</h4>
                            <div className='mt-3'>
                              {item?.requirements?.length > 0 ? (
                                item.requirements.map((i, index) => (
                                  <p key={index}>• {i}</p>
                                ))
                              ) : (
                                <p className='text-gray-500'>No requirements listed.</p>
                              )}
                            </div>

                          </div>
                        }
                      </div>
                    ))

                    :
                    <div>No Job Openings!!!</div>
                }

              </div>
            </div>
          }


          {/* view Applicant tab content */}
          {
            viewApplicant &&
            <div className='w-full overflow-x-auto'>
              <div className="md:px-25 md:mt-25 mt-20 ">
                <table className='w-full shadow my-5'>
                  <thead className='bg-green-50 text-green-950 font-semibold text-center'>
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
                          <Tooltip title='Approve'> <p className='text-green-500 text-xl hover:text-green-600 cursor-pointer'><FontAwesomeIcon icon={faCircleCheck} /></p></Tooltip>
                          <Tooltip title='Reject'><p className='text-red-500 text-xl hover:text-red-600 cursor-pointer'><FontAwesomeIcon icon={faCircleXmark} /></p></Tooltip>
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
                          <p className='text-red-500 text-xl hover:text-red-600 cursor-pointer'><FontAwesomeIcon icon={faCircleXmark} /></p>
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