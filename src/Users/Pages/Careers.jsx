import React, { useState } from 'react'
import Header from "./../components/Header";
import Footer from "./../../components/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { faCircleChevronDown, faCircleChevronUp, faLocationDot } from '@fortawesome/free-solid-svg-icons';

function Careers() {

  const [isOpen, setIsOpen] = useState(false)

  //control the toggle separately 

  return (
    <>
      <Header/>
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

                  </div>
                  <p className="text-gray-500 text-xs mt-2">Posted on : 02 Oct 2025</p>
                </div>

                {/* buttons */}
                <div>
                  <FontAwesomeIcon icon={isOpen ? faCircleChevronUp : faCircleChevronDown} size='xl' className='text-orange-400 me-3 cursor-pointer' onClick={() => setIsOpen(!isOpen)} />

                  <button className='bg-orange-400 text-white px-3 py-1.5 rounded-md cursor-pointer hover:bg-transparent border border-transparent hover:border-orange-400 hover:text-orange-400 md:inline hidden'>Apply<FontAwesomeIcon icon={faPaperPlane} className='ms-1' /></button>
                  <button className='bg-orange-400 text-white px-1 rounded-md cursor-pointer md:hidden inline'><FontAwesomeIcon icon={faPaperPlane} /></button>

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
      </div>




      <Footer />
    </>
  )
}

export default Careers