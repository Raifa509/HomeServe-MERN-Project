import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SERVERURL from '../../Services/server'

function ViewApplication({applicant}) {

    const [viewModal, setViewModal] = useState(false)

    return (
        <>
            <button onClick={() => setViewModal(!viewModal)} className="underline text-blue-500 cursor-pointer hover:text-blue-600 transition-colors">View</button>

            {
                viewModal &&
                <>
                    <div className='fixed w-full h-full bg-gray-500/20 inset-0 backdrop-blur-xs  flex items-center justify-center'>
                        <div className=' flex items-center justify-center'>
                            <div className=' w-90 h-80 rounded-2xl shadow-2xl bg-green-50'>
                                <div className='flex justify-end p-6'>
                                      <h2 className='text-lg text-green-900 font-semibold text-center me-15'>Applicant Details</h2>

                                    <FontAwesomeIcon icon={faClose} className='text-lg text-green-900 cursor-pointer' onClick={()=>setViewModal(false)}/>
                                </div>
                              
                                <div className='flex items-center flex-col space-y-4 px-7 mt-5 text-md font-semibold text-gray-700'>
                                    <p>Name : {applicant?.fullname} </p>
                                    <p>Email : {applicant?.email}</p>
                                    <p>Phone : {applicant?.phone}</p>
                                    <p>Qualification : {applicant?.qualification}</p>
                                    <p>Experience : {applicant?.experience}</p>
                                    <Link className='text-blue-600 underline' to={`${SERVERURL}/pdf/${applicant?.resume}`} target='_blank'>Resume</Link>

                                </div>
                            </div>
                        </div>

                    </div>

                </>
            }

        </>
    )
}

export default ViewApplication