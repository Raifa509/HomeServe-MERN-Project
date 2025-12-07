import React, { useEffect, useState } from 'react';
import Header from '../../Users/components/Header';
import Footer from '../../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt, faCalendarAlt, faWrench, faStickyNote, faUser } from '@fortawesome/free-solid-svg-icons';
import { getBookingsProfileAPI } from '../../Services/allAPI';

function Profile() {
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [token, setToken] = useState("");
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token");
      setToken(token);
      const user = JSON.parse(sessionStorage.getItem("user"));
      setUsername(user.username);
      setUserEmail(user.email);
      fetchBookings(user.username);
    }
  }, []);

  const fetchBookings = async (username) => {
    try {
      const result = await getBookingsProfileAPI(username);
      if (result.status === 200) {
        setBookings(result.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Header insideHeader={true} />

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 py-12 px-5 md:px-0">
        <div className="container mx-auto max-w-5xl">

          {/* Profile Card */}
          <div className="bg-white shadow-2xl rounded-3xl p-8 flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">

            {/* Avatar */}
            <div className="w-25 h-25 rounded-full bg-green-200 flex items-center justify-center text-green-700 text-5xl font-bold">
              {username?.charAt(0)?.toUpperCase()}
            </div>

            {/* User Info */}
            <div className="flex-1 flex flex-col text-center md:text-left">
              <h1 className="text-4xl font-bold text-green-800">{username}</h1>

              <div className="mt-4 space-y-2 text-gray-700">
                <p className="flex items-center justify-center md:justify-start gap-2">
                  <FontAwesomeIcon icon={faEnvelope} /> {userEmail}
                </p>
              </div>
            </div>
          </div>

          {/* Booking History */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Your Bookings</h2>
            <div className="grid md:grid-cols-3 gap-5">
              {bookings.length > 0 ? (
                bookings.map((booking, index) => (
                  <div
                    key={index}
                    className="bg-white shadow-xl rounded-2xl p-6 flex flex-col justify-between hover:shadow-2xl transition duration-300 min-h-[380px]"
                  >
                    {/* Header: Service Name & Status */}
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-green-800">{booking.serviceName}</h3>
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${booking.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : booking.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                      >
                        {booking.status}
                      </span>
                    </div>

                    {/* Booking Details */}
                    <div className="mt-4 space-y-2 text-gray-700 flex-1">
                      <p className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faUser} /> {booking.fullName}
                      </p>
                      <p className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faPhone} /> {booking.phone}
                      </p>
                      <p className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faCalendarAlt} />{" "}
                        {booking.isEmergency ? "Emergency" : new Date(booking.date).toLocaleDateString()}
                      </p>
                      <p className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faMapMarkerAlt} /> {booking.address}
                      </p>

                      {(booking.status === "Confirmed" || booking.status === "Completed") && (
                        <p className="flex items-center gap-2">
                          <FontAwesomeIcon icon={faWrench} /> Assigned Provider: {booking.assignedProvider || "Not Assigned"} ({booking.providerRole || "-"})
                        </p>
                      )}

                      {booking.additionalNotes && (
                        <p className="flex items-center gap-2">
                          <FontAwesomeIcon icon={faStickyNote} /> Notes: {booking.additionalNotes}
                        </p>
                      )}
                    </div>

                    {/* Call Button */}
                    {booking.status === "Pending" || booking.status === "Confirmed" ? (
                      <a
                        href="mailto:contact@homeserve.gmail.com"
                        className="mt-4 inline-flex items-center justify-center gap-2 bg-green-600 text-white rounded-xl text-sm py-2 font-semibold hover:bg-green-700 transition shadow-md"
                      >
                        <FontAwesomeIcon icon={faEnvelope} /> contact@homeserve.gmail.com
                      </a>
                    ) : (
                      <div className="mt-4 h-[44px]"></div>
                    )}


                  </div>
                ))
              ) : (
                <p className="text-center col-span-3 text-gray-500">No bookings found.</p>
              )}
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}

export default Profile;
