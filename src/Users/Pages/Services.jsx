import React, { useState } from 'react'
import Header from "../../Users/components/Header";
import Footer from "../../components/Footer";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import FilterListIcon from '@mui/icons-material/FilterList';
import { getAllUserServicesAPI } from '../../Services/allAPI';
import { toast, ToastContainer } from 'react-toastify'
import { useEffect } from 'react';
import SERVERURL from '../../Services/server';

function Services() {
  const [filterView, setFilterView] = useState(false)
  const [services, setServices] = useState([])
  const [searchKey, setSearchKey] = useState("")
  const [tempServices, setTempServices] = useState([])
  const [allCategories, setAllCategories] = useState([])

  useEffect(() => {
    getAllServices()
  }, [searchKey])

  // console.log(services);

  const getAllServices = async () => {

    try {
      const result = await getAllUserServicesAPI(searchKey)
      if (result.status == 200) {
        setServices(result.data)
        setTempServices(result.data)
        const tempCategory = result.data.filter(item => item.category !== 'Emergency').map(item => item.category)
        // console.log(tempCategory);
        const tempArray = [...new Set(tempCategory)]
        // console.log(tempArray);
        setAllCategories(tempArray)

      } else {
        console.log(result);
        toast.warning(result.response.data)
      }
    } catch (err) {
      console.log(err);

    }
  }

  const filterServices = async (category) => {
    if (category == "All") {
      setServices(tempServices.filter(item => item.category !== "Emergency"))
    } else {
      setServices(
        tempServices.filter(
          item => item.category === category && item.category !== "Emergency"
        )
      )
    }
  }
  return (
    <>
      <Header insideHeader={true} />

      {/* service heading */}
      <div className='mt-10 flex items-center justify-center flex-col w-full bg-lime-50 p-5'>

        <h2 className='headingFont md:text-2xl text-xl font-medium text-green-900 mt-2'>Services</h2>

        <h3 className='headingFont font-medium md:text-lg text-sm text-center text-green-900 mt-2'>Quality Home Services from ₹799 — Reliable, Fast, Hassle-Free.</h3>

      </div>

      <div className="md:grid grid-cols-6 p-5">
        {/* filters section */}
        <div className='col-span-1 p-3 ms-5 md:mt-28'>
          <div className='flex md:justify-between justify-end' onClick={() => setFilterView(!filterView)}>
            <h2 className='text-lg me-1'>Filters</h2>
            <button className='md:hidden'><FilterListIcon />
            </button>

          </div>
          {/* list status */}
          <div className={filterView ? 'block' : 'md:block hidden'}>
            <div className='mt-3'>
              <input type="radio" id='all' name='filter' onClick={() => filterServices("All")} />
              <label className='ms-2' htmlFor="all">All</label>
            </div>

            {
              allCategories?.map((item, index) => (
                <div key={index} className='mt-3'>
                  <input type="radio" id={item} name='filter' onClick={() => filterServices(item)} />
                  <label className='ms-2' htmlFor={item}>{item}</label>
                </div>
              ))
            }

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
              value={searchKey}
              onChange={e => setSearchKey(e.target.value)}
              placeholder="Search service"
              className="w-full rounded-lg shadow pl-10 py-1 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-900"
            />
          </div>


          <div className="md:grid grid-cols-4 mt-15 gap-10 mb-15">
            {/* duplicate card */}

            {
              services?.length > 0 ?
                services?.filter(item => !item.isEmergency)?.map(item => (
                  <div key={item?._id} className="shadow-lg bg-white flex items-center justify-center p-4 flex-col rounded-xl transition-transform duration-400 hover:scale-105 relative ">
                    <h2 className="text-green-700 font-semibold">{item?.name}</h2>
                    <img src={`${SERVERURL}/uploads/${item?.thumbnail}`} alt="" className="mt-5 rounded-md w-48 h-48 object-cover" />

                    <div className='bg-green-900 h-12 w-12 rounded-full absolute bottom-2.5 right-3 flex items-center justify-center cursor-pointer'>
                      <Link to={`/service/${item?._id}/details`}>
                        <ArrowOutwardIcon className='text-white font-bold' fontSize='medium' />
                      </Link>

                    </div>
                  </div>
                ))


                :
                <p>No Services Available!!</p>
            }

          </div>

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
  )
}

export default Services