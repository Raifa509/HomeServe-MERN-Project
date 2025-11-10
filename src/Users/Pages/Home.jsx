import React from 'react';
import Header from "../components/Header";
import Footer from '../../components/Footer';

function Home() {
  return (
    <>
      <Header />

      {/* Hero Section */}
      <div className='min-h-screen relative bg-cover bg-center'>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/video.mp4" type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/65"></div>

        <div className='min-h-screen relative z-10 flex flex-col'>
          {/* Centered Hero Text */}
          <div className='flex flex-1 items-center justify-center mb-17 text-center px-5 md:px-96 flex-col'>
            <div>
              <h2 className='text-white font-semibold text-3xl md:text-5xl leading-relaxed'>
                Trusted <span className='text-yellow-300'> Professionals </span> for Every Job in Your Home
              </h2>
              <h2 className='text-white text-md mt-2'>
                Expert help for every home need, with trusted professionals <br /> at your fingertips.
              </h2>
            </div>

            <div className="flex gap-4 mt-10">
              <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition">
                Book Now
              </button>
              <button className="bg-transparent border border-white text-white hover:bg-white hover:text-black font-semibold px-6 py-3 rounded-full transition">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Service Section */}
      {/* <section className="bg-gray-50 py-16 px-6 md:px-20 text-center">
        <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
          🚨 Premium 24/7 Emergency Home Service
        </h3>
        <p className="text-gray-600 max-w-3xl mx-auto mb-8 text-lg">
          We understand that emergencies can happen anytime — day or night. That’s why our
          <span className="font-semibold text-yellow-600"> Premium Emergency Team </span>
          is available <strong>24/7</strong> to provide immediate help within <strong>1 hour</strong>.
          From sudden plumbing leaks and electrical faults to urgent AC repairs, our professionals are
          always on standby to bring you fast, reliable, and high-quality service when you need it most.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-10 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <h4 className="text-xl font-semibold mb-3 text-yellow-500">🚰 Plumbing Emergencies</h4>
            <p className="text-gray-600">
              Burst pipes, leaking taps, or blocked drains — we’ll fix it before it gets worse.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <h4 className="text-xl font-semibold mb-3 text-yellow-500">⚡ Electrical Failures</h4>
            <p className="text-gray-600">
              Power outages or wiring issues? Our licensed electricians will respond immediately.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <h4 className="text-xl font-semibold mb-3 text-yellow-500">❄️ AC & Appliance Issues</h4>
            <p className="text-gray-600">
              Stay cool and comfortable — quick fixes for AC or appliance breakdowns anytime.
            </p>
          </div>
        </div>

        <button className="mt-10 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-8 py-4 rounded-full shadow-lg transition">
          Request Emergency Help Now
        </button>
      </section> */}
    <div className='min-h-screen'>

    </div>
      
      <Footer />
    </>
  );
}

export default Home;
