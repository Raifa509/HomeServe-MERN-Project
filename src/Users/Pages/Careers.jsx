import React, { useState, useEffect } from 'react'
import Header from "./../components/Header";
import Footer from "./../../components/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { faCircleChevronDown, faCircleChevronUp, faClose, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { addApplicationAPI, getAllJobsUserAPI } from '../../Services/allAPI';
import dayjs from "dayjs";
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom';

// ⭐ Add Framer Motion
import { motion, AnimatePresence } from "framer-motion";

function Careers() {

  const [allJobs, setAllJobs] = useState([])
  const [openJobId, setOpenJobId] = useState(null);
  const [modalStatus, setModalStatus] = useState(false)
  const [jobTitle, setJobTitle] = useState("")
  const [jobId, setJobId] = useState("")
  const [fileKey, setFileKey] = useState(Date.now())

  const [applicationDetails, setApplicationDetails] = useState({
    fullname: "", email: "", phone: "", qualification: "", experience: "", resume: ""
  })

  const navigate = useNavigate()

  useEffect(() => {
    getAllJobs()
  }, [])

  const getAllJobs = async () => {
    try {
      const result = await getAllJobsUserAPI()
      if (result.status == 200) {
        setAllJobs(result.data)
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

  const handleReset = () => {
    setApplicationDetails({
      fullname: "", email: "", phone: "", qualification: "", experience: "", resume: ""
    })
    setFileKey(Date.now())
  }

  const handleSubmitButton = async () => {
    const { fullname, email, phone, qualification, experience, resume } = applicationDetails
    const token = sessionStorage.getItem("token")

    if (!token) {
      toast.info("Please login to apply job!!!")
      setTimeout(() => navigate('/login'), 2000)
      return
    }

    if (!fullname || !email || !phone || !qualification || !experience || !resume) {
      toast.info("Please fill the form completely..")
      return
    }

    const reqHeader = { 'Authorization': `Bearer ${token}` }
    const reqBody = new FormData()

    for (let key in applicationDetails) {
      reqBody.append(key, applicationDetails[key])
    }

    reqBody.append("jobTitle", jobTitle)
    reqBody.append("jobId", jobId)

    try {
      const result = await addApplicationAPI(reqBody, reqHeader)
      if (result.status == 200) {
        toast.success("Application submitted successfully!!!")
        handleReset()
        setModalStatus(false)
      } else if (result.status == 409) {
        toast.warning(result.response.data)
      } else {
        toast.error("Something went wrong!!")
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Header />

      {/* PAGE ANIMATION */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen"
      >

        {/* heading */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className='bg-lime-50 w-full md:mt-10 mt-3 text-green-900 flex justify-center items-center flex-col p-5'
        >
          <h2 className='headingFont md:text-3xl text-2xl font-semibold'>Join Our Team</h2>
          <p className='md:text-md text-sm font-medium md:mt-2'>Work with us to make homes better</p>
        </motion.div>

        {/* Jobs Listing */}
        <div className='flex justify-center items-center w-full'>
          <div className='w-6xl md:py-10 mt-10 flex justify-center items-center flex-col md:px-20 mx-2 md:mx-0'>

            <AnimatePresence>
              {allJobs?.length > 0 ? (
                allJobs.map((item, index) => (
                  <motion.div
                    key={item?._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="shadow-md rounded py-5 md:px-7 px-4 w-full md:mb-10 mb-5"
                  >
                    <div className='flex justify-between'>
                      <div>
                        <h2 className="font-semibold text-green-900 md:text-xl text-sm">
                          {item?.jobTitle}
                        </h2>

                        <div className="flex items-center text-sm mt-2 text-gray-600 space-x-3">
                          <p><FontAwesomeIcon icon={faClock} className="me-1" />{item?.jobType}</p>
                          <p><FontAwesomeIcon icon={faLocationDot} className="me-1" />{item?.location}</p>
                        </div>

                        <p className="text-gray-500 text-xs mt-2">
                          Posted on : {dayjs(item?.postedDate).format("DD MMM YYYY")}
                        </p>
                      </div>

                      <div>
                        <FontAwesomeIcon
                          icon={openJobId == item._id ? faCircleChevronUp : faCircleChevronDown}
                          size='xl'
                          className='text-orange-400 me-3 cursor-pointer'
                          onClick={() => toggleJobOpen(item._id)}
                        />

                        <button
                          className='bg-orange-400 text-white px-3 py-1.5 rounded-md hidden md:inline hover:bg-transparent border hover:border-orange-400 hover:text-orange-400'
                          onClick={() => handleApplyJob(item)}
                        >
                          Apply <FontAwesomeIcon icon={faPaperPlane} className='ms-1' />
                        </button>

                        <button
                          className='bg-orange-400 text-white px-1 rounded-md md:hidden inline'
                          onClick={() => handleApplyJob(item)}
                        >
                          <FontAwesomeIcon icon={faPaperPlane} />
                        </button>
                      </div>
                    </div>

                    {/* Accordion Animation */}
                    <AnimatePresence>
                      {openJobId === item._id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4 }}
                          className="overflow-hidden mt-6"
                        >
                          <h4 className='font-semibold'>Job Description</h4>
                          <p className='text-justify mt-3'>{item?.description}</p>

                          <h4 className='font-semibold mt-5'>Requirements</h4>
                          <div className='mt-3'>
                            {item?.requirements?.length > 0 ? (
                              item.requirements.map((req, idx) => (
                                <p key={idx}>• {req}</p>
                              ))
                            ) : (
                              <p className='text-gray-500'>No requirements listed.</p>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </motion.div>
                ))
              ) : (
                <p className='text-green-900 font-semibold text-md'>No job opening currently!!!</p>
              )}
            </AnimatePresence>

          </div>
        </div>

      </motion.div>

      {/* MODAL ANIMATION */}
      <AnimatePresence>
        {modalStatus && (
          <motion.div
            className='fixed inset-0 bg-gray-500/75 flex justify-center items-center z-50'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >

            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className='bg-white rounded w-150'
            >
              <div className='flex justify-between items-center bg-gray-600 text-white p-3'>
                <h3 className='font-semibold'>Application Form</h3>
                <FontAwesomeIcon onClick={() => setModalStatus(false)} icon={faClose} className='cursor-pointer' />
              </div>

              {/* Form */}
              <div className='p-5'>
                <div className="md:grid grid-cols-2 gap-x-5">
                  <input value={applicationDetails.fullname} onChange={e => setApplicationDetails({ ...applicationDetails, fullname: e.target.value })} type="text" placeholder='Full Name' className='w-full p-2 border rounded mb-3' />
                  <input value={applicationDetails.qualification} onChange={e => setApplicationDetails({ ...applicationDetails, qualification: e.target.value })} type="text" placeholder='Qualification' className='w-full p-2 border rounded mb-3' />
                  <input value={applicationDetails.email} onChange={e => setApplicationDetails({ ...applicationDetails, email: e.target.value })} type="text" placeholder='Email ID' className='w-full p-2 border rounded mb-3' />
                  <input value={applicationDetails.phone} onChange={e => setApplicationDetails({ ...applicationDetails, phone: e.target.value })} type="text" placeholder='Phone' className='w-full p-2 border rounded mb-3' />

                  <select value={applicationDetails.experience} onChange={e => setApplicationDetails({ ...applicationDetails, experience: e.target.value })} className="w-full p-2 border rounded mb-3 col-span-2">
                    <option value="" disabled hidden>Experience</option>
                    <option value="Fresher">Fresher</option>
                    <option value="1 Year">1 Year</option>
                    <option value="2 Years">2 Years</option>
                    <option value="3+ Years">3+ Years</option>
                    <option value="5+ Years">5+ Years</option>
                  </select>

                  <div className='col-span-2 mb-3 text-gray-500'>
                    <label>Resume</label>
                    <input key={fileKey} onChange={e => setApplicationDetails({ ...applicationDetails, resume: e.target.files[0] })} type="file" className='w-full border rounded file:bg-gray-600 file:text-white file:p-2 mt-1' />
                  </div>
                </div>
              </div>

              <div className="bg-gray-200 p-3 flex justify-end">
                <button onClick={handleReset} className="p-2 rounded bg-orange-400 text-white border hover:bg-transparent hover:text-orange-400 hover:border-orange-400">Reset</button>
                <button onClick={handleSubmitButton} className="p-2 rounded bg-green-600 text-white ms-3 hover:bg-transparent hover:text-green-600 hover:border-green-600 border">Submit</button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />

      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </>
  )
}

export default Careers
