import React, { useEffect, useState } from 'react';
import AdminSideBar from "../components/AdminSideBar";
import AdminHeader from "../components/AdminHeader";
import Footer from "./../../components/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import Tooltip from '@mui/material/Tooltip';
import { toast, ToastContainer } from 'react-toastify'
import { addServiceAPI, deleteAdminServiceAPI, getAllAdminServicesAPI } from '../../Services/allAPI';
import SERVERURL from '../../Services/server';
import EditService from "../components/EditService";


function AdminService() {
  const [servicesTab, setServicesTab] = useState(true);
  const [addServiceTab, setAddServiceTab] = useState(false);
  const [resetKey, setResetKey] = useState(Date.now());
  const [serviceDetails, setServiceDetails] = useState({
    name: "", description: "", about: "", category: "", price: 0, duration: "",
    thumbnail: "", detailImage: "", rating: 0,
    whatsIncluded: [""],
    pricingTiers: [{ name: "", price: "" }], isEmergency: false,
    subCategory: ""
  }); 
  const [token, setToken] = useState("")
  const [searchKey, setSearchKey] = useState("")
  const [allServices, setAllServices] = useState([])
  const [deleteServiceStatus, setDeleteServiceStatus] = useState(false)
  const [selectedEditService, setSelectedEditService] = useState({})
  const [EditModal, setEditModal] = useState(false)


  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      const adminToken = sessionStorage.getItem("token")
      setToken(adminToken)
      fetchServices("", adminToken)
    }
  }, [])
  useEffect(() => {
    if (servicesTab) {
      const adminToken = sessionStorage.getItem("token")
      fetchServices(searchKey, adminToken)
    }
  }, [servicesTab])

  // console.log(allServices);
  // console.log(serviceDetails);


  //fetch services
  const fetchServices = async (value, adminToken) => {
    const reqHeader = {
      'Authorization': `Bearer ${adminToken}`
    }
    try {
      const result = await getAllAdminServicesAPI(searchKey, reqHeader)
      if (result.status == 200) {
        setAllServices(result.data)
      } else {
        console.log(result);
        toast.warning(result.response.data)
      }
    } catch (err) {
      console.log(err);

    }
  }


  //handle reset
  const handleReset = () => {
    setServiceDetails({
      name: "", description: "", about: "", category: "", price: 0, duration: "",
      thumbnail: "", detailImage: "", rating: 0,
      whatsIncluded: [""],
      pricingTiers: [{ name: "", price: "" }], isEmergency: false,
      subCategory: ""

    });
    setResetKey(Date.now());
  };

  //image handle
  const handleUploadImage = (e) => {
    // console.log(e.target.files[0]);
    const file = e.target.files[0]
    const url = URL.createObjectURL(file)
    // console.log(url);
    setServiceDetails(prev => ({
      ...prev,
      [e.target.name]: file
    }));
  }

  //handle submit 
  const handleSubmit = async () => {
    const { name, description, about, category, price, duration, thumbnail, detailImage, rating, whatsIncluded, pricingTiers, isEmergency, subCategory } = serviceDetails

    if (!name || !description || !category || !price || !thumbnail) {
      toast.info("Please fill the form completely")
      return
    }
    if (!isEmergency) {
      if (!duration || !detailImage || rating === "" || whatsIncluded.length === 0) {
        toast.info("Please fill all non-emergency fields completely");
        return;
      }
    }

    //api call
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    const reqBody = new FormData()
    for (let key in serviceDetails) {
      if (key !== "whatsIncluded" && key !== "pricingTiers") {
        reqBody.append(key, serviceDetails[key])
      } else if (key == "whatsIncluded") {
        reqBody.append("whatsIncluded", JSON.stringify(serviceDetails.whatsIncluded));
      } else if (key === "pricingTiers") {
        reqBody.append("pricingTiers", JSON.stringify(serviceDetails.pricingTiers));
      }

    }

    // for(var pair of reqBody.entries()){
    //   console.log(pair[0]+':'+pair[1]);

    // }
    try {
      const result = await addServiceAPI(reqBody, reqHeader)
      console.log(result);
      if (result.status == 401) {
        toast.warning(result.response.data)
        handleReset()
      } else if (result.status == 200) {
        toast.success("Service added Successfully")
        handleReset()
        fetchServices("", token);
      } else {
        toast.error("Something went wrong!!!")
        handleReset()
      }


    } catch (err) {
      console.log(err);

    }

  }


  // Whats Included handlers
  const updateIncludedField = (index, value) => {
    const temp = [...serviceDetails.whatsIncluded];
    temp[index] = value;
    setServiceDetails(prev => ({ ...prev, whatsIncluded: temp }));
  };

  const addIncludedField = () => {
    if (serviceDetails.whatsIncluded[serviceDetails.whatsIncluded.length - 1]?.trim() !== "") {
      setServiceDetails(prev => ({ ...prev, whatsIncluded: [...prev.whatsIncluded, ""] }));
    }
  };

  // Pricing Tiers handlers
  const updatePricingTier = (index, field, value) => {
    const temp = [...serviceDetails.pricingTiers];
    temp[index][field] = value;
    setServiceDetails(prev => ({ ...prev, pricingTiers: temp }));
  };

  const addPricingTier = () => {
    setServiceDetails(prev => ({
      ...prev,
      pricingTiers: [...prev.pricingTiers, { name: "", price: "" }]
    }));
  };

  //handle search
  const handleSearch = (value) => {
    setSearchKey(value)
    fetchServices(value, token)
  }

  const removeService = async (serviceId) => {
    // console.log("Token before sending:", token);

    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    try {
      const result = await deleteAdminServiceAPI(serviceId, reqHeader)
      if (result.status == 200) {
        toast.success(result.data)
        setDeleteServiceStatus(!deleteServiceStatus)
      } else {
        console.log(result);

      }
    } catch (err) {
      console.log(err);

    }
  }

  return (
    <>
      <div className="md:grid grid-cols-7 min-h-screen">
        <div className='md:col-span-1 md:block hidden'>
          <AdminSideBar />
        </div>

        <div className='col-span-6'>
          <AdminHeader insideHeader={true} placeholder={'Search by service'} onSearch={handleSearch} />

          <div className='flex flex-col items-center justify-center mt-10'>
            <h2 className='headingFont text-2xl font-medium text-green-900'>Services</h2>
          </div>

          <div className='flex justify-center items-center mt-10'>
            <p onClick={() => { setServicesTab(true); setAddServiceTab(false) }}
              className={servicesTab ? 'text-orange-500 px-4 py-2 border-gray-200 cursor-pointer border-l border-r border-t font-medium' : 'border-b border-gray-200 cursor-pointer px-4 py-3'}>
              All Services
            </p>
            <p onClick={() => { setAddServiceTab(true); setServicesTab(false) }}
              className={addServiceTab ? 'text-orange-500 px-4 py-2 border-gray-200 cursor-pointer border-l border-r border-t font-medium' : 'border-b border-gray-200 cursor-pointer px-4 py-3'}>
              Add Service
            </p>
          </div>

          {/* All Services Section */}
          {servicesTab && (
            <div className="md:grid grid-cols-5 mt-15 gap-10 px-10 py-5 ">
              {
                allServices?.length > 0 ?
                  allServices.map((item, index) => (
                    <div key={index} className="shadow-lg bg-white flex items-center justify-center  flex-col rounded-xl transition-transform duration-400 hover:scale-105 relative">

                      <img src={`${SERVERURL}/uploads/${item?.thumbnail}`} alt="" className="mt-5 rounded-md w-48 h-48 object-cover" />
                      <h2 className="text-gray-600 font-semibold text-center mt-3">{item?.name}</h2>
                      <div className='mt-1.5 mb-3'>

                        <Tooltip title='Edit'>
                          <FontAwesomeIcon icon={faPen} onClick={() => { setSelectedEditService(item); setEditModal(true) }} className='me-2 text-gray-600 hover:text-green-600' />
                        </Tooltip>
                        <Tooltip title='Delete'>
                          <FontAwesomeIcon icon={faTrash} onClick={() => removeService(item?._id)} className='text-gray-600 ms-2 hover:text-red-600' />
                        </Tooltip>
                      </div>
                    </div>
                  ))
                  :
                  <div className='flex items-center mt-15 text-green-900 text-md justify-center col-span-5'>
                    <p>No services added yet!!!</p>
                  </div>
              }
            </div>
          )}

          {
            EditModal &&
            (<EditService service={selectedEditService} onClose={() => setEditModal(false)} />)
          }



          {/* Add Service Section */}
          {addServiceTab && (
            <div className="mt-10 px-10">
              <form key={resetKey} className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-4xl mx-auto space-y-6">
                <h2 className="text-2xl font-semibold text-green-800 mb-4 border-b pb-2">Add New Service</h2>

                {/* Service Name */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Service Name</label>
                  <input value={serviceDetails.name} onChange={e => setServiceDetails({ ...serviceDetails, name: e.target.value })} type="text" placeholder="Enter service name" className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400" />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Description</label>
                  <textarea value={serviceDetails.description} onChange={e => setServiceDetails({ ...serviceDetails, description: e.target.value })} placeholder="Enter service description" className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400" />
                </div>

                {/* About this service */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">About</label>
                  <textarea value={serviceDetails.about} onChange={e => setServiceDetails({ ...serviceDetails, about: e.target.value })} placeholder="Enter About this service" className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400" />
                </div>


                {/* Category */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Category</label>
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
                    className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
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
                    <label className="block text-gray-700 font-medium mb-1">Emergency Subcategory</label>
                    <select
                      value={serviceDetails.subCategory}
                      onChange={e => setServiceDetails({ ...serviceDetails, subCategory: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
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
                <div className="md:flex md:space-x-4">
                  <div className="flex-1">
                    <label className="block text-gray-700 font-medium mb-1">Price</label>
                    <input value={serviceDetails.price} onChange={e => setServiceDetails({ ...serviceDetails, price: e.target.value })} type="number" min={0} placeholder="Enter price" className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400" />
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

                {/* Image & Rating */}
                <div className="md:flex md:space-x-4">
                  <div className="flex-1 mt-4 md:mt-0">
                    <label className="block text-gray-700 font-medium mb-1 ">Thumbnail Image</label>
                    <input type="file" name='thumbnail'
                      onChange={e => handleUploadImage(e)} className="w-full  p-3 border  border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400" />
                  </div>

                  {
                    serviceDetails.category !== "Emergency" && (
                      <div className="flex-1 mt-4 md:mt-0">
                        <label className="block text-gray-700 font-medium mb-1">Detail image</label>
                        <input type="file" name='detailImage'
                          onChange={e => handleUploadImage(e)} className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400" />
                      </div>
                    )
                  }
                </div>


                {serviceDetails.category !== "Emergency" && (
                  <div className="flex-1 mt-5 md:mt-0">
                    <label className="block text-gray-700 font-medium mb-1">Rating</label>
                    <input value={serviceDetails.rating} onChange={e => setServiceDetails({ ...serviceDetails, rating: e.target.value })} type="number" placeholder="0–5" min="0" max="5" className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400" />
                  </div>

                )}


                {/* Dynamic Whats Included */}
                {
                  serviceDetails.category !== "Emergency" && (
                    <>
                      <div className="bg-green-50 p-4 rounded-xl">
                        <h3 className="font-semibold text-green-700 mb-2">What's Included</h3>
                        {serviceDetails.whatsIncluded.map((item, index) => (
                          <div key={index} className="flex space-x-2 mb-2">
                            <input type="text" placeholder={`Item ${index + 1}`} value={item} onChange={(e) => updateIncludedField(index, e.target.value)} className="flex-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400" />

                          </div>
                        ))}
                        <button type="button" onClick={addIncludedField} className="mt-2 px-4 py-2 bg-green-700 text-white rounded-xl hover:bg-green-800 transition">Add More</button>
                      </div>

                      {/* Dynamic Pricing Tiers */}
                      <div className="bg-green-50 p-4 rounded-xl">
                        <h3 className="font-semibold text-green-700 mb-2">Pricing Tiers (Optional)</h3>
                        {serviceDetails.pricingTiers.map((tier, index) => (
                          <div key={index} className="flex space-x-2 mb-2">
                            <input type="text" placeholder="Tier Name (e.g., 1 BHK)" value={tier.name} onChange={(e) => updatePricingTier(index, "name", e.target.value)} className="flex-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400" />
                            <input type="text" placeholder="Price" value={tier.price} onChange={(e) => updatePricingTier(index, "price", e.target.value)} className="flex-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400" />

                          </div>
                        ))}
                        <button type="button" onClick={addPricingTier} className="mt-2 px-4 py-2 bg-green-700 text-white rounded-xl hover:bg-green-800 transition">Add More</button>
                      </div>
                    </>
                  )

                }
                {/* Submit Button */}
                <button onClick={handleSubmit} type="button" className="w-full bg-green-700 text-white p-4 rounded-2xl hover:bg-green-800 transition font-semibold text-lg">Add Service</button>
              </form>
            </div>
          )}

        </div>
      </div >
      <Footer />
      {/* toast for alert */}
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

export default AdminService;
