import React, { useState } from 'react'
import Header from "../../Users/components/Header";
import Footer from "../../components/Footer";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import FilterListIcon from '@mui/icons-material/FilterList';

function Services() {
  const [filterView, setFilterView] = useState(false)
  return (
    <>
      <Header insideHeader={true} />

      {/* service heading */}
      <div className='mt-10 flex items-center justify-center flex-col w-full bg-lime-50 p-5'>

        <h2 className='headingFont md:text-2xl text-xl font-medium text-green-900 mt-2'>Services</h2>

        <h3 className='headingFont font-medium md:text-lg text-sm text-center text-green-900 mt-2'>Quality Home Services from ₹299 — Reliable, Fast, Hassle-Free.</h3>

      </div>

      <div className="md:grid grid-cols-6 p-5">
        {/* filters section */}
        <div className='col-span-1 p-3 ms-5 md:mt-28'>
          <div className='flex md:justify-between justify-end' onClick={() => setFilterView(!filterView)}>
            <h2 className='text-lg me-1'>Filters</h2>
            <button  className='md:hidden'><FilterListIcon/>
            </button>
  
          </div>
          {/* list status */}
          <div className={filterView?'block':'md:block hidden'}>
            <div className='mt-3'>
              <input type="radio" id='all' name='filter' />
              <label className='ms-2' htmlFor="Literary">All</label>
            </div>
            <div className='mt-3'>
              <input type="radio" id='cleaning' name='filter' />
              <label className='ms-2' htmlFor="Literary">Cleaning</label>
            </div>
            <div className='mt-3'>
              <input type="radio" id='repairs' name='filter' />
              <label className='ms-2' htmlFor="Literary">Repairs</label>
            </div>
            <div className='mt-3'>
              <input type="radio" id='installation' name='filter' />
              <label className='ms-2' htmlFor="Literary">Installation</label>
            </div>
            <div className='mt-3'>
              <input type="radio" id='outdoor' name='filter' />
              <label className='ms-2' htmlFor="Literary">Outdoor & Gardening</label>
            </div>

            <div className='mt-3'>
              <input type="radio" id='moving' name='filter' />
              <label className='ms-2' htmlFor="Literary">Moving</label>
            </div>

            <div className='mt-3'>
              <input type="radio" id='painting' name='filter' />
              <label className='ms-2' htmlFor="Literary">Painting</label>
            </div>
          </div>

        </div>

        <div className='col-span-5 md:px-15 px-5'>
          {/* search bar */}
          <div className='relative md:w-xl md:mt-10 mt-5'>
            <FontAwesomeIcon
              icon={faSearch}
              className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500'
            />
            <input
              type="text"
              placeholder="Search service"
              className="w-full rounded-lg shadow pl-10 py-1 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-900"
            />
          </div>

          {/* duplicate card */}
          <div className="md:grid grid-cols-4 mt-15 gap-10 ">

            <div className="shadow-lg bg-white flex items-center justify-center p-4 flex-col rounded-xl transition-transform duration-400 hover:scale-105 relative ">
              <h2 className="text-green-700 font-semibold">House Cleaning</h2>
              <img src="./houseCleaning.png" alt="" className="mt-5 rounded-md" />

              <div className='bg-green-900 h-12 w-12 rounded-full absolute bottom-2.5 right-3 flex items-center justify-center cursor-pointer'>
                <Link to={'/service/id/details'}> <ArrowOutwardIcon className='text-white font-bold' fontSize='medium' /></Link>
              </div>
            </div>




          </div>

        </div>
      </div>

      <Footer />
    </>
  )
}

export default Services