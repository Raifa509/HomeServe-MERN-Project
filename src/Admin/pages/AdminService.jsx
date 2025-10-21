import React, { useState } from 'react';
import AdminSideBar from "../components/AdminSideBar";
import AdminHeader from "../components/AdminHeader";
import Footer from "./../../components/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import Tooltip from '@mui/material/Tooltip';

function AdminService() {
  const [services, setServices] = useState(true);
  const [addService, setAddService] = useState(false);


  const [whatsIncluded, setWhatsIncluded] = useState([""]);
  const [pricingTiers, setPricingTiers] = useState([{ name: "", price: "" }]);

  // Whats Included handlers
  const addIncludedField = () => {
    const temp = whatsIncluded.slice();
    temp.push("");
    setWhatsIncluded(temp);
  };

  const updateIncludedField = (index, value) => {
    const temp = whatsIncluded.slice();
    temp[index] = value;
    setWhatsIncluded(temp);
  };

  // Pricing Tiers handlers
  const addPricingTier = () => {
    const temp = pricingTiers.slice();
    temp.push({ name: "", price: "" });
    setPricingTiers(temp);
  };

  const updatePricingTier = (index, field, value) => {
    const temp = pricingTiers.slice();
    temp[index][field] = value;
    setPricingTiers(temp);
  };

  return (
    <>
      <div className="md:grid grid-cols-7 min-h-screen">
        <div className='md:col-span-1 md:block hidden'>
          <AdminSideBar />
        </div>

        <div className='col-span-6'>
          <AdminHeader insideHeader={true} placeholder={'Search by service'} />

          <div className='flex flex-col items-center justify-center mt-10'>
            <h2 className='headingFont text-2xl font-medium text-green-900'>Services</h2>
          </div>

          <div className='flex justify-center items-center mt-10'>
            <p onClick={() => { setServices(true); setAddService(false) }}
              className={services ? 'text-orange-500 px-4 py-2 border-gray-200 cursor-pointer border-l border-r border-t font-medium' : 'border-b border-gray-200 cursor-pointer px-4 py-3'}>
              All Services
            </p>
            <p onClick={() => { setAddService(true); setServices(false) }}
              className={addService ? 'text-orange-500 px-4 py-2 border-gray-200 cursor-pointer border-l border-r border-t font-medium' : 'border-b border-gray-200 cursor-pointer px-4 py-3'}>
              Add Service
            </p>
          </div>

          {/* All Services Section */}
          {services && (
            <div className="md:grid grid-cols-5 mt-15 gap-10 px-10 py-5 ">
              <div className="shadow-lg bg-white flex items-center justify-center p-4 flex-col rounded-xl transition-transform duration-400 hover:scale-105 relative">
                <h2 className="text-green-700 font-semibold">House Cleaning</h2>
                <img src="./houseCleaning.png" alt="" className="mt-5 rounded-md" />
                <div className='mt-2'>
                  <Tooltip title='Edit'>
                    <FontAwesomeIcon icon={faPen} className='me-2 hover:text-green-600' />
                  </Tooltip>
                  <Tooltip title='Delete'>
                    <FontAwesomeIcon icon={faTrash} className='ms-2 hover:text-red-600' />
                  </Tooltip>
                </div>
              </div>
            </div>
          )}

          {/* Add Service Section */}
          {addService && (
            <div className="mt-10 px-10">
              <form className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-4xl mx-auto space-y-6">
                <h2 className="text-2xl font-semibold text-green-800 mb-4 border-b pb-2">Add New Service</h2>

                {/* Service Name */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Service Name</label>
                  <input type="text" placeholder="Enter service name" className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400" />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Description</label>
                  <textarea placeholder="Enter service description" className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400" />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Category</label>
                  <select className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400">
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

                {/* Price & Duration */}
                <div className="md:flex md:space-x-4">
                  <div className="flex-1">
                    <label className="block text-gray-700 font-medium mb-1">Price</label>
                    <input type="number" min={0} placeholder="Enter price" className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400" />
                  </div>
                  <div className="flex-1 mt-4 md:mt-0">
                    <label className="block text-gray-700 font-medium mb-1">Duration</label>
                    <input type="text" placeholder="e.g., 2–4 hours" className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400" />
                  </div>
                </div>

                {/* Image & Rating */}
                <div className="md:flex md:space-x-4">
                  <div className="flex-1">
                    <label className="block text-gray-700 font-medium mb-1">Image URL</label>
                    <input type="text" placeholder="Enter image URL" className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400" />
                  </div>
                  <div className="flex-1 mt-4 md:mt-0">
                    <label className="block text-gray-700 font-medium mb-1">Rating</label>
                    <input type="number" placeholder="0–5" min="0" max="5"  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400" />
                  </div>
                </div>

                {/* Dynamic Whats Included */}
                <div className="bg-green-50 p-4 rounded-xl">
                  <h3 className="font-semibold text-green-700 mb-2">What's Included</h3>
                  {whatsIncluded.map((item, index) => (
                    <div key={index} className="flex space-x-2 mb-2">
                      <input type="text" placeholder={`Item ${index + 1}`} value={item} onChange={(e) => updateIncludedField(index, e.target.value)} className="flex-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400" />
                      
                    </div>
                  ))}
                  <button type="button" onClick={addIncludedField} className="mt-2 px-4 py-2 bg-green-700 text-white rounded-xl hover:bg-green-800 transition">Add More</button>
                </div>

                {/* Dynamic Pricing Tiers */}
                <div className="bg-green-50 p-4 rounded-xl">
                  <h3 className="font-semibold text-green-700 mb-2">Pricing Tiers (Optional)</h3>
                  {pricingTiers.map((tier, index) => (
                    <div key={index} className="flex space-x-2 mb-2">
                      <input type="text" placeholder="Tier Name (e.g., 1 BHK)" value={tier.name} onChange={(e) => updatePricingTier(index, "name", e.target.value)} className="flex-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400" />
                      <input type="text" placeholder="Price" value={tier.price} onChange={(e) => updatePricingTier(index, "price", e.target.value)} className="flex-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400" />
                     
                    </div>
                  ))}
                  <button type="button" onClick={addPricingTier} className="mt-2 px-4 py-2 bg-green-700 text-white rounded-xl hover:bg-green-800 transition">Add More</button>
                </div>

                {/* Submit Button */}
                <button type="button" className="w-full bg-green-700 text-white p-4 rounded-2xl hover:bg-green-800 transition font-semibold text-lg">Add Service</button>
              </form>
            </div>
          )}

        </div>
      </div>
      <Footer />
    </>
  );
}

export default AdminService;
