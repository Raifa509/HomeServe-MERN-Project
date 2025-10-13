import React, { useState } from "react";
import Header from "../../Users/components/Header";
import Footer from "../../components/Footer";

function BookingPage() {
  const [isEmergency, setIsEmergency] = useState(false);

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
              className={`px-4 py-2 rounded-lg font-semibold border ${
                !isEmergency
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              Normal
            </button>
            <button
              onClick={() => setIsEmergency(true)}
              className={`px-4 py-2 rounded-lg font-semibold border ${
                isEmergency
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              Emergency
            </button>
          </div>

          {/* Booking Form */}
          <form className="space-y-6">
            
            {/* Service Selection */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Select Service <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              >
                <option value="">-- Choose a Service --</option>
                {!isEmergency && (
                  <>
                    <option>House Cleaning</option>
                    <option>Plumbing</option>
                    <option>Electrical Repairs</option>
                    <option>Painting</option>
                    <option>AC Servicing</option>
                    <option>Gardening</option>
                  </>
                )}
                {isEmergency && (
                  <>
                    <option>Plumbing</option>
                    <option>Electrical</option>
                    <option>AC Repair</option>
                    <option>Gas Leak</option>
                    <option>Fire Safety</option>
                    <option>Leak Repair</option>
                    <option>Power Outage</option>
                    <option>Roof Leakage</option>
                    <option>Locksmith</option>
                    <option>Water Damage</option>
                  </>
                )}
              </select>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
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
