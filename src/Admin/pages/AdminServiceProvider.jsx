import React, { useEffect, useState } from 'react';
import AdminSideBar from "../components/AdminSideBar";
import AdminHeader from "../components/AdminHeader";
import Footer from "../../components/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faChevronUp, faClose, faPen, faPlus, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import Tooltip from '@mui/material/Tooltip';
import { toast, ToastContainer } from 'react-toastify'
import { addProviderAPI, deleteProviderAPI, getAllProviderAPI } from '../../Services/allAPI';
import SERVERURL from '../../Services/server';
import dayjs from "dayjs";



function AdminServiceProvider() {

  const [showForm, setShowForm] = useState(false)
  const [preview, setPreview] = useState("")
  const [newProvider, setNewProvider] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    status: "Active",
    profile: null
  })
  const [token, setToken] = useState("")
  const [allProviders, setAllProviders] = useState([])
  const [searchKey, setSearchKey] = useState("")
  const [deleteProviderStatus, setDeleteProviderStatus] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editProvider, setEditProvider] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    status: "",
    profile: ""
  })

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      const adminToken = sessionStorage.getItem("token")
      setToken(adminToken)
      getAllServiceProviders(adminToken)
    }
  }, [searchKey, deleteProviderStatus])

  // console.log(allProviders);

  const getAllServiceProviders = async (adminToken) => {
    const reqHeader = {
      'Authorization': `Bearer ${adminToken}`
    }
    try {
      const result = await getAllProviderAPI(searchKey, reqHeader)
      if (result.status == 200) {
        setAllProviders(result.data)
      } else {
        console.log(result);

      }
    } catch (err) {
      console.log(err);

    }
  }

  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);

      if (type === "new") {
        setNewProvider({ ...newProvider, profile: file });
      } else if (type === "edit") {
        setEditProvider({ ...editProvider, profile: file });
      }
    }
  };


  const handleSubmit = async () => {
    const { name, email, phone, role, status, profile } = newProvider
    if (!name || !email || !phone || !role || !status || !profile) {
      toast.info("Please fill the form completely!")
    } else {
      const reqHeader = {
        'Authorization': `Bearer ${token}`
      }
      const reqBody = new FormData()
      for (let key in newProvider) {
        reqBody.append(key, newProvider[key])
      }
      try {
        const result = await addProviderAPI(reqBody, reqHeader)
        if (result.status == 200) {
          toast.success("New Provider Added!!!")
          handleReset()
        } else if (result.status == 409) {
          toast.warning(result.response.data)
        } else {
          toast.error("Something went wrong!!")
        }
      } catch (err) {
        console.log(err);

      }

    }
  }

  const handleReset = async () => {
    setNewProvider({
      name: "",
      email: "",
      phone: "",
      role: "",
      status: "",
      profile: null
    })
    setPreview("")
    setShowForm(false)
  }

  const handleUpdateChanges=async()=>{
    const {name,email,phone,role,status,profile}=editProvider
    if(!name || !email || !phone || !role || !status || !profile){
      toast.info("Please fill the form")
    }else{
      
    }
  }

  //handle delete button
  const handleDelete = async (id) => {
    const reqHeader = {
      'Authorization': `Bearer ${token}`
    }
    try {
      const result = await deleteProviderAPI(id, reqHeader)
      if (result.status == 200) {
        toast.success("Deleted Successfully!!")
        setDeleteProviderStatus(true)
      } else {
        toast.error("Something went wrong!!")
      }
    } catch (err) {
      console.log(err);

    }
  }


  return (
    <>
      <div className="md:grid grid-cols-7 min-h-screen mb-10">
        <div className='md:col-span-1 md:block hidden'>
          <AdminSideBar />
        </div>

        <div className='col-span-6'>
          <AdminHeader insideHeader={true} placeholder={'Search by provider name or service'} onSearch={setSearchKey} />
          <div className='flex flex-col items-center justify-center mt-10 relative'>
            <h2 className='headingFont text-2xl font-medium text-green-900'>Service Providers</h2>
            <button className='absolute right-10 top-0 bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-800 shadow-md transition-all' onClick={() => setShowForm(!showForm)}>
              <FontAwesomeIcon icon={showForm ? faChevronUp : faPlus} className='me-2' />
              <span>{showForm ? "Close" : "Add Provider"}</span></button>
          </div>

          {
            showForm &&
            <form className="mx-10 mt-6 bg-white shadow-lg rounded-2xl p-6 transition-all duration-500 border border-green-100">
              <div className="grid md:grid-cols-6 gap-8 px-10">

                {/* Left side – Profile Upload */}
                <div className="flex flex-col items-center space-y-2 col-span-2 justify-center">
                  <label
                    htmlFor="providerPic"
                    className="relative w-28 h-28 rounded-full bg-gray-100 cursor-pointer flex items-center justify-center group border-3 border-gray-300"
                  >

                    {
                      preview ? (
                        <img
                          src={preview}
                          alt="Preview"
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faUser}
                          className="text-gray-400 text-4xl group-hover:opacity-60 transition"
                        />
                      )
                    }
                    <input onChange={e => handleImageUpload(e, "new")} type="file" id="providerPic" className="hidden" />
                    <FontAwesomeIcon
                      icon={faCamera}
                      className="text-white text-xs bg-green-600 p-1.5 rounded-full absolute bottom-0 right-0 translate-x-1 translate-y-1 shadow-md"
                    />
                  </label>
                  <p className="text-sm text-gray-500 font-medium">Upload Photo</p>
                </div>

                {/* Input Fields */}
                <div className="col-span-4 grid grid-cols-2 gap-6">

                  {/* Name */}
                  <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-700">Name</label>
                    <input value={newProvider.name}
                      onChange={(e) => setNewProvider({ ...newProvider, name: e.target.value })}
                      type="text"
                      placeholder="Enter provider name"
                      className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-700">Email</label>
                    <input value={newProvider.email}
                      onChange={(e) => setNewProvider({ ...newProvider, email: e.target.value })}
                      type="email"
                      placeholder="Enter provider email"
                      className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                    />
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-700">Phone</label>
                    <input value={newProvider.phone}
                      onChange={(e) => setNewProvider({ ...newProvider, phone: e.target.value })}
                      type="tel"
                      placeholder="Enter phone number"
                      className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                    />
                  </div>

                  {/* Role */}
                  <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-700">Role</label>
                    <input value={newProvider.role}
                      onChange={(e) => setNewProvider({ ...newProvider, role: e.target.value })}
                      type="text"
                      placeholder="Enter role (e.g. Electrician)"
                      className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                    />
                  </div>

                  {/* Status */}
                  <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-700">Status</label>
                    <select value={newProvider.status}
                      onChange={(e) => setNewProvider({ ...newProvider, status: e.target.value })} className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600">
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center mt-8">
                <button onClick={handleSubmit}
                  type='button'
                  className="bg-green-700 text-white font-semibold px-8 py-2 rounded-lg shadow hover:bg-green-800 transition"
                >
                  Add
                </button>
              </div>
            </form>
          }

          <div className="md:grid grid-cols-4 md:px-10 mt-15 md:gap-4 flex flex-col items-center justify-center gap-4">
            {/* duplicate card */}

            {
              allProviders?.length > 0 ?
                allProviders?.map(item => (
                  <div key={item?._id} className="relative bg-white rounded-xl shadow-xl p-6 w-64 h-56 flex flex-col items-center justify-center group hover:scale-105 transition-transform duration-300">
                    {/* Normal view */}
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-full overflow-hidden shadow-sm">
                        <img
                          src={`${SERVERURL}/providerImages/${item.profile}`}
                          alt={item?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h2 className="text-lg mt-4 font-semibold text-green-900">{item?.name}</h2>
                      <p className="text-sm text-gray-600 font-semibold">{item?.role}</p>
                      <p
                        className={`text-sm font-medium mt-1 ${item?.status === "Active" ? "text-blue-500" : "text-red-500"
                          }`}
                      >
                        {item?.status}
                      </p>
                    </div>

                    {/* Hover overlay */}
                    {

                      <div className="absolute inset-0 bg-green-900 bg-opacity-95 text-white rounded-2xl p-6 flex flex-col justify-center items-center text-center opacity-0 hover:opacity-100 transition-all duration-500 ease-in-out">
                        <h2 className="text-lg font-bold mb-2">{item?.name}</h2>
                        <p className="text-sm mt-1">{item?.role}</p>
                        <p className="text-sm mt-1">{item?.email}</p>
                        <p className="text-sm mt-1">{item?.phone}</p>
                        <p className="text-sm mt-1 text-gray-300">Joined on {dayjs(item?.joinedDate).format("DD/MM/YYYY")}</p>

                        {
                          item?.status == "Inactive" &&
                          <p className="text-sm  text-gray-300">Leaved on {dayjs(item?.leaveDate).format("DD/MM/YYYY")}</p>

                        }

                        <div className="mt-4 space-x-3">
                          <Tooltip title="Edit">
                            <button onClick={() => { setShowEditModal(true); setEditProvider(item) }} className="bg-white text-green-800 px-2 py-1.5 rounded-full hover:bg-green-700 hover:text-white transition">
                              <FontAwesomeIcon icon={faPen} />
                            </button>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <button onClick={() => handleDelete(item?._id)} className="bg-white text-red-700 px-2 py-1.5 rounded-full hover:bg-red-600 hover:text-white transition">
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </Tooltip>
                        </div>
                      </div>
                    }


                  </div>
                ))

                :
                <div>No Providers Yet!!!</div>

            }


          </div>

        </div>


        {
          showEditModal && (
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">

                {/* Header */}
                <div className="flex justify-between items-center bg-green-700 text-white px-6 py-4">
                  <h2 className="text-lg font-semibold">Edit Service Provider</h2>
                  <FontAwesomeIcon
                    icon={faClose}
                    className="text-xl cursor-pointer hover:text-black transition"
                    onClick={() => setShowEditModal(false)}
                  />
                </div>

                {/* Body */}
                <div className="p-7 grid grid-cols-4 gap-2">
                  {/* Profile Picture */}
                  <div className="flex flex-col items-center space-y-3">

                    <label htmlFor="editProfilePic" className="relative w-28 h-28 rounded-full border-4 border-green-200 shadow-md" >
                      <img
                        src={
                          preview
                            ? preview
                            : `${SERVERURL}/providerImages/${editProvider?.profile}`
                        }
                        alt="Profile"
                        className="w-full h-full object-cover rounded-full"
                      />

                      <FontAwesomeIcon
                        icon={faCamera}
                        className="text-white text-xs bg-green-600 p-1.5 rounded-full absolute bottom-0 right-10 top-22 translate-x-1 translate-y-1 shadow-md"
                      />
                    </label>

                    <input onChange={(e) => handleImageUpload(e, "edit")} id="editProfilePic" type="file" className="hidden" />

                    <p className="text-gray-600 text-sm font-medium">Change Photo</p>
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-2 gap-4 col-span-3">
                    <div className="flex flex-col">
                      <label className="text-sm font-semibold text-gray-700">Name</label>
                      <input
                        type="text"
                        value={editProvider?.name}
                        placeholder='Enter name'
                        onChange={e => setEditProvider({ ...editProvider, name: e.target.value })}
                        className="mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="text-sm font-semibold text-gray-700">Email</label>
                      <input
                        value={editProvider?.email}
                        onChange={e => setEditProvider({ ...editProvider, email: e.target.value })}
                        type="email"
                        placeholder="Enter email"
                        className="mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="text-sm font-semibold text-gray-700">Phone</label>
                      <input
                        value={editProvider?.phone}
                        onChange={e => setEditProvider({ ...editProvider, phone: e.target.value })}
                        type="tel"
                        placeholder="Enter phone"
                        className="mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="text-sm font-semibold text-gray-700">Role</label>
                      <input
                        value={editProvider?.role}
                        onChange={e => setEditProvider({ ...editProvider, role: e.target.value })}
                        type="text"
                        placeholder="Enter role"
                        className="mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                      />
                    </div>

                    <div className="flex flex-col col-span-2">
                      <label className="text-sm font-semibold text-gray-700">Status</label>
                      <select
                        value={editProvider?.status}
                        onChange={e => setEditProvider({ ...editProvider, status: e.target.value })}
                        className="mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end bg-gray-100 px-6 py-4 rounded-b-2xl space-x-3">
                  <button
                    className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-200 transition"
                    onClick={() => setShowEditModal(false)}
                  >
                    Cancel
                  </button>
                  <button onClick={handleUpdateChanges}
                    className="px-5 py-2 rounded-lg bg-green-700 text-white font-semibold hover:bg-green-800 shadow-md transition"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )
        }

      </div>
      <Footer />
      <ToastContainer
        position="bottom-right"
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

export default AdminServiceProvider