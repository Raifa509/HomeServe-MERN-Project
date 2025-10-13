import React from "react";
import Header from "../../Users/components/Header";
import Footer from "../../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faStar } from "@fortawesome/free-solid-svg-icons";

function ServiceDetails() {
  return (
    <>
      <Header insideHeader={true} />


      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex flex-col">


        <section className="container mx-auto grid md:grid-cols-2 gap-10 px-30 py-16 items-center">

          {/* Text Section */}
          <div className="flex flex-col space-y-6">
            <h1 className="text-4xl md:text-4xl font-bold text-green-700 leading-tight">
              House Cleaning Services
            </h1>
            <p className="text-gray-700 text-lg leading-relaxed">
              Make your home spotless and stress-free with our professional cleaning
              experts. From living rooms to kitchens, we take care of every corner —
              so you can relax and enjoy a fresher, healthier space.
            </p>
            <div className="flex items-center space-x-8 text-gray-700">
              {/* Time Taken */}
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faClock} className="text-green-700 text-xl" />
                <p className="text-base">Approx. 2–4 Hours</p>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-1">
                <FontAwesomeIcon icon={faStar} className="text-yellow-500 text-lg" />
                <span className="ml-2 text-base font-medium">4.8/5</span>
              </div>
            </div>
            <button className="self-start px-6 py-3 bg-green-600 text-white rounded-2xl hover:bg-green-700 transition shadow-md cursor-pointer mt-4">
              Book Now
            </button>
          </div>

          {/* image section */}
          <div className="flex justify-center">
            <img
              src="/clean.png"
              alt="House Cleaning Service"
              className="w-full max-w-lg rounded-2xl"
            />
          </div>
        </section>

        {/* Service Details Section */}
        <section className="bg-white py-12 shadow-inner">
          <div className="container mx-auto px-6 max-w-4xl space-y-12">

            {/* About Service */}
            <div>
              <h2 className="text-3xl font-semibold text-green-700 mb-4">
                About This Service
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Our house cleaning service is designed to give your home a
                sparkling finish while saving you time and effort. We use
                high-quality, eco-friendly cleaning products to ensure your family
                and pets stay safe. Our team pays attention to every detail,
                ensuring each space is cleaned to perfection.
              </p>
            </div>

            {/* What’s Included */}
            <div>
              <h2 className="text-3xl font-semibold text-green-700 mb-4">
                What’s Included
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Dusting and wiping all surfaces</li>
                <li>Vacuuming carpets and mopping floors</li>
                <li>Bathroom deep cleaning and sanitization</li>
                <li>Kitchen cleaning including counters and appliances</li>
                <li>Bedroom and living room organization</li>
                <li>Trash removal and odor control</li>
              </ul>
            </div>

            {/* Pricing Section */}
            <div>
              <h2 className="text-3xl font-semibold text-green-700 mb-4">
                Pricing
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Our pricing depends on your home size and service frequency:
              </p>
              <div className="mt-4 space-y-2 text-gray-800">
                <p>🏠 <span className="font-semibold">1 BHK:</span> ₹1,200</p>
                <p>🏡 <span className="font-semibold">2 BHK:</span> ₹1,800</p>
                <p>🏘️ <span className="font-semibold">3 BHK:</span> ₹2,500</p>
                <p>🏢 <span className="font-semibold">4 BHK & Above:</span> ₹3,200+</p>

              </div>
            </div>

          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}

export default ServiceDetails;
