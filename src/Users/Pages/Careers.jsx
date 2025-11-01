import React, { useState } from 'react'
import Header from "./../components/Header";
import Footer from "./../../components/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { faCircleChevronDown, faCircleChevronUp, faClose, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { getAllJobsUserAPI } from '../../Services/allAPI';
import { useEffect } from 'react';
import dayjs from "dayjs";

function Careers() {


  const [allJobs, setAllJobs] = useState([])
  const [openJobId, setOpenJobId] = useState(null);
  const [modalStatus, setModalStatus] = useState(false)
  const [jobTitle,setJobTitle]=useState("")
  const [jobId,setJobId]=useState("")
  
  const [applicationDetails,setApplicationDetails]=useState({
    fullname:"",email:"",phone:"",qualification:"",experience:"",resume:""
  })


  useEffect(() => {
    getAllJobs()
  }, [])

  const getAllJobs = async () => {
    try {
      const result = await getAllJobsUserAPI()
      if (result.status == 200) {
        setAllJobs(result.data)
      } else {
        console.log(result);

      }
    } catch (err) {
      console.log(err);

    }
  }
  const toggleJobOpen = (id) => {
    setOpenJobId(openJobId === id ? null : id);
  }

  const handleApplyJob = (job) => {
    setJobId(job?._id)
    setJobTitle(job?.jobTitle)
    setModalStatus(true)
  }
  return (
    <>
      <Header />
      <div className='min-h-screen'>

        {/* heading */}
        <div className='bg-lime-50 w-full  md:mt-10 mt-3  text-green-900 flex justify-center items-center flex-col p-5'>
          <h2 className='headingFont md:text-3xl text-2xl font-semibold '>Join Our Team</h2>
          <p className='md:text-md text-sm font-medium md:mt-2'>Work with us to make homes better</p>
        </div>

        {/* job div */}
        <div className='flex justify-center items-center  w-full'>

          <div className='w-6xl md:py-10 mt-10 flex justify-center items-center flex-col  md:px-20 mx-2 md:mx-0'>

            {/* duplicate */}

            {
              allJobs?.length > 0 ?
                allJobs?.map(item => (
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

                        </div>
                        <p className="text-gray-500 text-xs mt-2">Posted on : {dayjs(item?.postedDate).format("DD MMM YYYY")}</p>
                      </div>

                      {/* buttons */}
                      <div>
                        <FontAwesomeIcon icon={openJobId == item._id ? faCircleChevronUp : faCircleChevronDown} size='xl' className='text-orange-400 me-3 cursor-pointer' onClick={() => toggleJobOpen(item._id)} />

                        <button className='bg-orange-400 text-white px-3 py-1.5 rounded-md cursor-pointer hover:bg-transparent border border-transparent hover:border-orange-400 hover:text-orange-400 md:inline hidden' onClick={() => handleApplyJob(item)}>Apply<FontAwesomeIcon icon={faPaperPlane} className='ms-1' /></button>
                        <button className='bg-orange-400 text-white px-1 rounded-md cursor-pointer md:hidden inline'><FontAwesomeIcon icon={faPaperPlane} /></button>

                      </div>
                    </div>

                    {
                      openJobId === item?._id &&
                      <div className='mt-6'>
                        <h4 className='font-semibold'>Job Description</h4>
                        <p className='text-justify mt-3'>{item?.description}</p>
                        <h4 className='font-semibold mt-5'>Requirements</h4>
                        <div className='mt-3'>
                          {
                            item?.requirements?.length > 0 ?
                              item?.requirements?.map(item => (
                                <p >• {item}</p>

                              ))
                              :
                              (
                                <p className='text-gray-500'>No requirements listed.</p>
                              )
                          }
                        </div>

                      </div>
                    }


                  </div>
                )
                )
                :
                <div className='flex justify-center items-center text-md font-semibold text-green-900'>No job opening currently!!!</div>
            }








          </div>
        </div>
      </div>


{/* modal content */}

      {
        modalStatus &&
        <div className='relative z-10'>
          {/* this div for overlay */}
          <div className='bg-gray-500/75 fixed inset-0'>

            {/* content div goes here */}
            <div className="flex justify-center items-center min-h-screen md:m-0 m-4">
              <div className='bg-white rounded  w-150 ' >
                <div className='flex justify-between items-center bg-black text-white p-3'>
                  <h3>Application Form</h3>
                  <FontAwesomeIcon onClick={() => setModalStatus(false)} icon={faClose} className='cursor-pointer' />
                </div>
                {/* modal body */}
                <div className='relative p-5'>
                  <div className="md:grid grid-cols-2 gap-x-5">
                    <div className="mb-3">
                      <input value={applicationDetails?.fullname} onChange={e => setApplicationDetails({ ...applicationDetails, fullname: e.target.value })} type="text" placeholder='Full Name' className='w-full p-2 border rounded text-black placeholder-gray-400' />
                    </div>

                    <div className="mb-3">
                      <input value={applicationDetails?.qualification} onChange={e => setApplicationDetails({ ...applicationDetails, qualification: e.target.value })} type="text" placeholder='Qualification' className='w-full p-2 border rounded text-black placeholder-gray-400' />
                    </div>
                    <div className="mb-3">
                      <input value={applicationDetails?.email} onChange={e => setApplicationDetails({ ...applicationDetails, email: e.target.value })} type="text" placeholder='Email ID' className='w-full p-2 border rounded text-black placeholder-gray-400' />
                    </div>

                    <div className="mb-3">
                      <input value={applicationDetails?.phone} onChange={e => setApplicationDetails({ ...applicationDetails, phone: e.target.value })} type="text" placeholder='Phone ' className='w-full p-2 border rounded text-black placeholder-gray-400' />
                    </div>

                    <div className="mb-3 col-span-2">
                      <textarea value={applicationDetails?.coverLetter} onChange={e => setApplicationDetails({ ...applicationDetails, coverLetter: e.target.value })} placeholder='Cover Letter' className='w-full p-2 border rounded text-black placeholder-gray-400' />
                    </div>


                    <div className="mb-3 col-span-2 text-gray-400">
                      <label htmlFor="">Resume</label>
                      <input  onChange={e => setApplicationDetails({ ...applicationDetails, resume: e.target.files[0] })} type="file" name="" id="" className='w-full border rounded file:bg-gray-400 file:p-2 file:text-white ' />

                    </div>


                  </div>

                </div>

                {/* modal footer */}
                <div className="bg-gray-200 p-3 flex justify-end">
                  <button className="p-2 rounded bg-orange-400 text-white border hover:bg-transparent hover:text-orange-400
                  hover:border-orange-400 cursor-pointer">Reset</button>
                  <button className="p-2 rounded bg-blue-600 text-white ms-3 border hover:bg-transparent hover:text-blue-600 hover:border-blue-600 cursor-pointer" >Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      }


      <Footer />
    </>
  )
}

export default Careers