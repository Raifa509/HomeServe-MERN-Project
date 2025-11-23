import React from 'react';
import Header from "../components/Header";
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';

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
              <Link to={'/emergency'}>
                <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition">
                  Emergency Service
                </button>
              </Link>
              <button className="bg-transparent border border-white text-white hover:bg-white hover:text-black font-semibold px-6 py-3 rounded-full transition">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

    <div className='min-h-screen'>

    </div>
      
      <Footer />
    </>
  );
}

export default Home;
