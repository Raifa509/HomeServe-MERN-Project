import { faAdd, faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { addJobAPI } from '../../Services/allAPI'
import { useState } from 'react'
import { adminAddJobContext } from '../../contextAPI/ContextShares'

function AddJob() {

  const [openModal, setOpenModel] = useState(false)
  const [jobDetails, setJobDetails] = useState({
    jobTitle: "", jobType: "", location: "", description: "", requirements: "", status: "",
  })
  const {setAddJobResponse}=useContext(adminAddJobContext)

  // console.log(jobDetails);

  const handleReset = () => {
    setJobDetails({
      jobTitle: "", jobType: "", location: "", description: "", requirements: "", status: "",

    })
  }

  const handleAddJob = async () => {
    const { jobTitle, jobType, location, description, requirements, status } = jobDetails
    if (!jobTitle || !jobType || !location || !description || !requirements || !status) {
      toast.info("Please fill the form completely!!")
    } else {
      if (sessionStorage.getItem("token")) {
        const token = sessionStorage.getItem("token")
        const reqHeader = {
          'Authorization': `Bearer ${token}`
        }
        try {
          const result = await addJobAPI(jobDetails, reqHeader)
          if (result.status == 200) {
            toast.success("New Job Added!!!")
            // handleReset()
            //share data to context
            setAddJobResponse(result.data)
            //close modal
            setOpenModel(false)

          } else if (result.status == 409) {
            toast.warning(result.response.data)
            // handleReset()
          } else {
            toast.error("Something went wrong...")
          }
        } catch (err) {
          console.log(err);
          toast.warning("Something went wrong...")
        }
      } else {
        toast.warning("Something went wrong...")
      }
    }
  }
  return (
    <>

      {/* Add button */}
      <button onClick={() => setOpenModel(!openModal)} className='bg-blue-500 text-white px-3 py-2 rounded shadow ms-2 cursor-pointer hover:bg-blue-600 md:mt-0 mt-7 '><FontAwesomeIcon icon={faAdd} className='me-1' />Add</button>

      {
        openModal &&

        <div>
          <div className='fixed w-full h-full bg-gray-500/40 inset-0 flex items-center justify-center'>
            <div className='bg-white md:w-lg fixed rounded-2xl flex flex-col'>

              {/* header */}
              <div className='w-full h-16 bg-black text-white p-5 flex items-center justify-between rounded-t-2xl'>
                <h2>New Job Opening Form</h2>
                <FontAwesomeIcon className='cursor-pointer' icon={faClose} onClick={() => setOpenModel(!openModal)} />
              </div>
           

              {/* input boxes */}
              <form action="">

                {/* job title */}
                <div className='mt-5 px-5'>
                  <input value={jobDetails?.jobTitle} onChange={(e) => setJobDetails({ ...jobDetails, jobTitle: e.target.value })} type="text" placeholder='Job Title' className='w-full border border-gray-500 py-2 px-4 rounded-xl placeholder:text-black' />
                </div>

                {/* job type */}
                <div className="mt-3 px-5">
                  <select value={jobDetails?.jobType} onChange={(e) => setJobDetails({ ...jobDetails, jobType: e.target.value })}
                    className="w-full border border-gray-500 py-2 px-4 rounded-xl"
                    name="jobType"
                    defaultValue=""
                  >
                    <option value="" disabled hidden className="text-gray-400">
                      Select Job Type
                    </option>
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Internship">Internship</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>

                {/* location */}
                <div className='mt-3 px-5'>
                  <input value={jobDetails?.location} onChange={(e) => setJobDetails({ ...jobDetails, location: e.target.value })} type="text" placeholder='Location' className='w-full border border-gray-500 py-2 px-4 rounded-xl placeholder:text-black' />
                </div>

                {/* description */}
                <div className='mt-3 px-5'>
                  <textarea value={jobDetails?.description} onChange={(e) => setJobDetails({ ...jobDetails, description: e.target.value })} type="text" placeholder='Description' className='w-full border border-gray-500 py-2 px-4 rounded-xl placeholder:text-black' />
                </div>

                {/* requirements */}
                <div className='mt-3 px-5'>
                  <textarea value={jobDetails?.requirements} onChange={(e) => setJobDetails({ ...jobDetails, requirements: e.target.value })} type="text" placeholder='Requirements' className='w-full border border-gray-500 py-2 px-4 rounded-xl placeholder:text-black' />
                </div>

                {/* status */}
                <div className='mt-3 px-5'>
                <select value={jobDetails?.status} onChange={(e) => setJobDetails({ ...jobDetails, status: e.target.value })}
                    className="w-full border border-gray-500 py-2 px-4 rounded-xl"
                    name="status"
                    defaultValue=""
                  >
                    <option value="" disabled hidden className="text-gray-400">
                      Select status
                    </option>
                    <option value="Active">Active</option>
                    <option value="Closed">Closed</option>
            
                  </select>
                </div>
                
              </form>

              {/* buttons */}
              <div className='flex items-center justify-end px-5 my-7'>
                <button onClick={handleReset} className='bg-amber-500 text-white px-3 py-1 border rounded hover:bg-white hover:text-amber-500 hover:border-amber-500 cursor-pointer'>Reset</button>
                <button onClick={handleAddJob} className='bg-green-600 text-white px-3 py-1 border rounded hover:bg-white hover:text-green-600 hover:border-green-600 cursor-pointer ms-4'>Add</button>
              </div>

            </div>
          </div>
        </div>
      }

      {/* toast for alert */}
      <ToastContainer
        position="top-center"
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

export default AddJob