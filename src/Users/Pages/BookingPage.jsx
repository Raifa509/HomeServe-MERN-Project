import React, { useEffect, useState } from "react";
import Header from "../../Users/components/Header";
import Footer from "../../components/Footer";
import { addBookingAPI, getAllUserServicesAPI, getServicesBookingAPI } from "../../Services/allAPI";
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from "react-router-dom";

function BookingPage() {
  const [isEmergency, setIsEmergency] = useState(false);
  const [services, setServices] = useState([])
  const [normalServices, setNormalServices] = useState([])
  const [emergencyServices, setEmergencyServices] = useState([])
  const navigate = useNavigate()
  const [bookingData, setBookingData] = useState({
    serviceName: "", fullName: "", phone: "", date: "", address: "", additionalNotes: ""
  })

  useEffect(() => {
    fetchServices()
  }, [])

  // console.log(services);
  // console.log(normalServices);
  // console.log(emergencyServices);
  // console.log(bookingData);

  const fetchServices = async () => {

    try {
      const result = await getServicesBookingAPI()
      if (result.status == 200) {
        setServices(result.data)

        const normal = result.data.filter(item => !item.isEmergency)
        const emergency = result.data.filter(item => item.isEmergency)

        setNormalServices(normal)
        setEmergencyServices(emergency)

      }
    } catch (err) {
      console.log(err);

    }


  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = sessionStorage.getItem("token")
    const { serviceName, fullName, phone, date, address, additionalNotes } = bookingData
    if (!serviceName || !fullName || !phone || (!isEmergency && !date) || !address) {
      toast.info("Please fill the form completely!!");
      return;
    }
    if (!token) {
      toast.info('Please login first to book a service!');
      setTimeout(() => {
        navigate('/login');
      }, 1800);
      return;
    }
    const reqHeader = {
      'Authorization': `Bearer ${token}`,
    }
    const user = JSON.parse(sessionStorage.getItem("user"));
    const reqBody = {
      customerName: user.username,
      serviceName,
      fullName,
      phone,
      date: !isEmergency ? date : null,
      address,
      additionalNotes,
      isEmergency
    }
    try {
      const result = await addBookingAPI(reqBody, reqHeader)
      if (result.status == 200) {
        toast.success('Booking Successfull!!')
        setBookingData({ serviceName: "", fullName: "", phone: "", date: "", address: "", additionalNotes: "" });
      }
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong!');
    }


  }

  return (
    <>
      <Header insideHeader={true} />

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 py-12">
        <div className="container mx-auto max-w-3xl bg-white shadow-xl rounded-2xl p-8">

          {/* Title */}
          <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
            {isEmergency ? "Emergency Service Booking" : "Book a Service"}
          </h1>

          <p className="text-center text-gray-700 mb-8">
            Fill in your details below to book a service. Our team will confirm your booking shortly.
          </p>

          {/* Service Type Toggle */}
          <div className="mb-6 flex justify-center space-x-4">
            <button
              onClick={() => setIsEmergency(false)}
              className={`px-4 py-2 rounded-lg font-semibold border ${!isEmergency
                ? "bg-green-600 text-white border-green-600"
                : "bg-white text-gray-700 border-gray-300"
                }`}
            >
              Normal
            </button>
            <button
              onClick={() => setIsEmergency(true)}
              className={`px-4 py-2 rounded-lg font-semibold border ${isEmergency
                ? "bg-green-600 text-white border-green-600"
                : "bg-white text-gray-700 border-gray-300"
                }`}
            >
              Emergency
            </button>
          </div>

          {/* Booking Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>

            {/* Service Selection */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Select Service <span className="text-red-500">*</span>
              </label>
              <select value={bookingData.serviceName}
                onChange={(e) => setBookingData({ ...bookingData, serviceName: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              >
                <option value="">-- Choose a Service --</option>
                {!isEmergency ?
                  normalServices.map((item, index) => (
                    <option key={index} value={item.name}>{item.name}</option>
                  ))

                  :
                  emergencyServices.map((item, index) => (
                    <option key={index} value={item.name}>{item.name}</option>
                  ))
                }
              </select>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={bookingData.fullName}
                onChange={e => setBookingData({ ...bookingData, fullName: e.target.value })}
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                value={bookingData.phone}
                onChange={e => setBookingData({ ...bookingData, phone: e.target.value })}
                type="tel"
                placeholder="Enter your phone number"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            {/* Date (only for Normal bookings) */}
            {!isEmergency && (
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Preferred Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={bookingData.date}
                  onChange={e => setBookingData({ ...bookingData, date: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
            )}

            {/* Address */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Service Address <span className="text-red-500">*</span>
              </label>
              <textarea
                rows="3"
                value={bookingData.address}
                onChange={e => setBookingData({ ...bookingData, address: e.target.value })}
                placeholder="Enter your complete address"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              ></textarea>
            </div>

            {/* Additional Notes */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Additional Notes (optional)
              </label>
              <textarea
                rows="2"
                value={bookingData.additionalNotes}
                onChange={e => setBookingData({ ...bookingData, additionalNotes: e.target.value })}
                placeholder="Any special instructions..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button onClick={handleSubmit}
                type="submit"
                className="bg-green-600 text-white font-semibold px-8 py-3 rounded-2xl hover:bg-green-700 transition shadow-md"
              >
                {isEmergency ? "Submit Emergency Request" : "Submit Booking"}
              </button>
            </div>
          </form>
        </div>
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
  );
}

export default BookingPage;
