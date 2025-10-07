import { faBars, faBriefcase, faClipboardList, faGear, faHouse, faSearch, faSignOutAlt, faUserCircle, faUsers, faUserTie } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function AdminHeader({ insideHeader ,placeholder}) {
  const [listStatus, setListStatus] = useState(false)

  return (
    <>
      <div className='flex items-center justify-center md:hidden py-1 bg-lime-50 '>
        <img src="/logo.png" alt="" width={'60px'} />
        <h2 className='headingFont text-xl font-semibold text-yellow-400' style={{ marginLeft: '-7px', letterSpacing: '-1.5px' }}><Link to={'/'}>HomeServe</Link></h2>
      </div>
      <div className="bg-green-800 w-full">

        {/* Mobile header */}
        <div className="md:hidden flex items-center justify-between px-3 py-2 relative">

          {/* Menu toggle */}
          <button onClick={() => setListStatus(!listStatus)}>
            <FontAwesomeIcon icon={faBars} size="xl" className="text-white" />
          </button>

          {/* User profile */}
          <FontAwesomeIcon icon={faUserCircle} className="text-white text-3xl" />

          {/* Dropdown menu inside header */}
          {listStatus && (
            <div className="absolute top-full left-0 w-full bg-green-700 shadow-md p-3">
              <div className="py-2 border-b border-green-600">
                <Link to="/admin-dashboard" className="text-white flex items-center">
                  <FontAwesomeIcon icon={faHouse} className="me-2" />
                  Dashboard
                </Link>
              </div>

              <div className="py-2 border-b border-green-600">
                <Link to="/admin-bookings" className="text-white flex items-center">
                  <FontAwesomeIcon icon={faClipboardList} className="me-2" />
                  Bookings
                </Link>
              </div>

              <div className="py-2 border-b border-green-600">
                <Link to="/admin-customer" className="text-white flex items-center">
                  <FontAwesomeIcon icon={faUsers} className="me-2" />
                  Customers
                </Link>
              </div>
              <div className="py-2 border-b border-green-600">
                <Link to="/admin-service" className="text-white flex items-center">
                  <FontAwesomeIcon icon={faUserTie} className="me-2" />
                  Service Providers
                </Link>
              </div>
                 <div className="py-2 border-b border-green-600">
                <Link to="/admin-careers" className="text-white flex items-center">
                  <FontAwesomeIcon icon={faBriefcase} className="me-2" />
                  Careers
                </Link>
              </div>

              <div className="py-2 border-b border-green-600">
                <Link to="/admin-settings" className="text-white flex items-center">
                  <FontAwesomeIcon icon={faGear} className="me-2" />
                  Settings
                </Link>
              </div>
              <div className="py-2">
                <button className="text-white flex items-center">
                  <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Desktop header */}
        <div className={`hidden md:flex items-center py-3 ${insideHeader ? 'justify-between' : 'justify-end'}`}>
          {/* Search */}
          {insideHeader && (
            <div className="relative">
              <FontAwesomeIcon icon={faSearch} className="absolute md:left-9 left-4 top-2 text-gray-500 ms-2 text-sm" />
              <input
                type="text"
                className="bg-white md:ms-8 ms-3 rounded px-9 py-1 md:w-xs w-40 placeholder-gray-500 shadow placeholder:text-sm"
                placeholder={placeholder}
              />
            </div>
          )}

          {/* User profile */}
          <div className="flex items-center md:me-5 me-2">
            <FontAwesomeIcon icon={faUserCircle} className="text-white text-3xl" />
            <button className="bg-white text-green-600 shadow cursor-pointer rounded md:px-3 px-1 py-1 text-sm font-semibold hover:bg-green-800 hover:text-white border border-transparent hover:border-white md:ms-3 ms-1">
              <FontAwesomeIcon icon={faSignOutAlt} size="lg" className="me-1" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Welcome marquee */}
      <marquee className="p-1 text-sm text-green-800 bg-stone-100">
        Welcome, Admin! Ready to manage your dashboard and track today’s activities
      </marquee>
    </>
  )
}

export default AdminHeader
