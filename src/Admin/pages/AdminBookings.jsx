import React, { useEffect, useState } from 'react';
import AdminSideBar from "../components/AdminSideBar";
import AdminHeader from "../components/AdminHeader";
import Footer from "../../components/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faCircleCheck, faUser, faBriefcase, faPhone, faEnvelope, faGraduationCap, faClose, faLocationDot, faNoteSticky, faCircle, faCalendar, faBolt } from '@fortawesome/free-solid-svg-icons';
import Tooltip from '@mui/material/Tooltip';
import { assignProviderAPI, deleteBookingAPI, getAllBookingsAPI, getProviderBookingAPI, updateBookingStatusAPI } from '../../Services/allAPI';
import dayjs from 'dayjs';

function AdminBookings() {

  const [activeTab, setActiveTab] = useState("all");
  const [bookings, setBookings] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [providers, setProviders] = useState([]);
  const [deleteStatus, setDeleteStatus] = useState(false);

  // View Modal states
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      const adminToken = sessionStorage.getItem("token");
      fetchBookings(adminToken);
      fetchProviders(adminToken);
    }
  }, [searchKey, deleteStatus]);

  const fetchBookings = async (adminToken) => {
    const reqHeader = { 'Authorization': `Bearer ${adminToken}` };
    try {
      const result = await getAllBookingsAPI(searchKey, reqHeader);
      if (result.status === 200) setBookings(result.data);
    } catch (err) { console.log(err); }
  };

  const fetchProviders = async (adminToken) => {
    const reqHeader = { 'Authorization': `Bearer ${adminToken}` };
    try {
      const result = await getProviderBookingAPI(reqHeader);
      if (result.status === 200) {
        const activeProviders = result.data.filter(provider => provider.status.toLowerCase() === 'active');
        setProviders(activeProviders);
      }
    } catch (err) { console.log(err); }
  };

  // Delete booking
  const removeBooking = async (id) => {
    if (sessionStorage.getItem("token")) {
      const adminToken = sessionStorage.getItem("token");
      const reqHeader = { 'Authorization': `Bearer ${adminToken}` };

      try {
        const result = await deleteBookingAPI(id, reqHeader);
        if (result.status === 200) {
          setDeleteStatus(result.data);
        }
      } catch (err) { console.log(err); }
    }
  };

  // Assign Provider
  const assignProvider = async (bookingId, providerName) => {
    if (!providerName) return;

    const token = sessionStorage.getItem("token");
    const reqHeader = { 'Authorization': `Bearer ${token}` };

    try {
      const result = await assignProviderAPI(bookingId, { providerName }, reqHeader);

      if (result.status === 200) {
        const updatedBooking = result.data;

        setBookings(prev =>
          prev.map(b =>
            b._id === bookingId
              ? {
                ...b,
                assignedProvider: updatedBooking.assignedProvider,
                providerRole: updatedBooking.providerRole
              }
              : b
          )
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Update booking status
  const updateBookingStatus = async (id, status) => {
    const token = sessionStorage.getItem("token");
    const reqHeader = { 'Authorization': `Bearer ${token}` };

    try {
      const result = await updateBookingStatusAPI(id, { status }, reqHeader);
      if (result.status === 200) {
        fetchBookings(token);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const tabs = ["all", "upcoming", "emergency", "pending", "confirmed", "completed"];

  const tabLabels = {
    all: "All Bookings",
    upcoming: "Upcoming",
    emergency: "Emergency",
    pending: "Pending",
    confirmed: "Confirmed",
    completed: "Completed"
  };

  const today = new Date();

  const filteredBookings = bookings.filter(b => {
    const bookingDate = new Date(b.date);
    switch (activeTab) {
      case "all": return true;
      case "upcoming": return bookingDate >= today;
      case "emergency": return b.isEmergency;
      case "pending":
      case "confirmed":
      case "completed":
        return b.status.toLowerCase() === activeTab;
      default: return true;
    }
  });

  return (
    <>
      <div className="md:grid grid-cols-7 min-h-screen bg-gray-50">
        <div className='md:col-span-1 md:block hidden'><AdminSideBar /></div>

        <div className='col-span-6 flex flex-col'>
          <AdminHeader insideHeader={true} placeholder={'Search by service or customer'} onSearch={setSearchKey} />

          <div className='px-4 md:px-10 mt-10 w-full'>
            <h2 className='text-3xl font-bold text-green-900 mb-6'>Bookings</h2>

            {/* Tabs */}
            <div className="flex space-x-2 mb-6">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-4 rounded-t-lg font-semibold transition-all ${activeTab === tab
                    ? "bg-gradient-to-r from-green-400 to-green-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:text-green-700"}`}
                >
                  {tabLabels[tab]}
                </button>
              ))}
            </div>

            {/* Table */}
            <div className="overflow-x-auto shadow rounded-lg bg-white">
              <table className="min-w-full border-collapse table-auto">
                <thead className="bg-green-100 sticky top-0">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold">SL</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Customer</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Service</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Assign Provider</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredBookings.map((booking, index) => (
                    <tr key={booking._id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>

                      <td className="px-6 py-4 text-gray-700">{index + 1}</td>
                      <td className="px-6 py-4 text-gray-700">{booking.fullName}</td>
                      <td className="px-6 py-4 text-gray-700">{booking.serviceName}</td>
                      <td className="px-6 py-4 text-gray-700">
                        {booking.date ? dayjs(booking.date).format('DD-MM-YYYY') : '-'}
                      </td>

                      {/* Assign Provider */}
                      <td className="px-6 py-4">
                        {booking.assignedProvider ? (
                          <span className="text-gray-700">
                            {booking.assignedProvider} ({booking.providerRole})
                          </span>
                        ) : (
                          <select
                            className="border border-gray-300 rounded px-2 py-1"
                            onChange={(e) => assignProvider(booking._id, e.target.value)}
                          >
                            <option value="">Assign</option>
                            {providers.map(provider => (
                              <option key={provider._id} value={provider.name}>
                                {provider.name} ({provider.role})
                              </option>
                            ))}
                          </select>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 text-sm font-semibold rounded-full 
                          ${booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                            booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                              'bg-blue-100 text-blue-800'}`}>
                          {booking.status}
                        </span>
                      </td>

                      {/* ACTIONS */}
                      <td className="px-6 py-4 flex space-x-3">

                        {/* VIEW BUTTON */}
                        <Tooltip title="View Details">
                          <button
                            onClick={() => { setSelectedBooking(booking); setShowModal(true); }}
                            className="underline text-blue-500 cursor-pointer hover:text-blue-600 transition-color"
                          >
                          View
                          </button>
                        </Tooltip>

                        {/* APPROVE */}
                        {booking.status === "Pending" && (
                          <Tooltip title="Approve">
                            <button
                              onClick={() => updateBookingStatus(booking._id, "Confirmed")}
                              className="text-green-600 hover:text-green-800"
                            >
                              <FontAwesomeIcon icon={faCircleCheck} />
                            </button>
                          </Tooltip>
                        )}

                        {/* COMPLETE */}
                        {booking.status === "Confirmed" && (
                          <Tooltip title="Mark as Completed">
                            <button
                              onClick={() => updateBookingStatus(booking._id, "Completed")}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <FontAwesomeIcon icon={faCircleCheck} />
                            </button>
                          </Tooltip>
                        )}

                        {/* DELETE */}
                        <Tooltip title="Delete">
                          <button
                            onClick={() => removeBooking(booking._id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </Tooltip>

                      </td>
                    </tr>
                  ))}

                  {filteredBookings.length === 0 && (
                    <tr>
                      <td colSpan="7" className="text-center py-6 text-gray-500">
                        No bookings found.
                      </td>
                    </tr>
                  )}

                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>


      {showModal && selectedBooking && (
        <div className="fixed w-full h-full bg-gray-500/20 inset-0 backdrop-blur-xs flex items-center justify-center z-50">

          <div className="w-120 bg-green-50 rounded-2xl shadow-2xl p-6">

            {/* Header */}
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="text-xl font-semibold text-green-900">Booking Details</h2>
              <FontAwesomeIcon
                icon={faClose}
                className="text-lg text-green-900 cursor-pointer"
                onClick={() => setShowModal(false)}
              />
            </div>

            {/* Content */}
            <div className="mt-5 flex flex-col space-y-4 text-md font-semibold text-gray-700">


              <p><FontAwesomeIcon icon={faUser} className="me-2" />Full Name: {selectedBooking.fullName}</p>

              <p><FontAwesomeIcon icon={faBriefcase} className="me-2" />Service: {selectedBooking.serviceName}</p>

              <p><FontAwesomeIcon icon={faPhone} className="me-2" />Phone: {selectedBooking.phone}</p>

              <p>
                <FontAwesomeIcon icon={faBolt} className="me-2" />
                Emergency: {selectedBooking.isEmergency ? "Yes" : "No"}
              </p>

              <p>
                <FontAwesomeIcon icon={faCalendar} className="me-2" />
                Date: {selectedBooking.date ? dayjs(selectedBooking.date).format("DD-MM-YYYY") : "Not selected"}
              </p>

              <p><FontAwesomeIcon icon={faLocationDot} className="me-2" />Address: {selectedBooking.address}</p>

              <p><FontAwesomeIcon icon={faNoteSticky} className="me-2" />Notes: {selectedBooking.additionalNotes || "None"}</p>

              <p><FontAwesomeIcon icon={faCircle} className="me-2" />Status: {selectedBooking.status}</p>
            </div>

            {/* Footer */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-2xl"
              >
                Close
              </button>
            </div>

          </div>

        </div>
      )}

      <Footer />
    </>
  );
}

export default AdminBookings;
