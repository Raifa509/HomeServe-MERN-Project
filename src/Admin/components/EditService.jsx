import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { updateServiceAPI } from "../../Services/allAPI";
import { toast, ToastContainer } from 'react-toastify'

function EditService({ service, onClose }) {
    const [serviceDetails, setServiceDetails] = useState(service);



    const handleReset = () => {
        setServiceDetails(service);
    };

    const handleUpdate = async () => {
        const adminToken = sessionStorage.getItem("token")
        const reqHeader = {
            'Authorization': `Bearer ${adminToken}`
        }
        const reqBody = {
            name: serviceDetails.name,
            category: serviceDetails.category,
            price: serviceDetails.price,
            duration: serviceDetails.duration,
            subCategory: serviceDetails.subCategory
        };
        try {
            const result = await updateServiceAPI(serviceDetails?._id, reqBody, reqHeader)
            if (result.status == 200) {
                toast.success("Service updated successfully!");

                setTimeout(() => {
                    onClose(false);
                }, 1000);
            }

        } catch (err) {
            console.log(err);

        }
    };

    return (
        <>
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                {/* Modal Container */}
                <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8 relative animate-fadeIn">

                    {/* Close Button */}
                    <button
                        onClick={() => onClose(false)}
                        className="absolute top-4 right-4 text-gray-500 hover:text-red-600 transition"
                    >
                        <FontAwesomeIcon icon={faClose} size="lg" />
                    </button>

                    {/* Header */}
                    <h2 className="text-2xl font-semibold text-green-800 text-center mb-6">
                        Edit Service
                    </h2>

                    {/* Form */}
                    <div className="space-y-5">
                        {/* Service Name */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Service Name
                            </label>
                            <input
                                value={serviceDetails.name}
                                onChange={(e) =>
                                    setServiceDetails({ ...serviceDetails, name: e.target.value })
                                }
                                type="text"
                                placeholder="Enter service name"
                                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Category
                            </label>
                            <select
                                value={serviceDetails.category}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setServiceDetails({
                                        ...serviceDetails,
                                        category: value,
                                        isEmergency: value === "Emergency",
                                        subCategory:
                                            value === "Emergency" ? serviceDetails.subCategory : "",
                                    });
                                }}
                                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition"
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

                        {/* Emergency Subcategory */}
                        {serviceDetails.category === "Emergency" && (
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Emergency Subcategory
                                </label>
                                <select
                                    value={serviceDetails.subCategory}
                                    onChange={(e) =>
                                        setServiceDetails({
                                            ...serviceDetails,
                                            subCategory: e.target.value,
                                        })
                                    }
                                    className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                                >
                                    <option value="">Select Subcategory</option>
                                    <option value="Plumbing Emergency">Plumbing Emergency</option>
                                    <option value="Electrical Emergency">
                                        Electrical Emergency
                                    </option>
                                    <option value="Locksmith Emergency">
                                        Locksmith Emergency
                                    </option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        )}

                        {/* Price & Duration */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Price
                                </label>
                                <input
                                    value={serviceDetails.price}
                                    onChange={(e) =>
                                        setServiceDetails({
                                            ...serviceDetails,
                                            price: e.target.value,
                                        })
                                    }
                                    type="number"
                                    min={0}
                                    placeholder="Enter price"
                                    className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                                />
                            </div>

                            {serviceDetails.category !== "Emergency" && (
                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">
                                        Duration
                                    </label>
                                    <input
                                        value={serviceDetails.duration}
                                        onChange={(e) =>
                                            setServiceDetails({
                                                ...serviceDetails,
                                                duration: e.target.value,
                                            })
                                        }
                                        type="text"
                                        placeholder="e.g., 2–4 hours"
                                        className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end pt-6 space-x-3">
                            <button
                                onClick={handleReset}
                                type="button"
                                className="px-5 py-2 bg-gray-200 text-gray-800 font-medium rounded-xl hover:bg-gray-300 transition"
                            >
                                Reset
                            </button>
                            <button
                                onClick={handleUpdate}
                                type="button"
                                className="px-6 py-2 bg-green-700 text-white font-semibold rounded-xl hover:bg-green-800 transition"
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-right"
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
    );
}

export default EditService;
