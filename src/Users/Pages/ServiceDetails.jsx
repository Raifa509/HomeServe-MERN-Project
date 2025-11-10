import React, { useState } from "react";
import Header from "../../Users/components/Header";
import Footer from "../../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faIndianRupeeSign, faStar } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import { getServiceDetailsAPI } from "../../Services/allAPI";
import { toast, ToastContainer } from 'react-toastify'
import { useEffect } from "react";
import SERVERURL from "../../Services/server";

function ServiceDetails() {

  const [serviceDetails, setServiceDetails] = useState({})
  const { id } = useParams()
  const [token, setToken] = useState("")

  console.log(serviceDetails);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      const usertoken = sessionStorage.getItem("token")
      setToken(usertoken)
      fetchServiceDetails()
    }
  }, [])

  const fetchServiceDetails = async () => {
    if (sessionStorage.getItem("token")) {
      const userToken = sessionStorage.getItem("token")
      const reqHeader = {
        'Authorization': `Bearer ${userToken}`
      }
      try {
        const result = await getServiceDetailsAPI(id, reqHeader)
        if (result.status == 200) {
          setServiceDetails(result.data)
        } else {
          console.log(result);

        }
      } catch (err) {
        console.log(err);

      }
    }
  }

  return (
    <>
      <Header insideHeader={true} />


      {
        token ?
          <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex flex-col">


            {
              serviceDetails?.length > 0 &&
              serviceDetails?.map(item => (
                <div key={item?._id}>
                  <section className="container mx-auto md:grid grid-cols-2 gap-10 md:px-30 px-10 py-16 items-center">

                    {/* Text Section */}
                    <div className="flex flex-col space-y-6">
                      <h1 className="text-4xl md:text-4xl font-bold text-green-700 leading-tight">
                        {item?.name}
                      </h1>
                      <p className="text-gray-700 text-lg leading-relaxed">
                        {item?.description}
                      </p>
                      <div className="flex items-center space-x-8 text-gray-700">
                        {/* Time Taken */}
                        <div className="flex items-center space-x-2">
                          <FontAwesomeIcon icon={faClock} className="text-green-700 text-xl" />
                          <p className="text-base">Approx. {item?.
                            duration}</p>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center space-x-1">
                          <FontAwesomeIcon icon={faStar} className="text-yellow-500 text-lg" />
                          <span className="ml-2 text-base font-medium">{item?.rating}/5</span>
                        </div>

                        <div className="flex items-center space-x-1">
                          <FontAwesomeIcon icon={faIndianRupeeSign} className="text-lg text-green-700" />
                          <p className="text-base font-medium">Starting from ₹{item?.price}</p>
                        </div>

                      </div>
                      <Link to={'/booking'}>
                        <button className="self-start px-6 py-3 bg-green-600 text-white rounded-2xl hover:bg-green-700 transition shadow-md cursor-pointer mt-4">
                          Book Now
                        </button>
                      </Link>
                    </div>

                    {/* image section */}
                    <div className="md:flex justify-center hidden">
                      <img
                        src={`${SERVERURL}/uploads/${item?.detailImage
                          }`}
                        alt="House Cleaning Service"
                        className="w-full max-w-lg rounded-2xl"
                      />
                    </div>
                  </section>

                  {/* Service Details Section */}
                  <section className="bg-white py-12 shadow-inner">
                    <div className="container mx-auto md:px-6 px-10 max-w-4xl space-y-12">

                      {/* About Service */}
                      <div>
                        <h2 className="text-3xl font-semibold text-green-700 mb-4">
                          About This Service
                        </h2>
                        <p className="text-gray-700 leading-relaxed text-justify">
                          {item?.about}
                        </p>
                      </div>

                      {/* What’s Included */}
                      <div>
                        <h2 className="text-3xl font-semibold text-green-700 mb-4">
                          What’s Included
                        </h2>
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                          {item?.whatsIncluded?.map((includedItem, index) => (
                            <li key={index}>{includedItem}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Pricing Section */}
                      {item?.pricingTiers?.some(tier => tier.name && tier.price) && (
                        <div>
                          <h2 className="text-3xl font-semibold text-green-700 mb-4">
                            Pricing
                          </h2>
                          <p className="text-gray-700 leading-relaxed">
                            Our pricing depends on your home size and service frequency:
                          </p>

                          <div className="mt-4 space-y-2 text-gray-800">
                            {item.pricingTiers
                              .filter(tier => tier.name && tier.price)
                              .map(tier => (
                                <p key={tier._id}>
                                  <span className="font-semibold">{tier.name}:</span> ₹{tier.price}
                                </p>
                              ))}
                          </div>
                        </div>
                      )}


                    </div>
                  </section>

                </div>
              ))
            }

          </div>

          :
          // <div className='flex flex-col my-4 justify-center items-center min-h-52'>
          //   <img src="https://assets-v2.lottiefiles.com/a/790b2fc0-1171-11ee-afd8-87913996c05d/JCzKThXsSJ.gif" alt="lock" className='w-72' />
          //   <h1 className='font-semibold text-lg'>Please <Link to={'/login'} className='text-blue-500 underline'>Login</Link> to explore more...</h1>
          // </div>

          <div className="flex flex-col items-center justify-center py-16 text-center">
            <img
              src="https://assets-v2.lottiefiles.com/a/790b2fc0-1171-11ee-afd8-87913996c05d/JCzKThXsSJ.gif"
              alt="lock"
              className="w-60 mb-4"
            />
            <h1 className="text-2xl font-semibold text-green-800 mb-2">
              Login to unlock this service 
            </h1>
            <p className="text-gray-600 mb-6">
              Access pricing, duration, and booking options by logging in.
            </p>
            <Link
              to="/login"
              className="px-6 py-2 bg-green-700 text-white rounded-xl hover:bg-green-800 transition shadow-md"
            >
              Login Now
            </Link>
          </div>


      }


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

export default ServiceDetails;
