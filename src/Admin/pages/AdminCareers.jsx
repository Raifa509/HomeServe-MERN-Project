import React, { useContext, useState } from 'react'
import AdminSideBar from "../components/AdminSideBar";
import AdminHeader from "../components/AdminHeader";
import Footer from "./../../components/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faCheck, faCircleCheck, faCircleChevronDown, faCircleChevronUp, faCircleXmark, faClock, faClose, faEdit, faEllipsisV, faLocationDot, faPaperPlane, faPencil, faSearch, faTrash, faUsers } from '@fortawesome/free-solid-svg-icons';
import Tooltip from '@mui/material/Tooltip';
import { closeJobAPI, deleteJobAPI, getAllApplicationsAPI, getAllJobsAPI, updateApplicationStatusAPI } from '../../Services/allAPI';
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
  const [jobApplications, setJobApplications] = useState([])


  // console.log(allJobs);
  console.log(jobApplications);

  useEffect(() => {
    if (jobPost) {
      getAllJobs()
    } else if (viewApplicant) {
      getAllApplications()
    }
  }, [searchKey, deleteStatus, closeJobStatus, addJobResponse, viewApplicant])

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

  //get all applications
  const getAllApplications = async () => {
    if (sessionStorage.getItem("token")) {
      const userToken = sessionStorage.getItem("token")
      const reqHeader = {
        'Authorization': `Bearer ${userToken}`
      }
      try {
        const result = await getAllApplicationsAPI(reqHeader)
        if (result.status == 200) {
          setJobApplications(result.data)
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

  //handle status update
  // const updateApplicationStatus=async(id,status)=>{
  //   if(sessionStorage.getItem("token"))
  //   {
  //     const adminToken = sessionStorage.getItem("token")
  //     const reqHeader = {
  //       'Authorization': `Bearer ${adminToken}`
  //     }
  //     try{
  //       const result=await updateApplicationStatusAPI(id,status,reqHeader)
        
  //     }catch(err)
  //     {
  //       console.log(err);
        
  //     }
  //   }
  // }

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
                <AddJob />
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
              <div className="md:px-25 mt-20 ">
                <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden my-6">
                  <thead className="bg-green-600 text-white text-sm uppercase tracking-wide">
                    <tr>
                      <th className="px-4 py-3 text-left">#</th>
                      <th className="px-4 py-3 text-left">Applicant</th>
                      <th className="px-4 py-3 text-left">Job Role</th>
                      <th className="px-4 py-3 text-left">Experience</th>
                      <th className="px-4 py-3 text-left">Qualification</th>
                      <th className="px-4 py-3 text-left">Status</th>
                      <th className="px-4 py-3 text-center">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="  text-sm">

                    {
                      jobApplications?.length > 0 ?
                        jobApplications?.map((item, index) => (
                          <tr key={item?._id} className="hover:bg-green-50 transition-colors duration-200">
                            <td className="px-4 py-3 font-medium text-gray-700">{index + 1}</td>
                            <td className="px-4 py-3 font-semibold text-gray-900">{item?.fullname}</td>
                            <td className="px-4 py-3 text-gray-700">{item?.jobTitle}</td>
                            <td className="px-4 py-3 text-gray-700">{item?.experience}</td>
                            <td className="px-4 py-3 text-gray-700">{item?.qualification}</td>

                            {/* Status badge */}

                            <td className="px-4 py-3">
                              <span
                                className={`px-3 py-1 text-xs font-semibold rounded-full ${item?.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : item?.status === "Approved"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                  }`}
                              >
                                {item?.status}
                              </span>
                            </td>


                            {/* Actions */}
                            <td className="px-4 py-3 text-center">
                              <div className="flex items-center justify-center space-x-4">
                                <p className="underline text-blue-500 cursor-pointer hover:text-blue-600 transition-colors">
                                  View
                                </p>

                                {
                                  item?.status != "Approved" &&
                                  (<Tooltip title="Approve">
                                    <p className="text-green-500 text-lg hover:scale-110 transform cursor-pointer transition-transform">
                                      <FontAwesomeIcon icon={faCircleCheck} />
                                    </p>
                                  </Tooltip>)

                                }


                               {
                                item?.status != "Rejected" &&
                               ( <Tooltip title="Reject">
                                  <p className="text-red-500 text-lg hover:scale-110 transform cursor-pointer transition-transform">
                                    <FontAwesomeIcon icon={faCircleXmark} />
                                  </p>
                                </Tooltip>
                                )}

                              </div>
                            </td>
                          </tr>
                        ))

                        :
                        <td colSpan="7" className="text-center py-10 text-gray-500 font-medium">
                          No Applications yet!!!
                        </td>
                    }
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