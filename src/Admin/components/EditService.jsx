import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

function EditService({ service, onClose }) {
    const [serviceDetails, setServiceDetails] = useState(service);

 const handleReset = () => {
  setServiceDetails(service);
};

const handleUpdate=()=>{
    
}

    return (
        <>
            <div className='fixed inset-0 bg-gray-500/40 w-full h-screen flex items-center justify-center '>
                <div className=' w-xl min-h-96 bg-white  rounded-xl  p-10'>
                    <div className='flex justify-end'>
                         <button onClick={() => onClose(false)}><FontAwesomeIcon icon={faClose}/></button>
                    </div>

                <div className='flex items-center justify-center flex-col '>
                        <h2 className='text-lg font-medium text-green-800'>Edit Service</h2>
                        <div className='w-full'>
                            
                            {/* service name */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-2 mt-10">Service Name</label>
                                <input value={serviceDetails.name} onChange={e => setServiceDetails({ ...serviceDetails, name: e.target.value })} type="text" placeholder="Enter service name" className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 mb-2" />
                            </div>
    
                            {/* Category */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Category</label>
                                <select
                                    value={serviceDetails.category}
                                    onChange={e => {
                                        const value = e.target.value;
                                        setServiceDetails({
                                            ...serviceDetails,
                                            category: value,
                                            isEmergency: value === "Emergency",
                                            subCategory: value === "Emergency" ? serviceDetails.subCategory : "",
                                        });
                                    }}
                                    className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 mb-2"
                                >
                                    <option value="">Select Category</option>
                                    <option value="Cleaning">Cleaning</option>
                                    <option value="Repairs">Repairs</option>
                                    <option value="Installation">Installation</option>
                                    <option value="Outdoor & Gardening">Outdoor & Gardening</option>
                                    <option value="Moving">Moving</option>
                                    <option value="Painting">Painting</option>
                                    <option value="Emergency">Emergency</option>
                                </select>
                            </div>
    
    
                            {serviceDetails.category === "Emergency" && (
                                <div className="mt-4">
                                    <label className="block text-gray-700 font-medium mb-2">Emergency Subcategory</label>
                                    <select
                                        value={serviceDetails.subCategory}
                                        onChange={e => setServiceDetails({ ...serviceDetails, subCategory: e.target.value })}
                                        className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 mb-2"
                                    >
                                        <option value="">Select Subcategory</option>
                                        <option value="Plumbing Emergency">Plumbing Emergency</option>
                                        <option value="Electrical Emergency">Electrical Emergency</option>
                                        <option value="Locksmith Emergency">Locksmith Emergency</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            )}
                            {/* Price & Duration */}
                            <div className="md:flex md:space-x-4 mb-2">
                                <div className="flex-1">
                                    <label className="block text-gray-700 font-medium mb-1">Price</label>
                                    <input value={serviceDetails.price} onChange={e => setServiceDetails({ ...serviceDetails, price: e.target.value })} type="number" min={0} placeholder="Enter price" className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 mb-2" />
                                </div>
                                {
                                    serviceDetails.category !== "Emergency" && (
                                        <div className="flex-1 mt-4 md:mt-0">
                                            <label className="block text-gray-700 font-medium mb-1">Duration</label>
                                            <input value={serviceDetails.duration} onChange={e => setServiceDetails({ ...serviceDetails, duration: e.target.value })} type="text" placeholder="e.g., 2–4 hours" className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400" />
                                        </div>
                                    )
                                }
    
                            </div>
    
    
                            <div className='flex justify-end mt-10'>
                                  <button onClick={handleReset}  type="button" className=" bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition font-semibold text-md px-4 py-2 me-3">Reset</button>
                                    <button  type="button" className=" bg-green-700 text-white rounded-2xl hover:bg-green-800 transition font-semibold text-md px-4 py-2 ">Update</button>
                            </div>
                        </div>
    
                </div>
                </div>

            </div>

        </>
    )
}

export default EditService