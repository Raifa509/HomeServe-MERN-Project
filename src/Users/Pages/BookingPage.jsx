import React, { useEffect, useState } from "react";
import Header from "../../Users/components/Header";
import Footer from "../../components/Footer";
import { addBookingAPI, getServicesBookingAPI } from "../../Services/allAPI";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function BookingPage() {
  const [isEmergency, setIsEmergency] = useState(false);
  const [normalServices, setNormalServices] = useState([]);
  const [emergencyServices, setEmergencyServices] = useState([]);
  const [token, setToken] = useState("");
  const [bookingData, setBookingData] = useState({
    serviceName: "",
    fullName: "",
    phone: "",
    date: "",
    address: "",
    additionalNotes: ""
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = sessionStorage.getItem("token");
    if (userToken) {
      setToken(userToken);
      fetchServices();
    }
  }, []);

  const fetchServices = async () => {
    try {
      const result = await getServicesBookingAPI();
      if (result.status === 200) {
        const normal = result.data.filter(item => !item.isEmergency);
        const emergency = result.data.filter(item => item.isEmergency);

        setNormalServices(normal);
        setEmergencyServices(emergency);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    const { serviceName, fullName, phone, date, address, additionalNotes } = bookingData;

    // Validation
    if (!serviceName || !fullName || !phone || (!isEmergency && !date) || !address) {
      alert("Please fill all required fields!");
      return;
    }
    if (!token) {
      alert("Please login first to book a service!");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
      return;
    }

    const reqHeader = { 'Authorization': `Bearer ${token}` };
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
    };

    try {
      const result = await addBookingAPI(reqBody, reqHeader);
      if (result.status === 200) {
        // Show appreciation page
        setBookingSuccess(true);
        setBookingData({ serviceName: "", fullName: "", phone: "", date: "", address: "", additionalNotes: "" });
      }
    } catch (err) {
      console.log(err);
      alert("Something went wrong. Please try again!");
    }
  };

  // Appreciation Page
  if (bookingSuccess) {
    return (
      <>
        <Header insideHeader={true} />
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-50 via-white to-green-100 px-4">
          <div className="text-center max-w-xl">
            <h1 className="text-5xl font-extrabold text-green-800 mb-4">Thank You!</h1>
            <p className="text-gray-700 text-lg mb-6">
              Your booking has been successfully submitted. Our professional team will contact you shortly.
            </p>
            <button
              onClick={() => { setBookingSuccess(false); navigate("/"); }}
              className="bg-green-700 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-800 transition"
            >
              Back to Home
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }
  if (!token) {
    return (
      <>
        <Header insideHeader={true} />
        <div className="flex flex-col items-center justify-center py-16 text-center min-h-screen">
          <img
            src="https://assets-v2.lottiefiles.com/a/790b2fc0-1171-11ee-afd8-87913996c05d/JCzKThXsSJ.gif"
            alt="lock"
            className="w-60 mb-4"
          />
          <h1 className="text-2xl font-semibold text-green-800 mb-2">Login to book a service</h1>
          <p className="text-gray-600 mb-6">Please login to access booking options.</p>
          <Link
            to="/login"
            className="px-6 py-2 bg-green-700 text-white rounded-xl hover:bg-green-800 transition shadow-md"
          >
            Login Now
          </Link>
        </div>
        <Footer />
      </>
    );
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
              <select
                value={bookingData.serviceName}
                onChange={(e) => setBookingData({ ...bookingData, serviceName: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              >
                <option value="">-- Choose a Service --</option>
                {!isEmergency
                  ? normalServices.map((item, index) => <option key={index} value={item.name}>{item.name}</option>)
                  : emergencyServices.map((item, index) => <option key={index} value={item.name}>{item.name}</option>)
                }
              </select>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Full Name <span className="text-red-500">*</span></label>
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
              <label className="block text-gray-700 font-medium mb-2">Phone Number <span className="text-red-500">*</span></label>
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
                <label className="block text-gray-700 font-medium mb-2">Preferred Date <span className="text-red-500">*</span></label>
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
              <label className="block text-gray-700 font-medium mb-2">Service Address <span className="text-red-500">*</span></label>
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
              <label className="block text-gray-700 font-medium mb-2">Additional Notes (optional)</label>
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
              <button
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
    </>
  );
}

export default BookingPage;
