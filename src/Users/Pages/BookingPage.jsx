import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Header from "../../Users/components/Header";
import Footer from "../../components/Footer";
import { addBookingAPI, getServicesBookingAPI } from "../../Services/allAPI";
import { useNavigate, Link } from "react-router-dom";

function BookingPage() {
  const [isEmergency, setIsEmergency] = useState(false);
  const [normalServices, setNormalServices] = useState([]);
  const [emergencyServices, setEmergencyServices] = useState([]);
  const [token, setToken] = useState("");
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

  const initialValues = {
    serviceName: "",
    fullName: "",
    phone: "",
    date: "",
    address: "",
    additionalNotes: ""
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0); // remove time for accurate date comparison

  const validationSchema = Yup.object().shape({
    serviceName: Yup.string().required("Service is required"),
    fullName: Yup.string().required("Full name is required"),
    phone: Yup.string()
      .matches(/^[0-9]+$/, "Phone number must be digits only")
      .min(10, "Phone number must be at least 10 digits").max(10,"Must be 10 digit")
      .required("Phone number is required"),
    date: !isEmergency
      ? Yup.date()
          .min(today, "Date must be today or in the future")
          .required("Date is required")
      : Yup.date().nullable(),
    address: Yup.string().required("Address is required"),
    additionalNotes: Yup.string()
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    if (!token) {
      alert("Please login first to book a service!");
      setTimeout(() => navigate("/login"), 1500);
      return;
    }

    const user = JSON.parse(sessionStorage.getItem("user"));
    const reqBody = {
      customerName: user.username,
      serviceName: values.serviceName,
      fullName: values.fullName,
      phone: values.phone,
      date: !isEmergency ? values.date : null,
      address: values.address,
      additionalNotes: values.additionalNotes,
      isEmergency
    };

    try {
      const reqHeader = { Authorization: `Bearer ${token}` };
      const result = await addBookingAPI(reqBody, reqHeader);
      if (result.status === 200) {
        setBookingSuccess(true);
        resetForm();
      }
    } catch (err) {
      console.log(err);
      alert("Something went wrong. Please try again!");
    }
    setSubmitting(false);
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

  // If user is not logged in
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
              className={`px-4 py-2 rounded-lg font-semibold border ${!isEmergency ? "bg-green-600 text-white border-green-600" : "bg-white text-gray-700 border-gray-300"}`}
            >
              Normal
            </button>
            <button
              onClick={() => setIsEmergency(true)}
              className={`px-4 py-2 rounded-lg font-semibold border ${isEmergency ? "bg-green-600 text-white border-green-600" : "bg-white text-gray-700 border-gray-300"}`}
            >
              Emergency
            </button>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                {/* Service Selection */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Select Service <span className="text-red-500">*</span>
                  </label>
                  <Field as="select" name="serviceName"
                         className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option value="">-- Choose a Service --</option>
                    {!isEmergency
                      ? normalServices.map((item, index) => <option key={index} value={item.name}>{item.name}</option>)
                      : emergencyServices.map((item, index) => <option key={index} value={item.name}>{item.name}</option>)
                    }
                  </Field>
                  <ErrorMessage name="serviceName" component="div" className="text-red-500 text-sm mt-1"/>
                </div>

                {/* Full Name */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <Field
                    type="text"
                    name="fullName"
                    placeholder="Enter your name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <ErrorMessage name="fullName" component="div" className="text-red-500 text-sm mt-1"/>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <Field
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone number"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1"/>
                </div>

                {/* Date (only for Normal bookings) */}
                {!isEmergency && (
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Preferred Date <span className="text-red-500">*</span>
                    </label>
                    <Field
                      type="date"
                      name="date"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <ErrorMessage name="date" component="div" className="text-red-500 text-sm mt-1"/>
                  </div>
                )}

                {/* Address */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Service Address <span className="text-red-500">*</span>
                  </label>
                  <Field
                    as="textarea"
                    rows="3"
                    name="address"
                    placeholder="Enter your complete address"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <ErrorMessage name="address" component="div" className="text-red-500 text-sm mt-1"/>
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Additional Notes (optional)</label>
                  <Field
                    as="textarea"
                    rows="2"
                    name="additionalNotes"
                    placeholder="Any special instructions..."
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <ErrorMessage name="additionalNotes" component="div" className="text-red-500 text-sm mt-1"/>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-green-600 text-white font-semibold px-8 py-3 rounded-2xl hover:bg-green-700 transition shadow-md"
                  >
                    {isEmergency ? "Submit Emergency Request" : "Submit Booking"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default BookingPage;
