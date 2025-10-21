import { faBriefcase, faClipboardList, faGear, faHouse, faUsers, faUserTie } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'


function AdminSideBar() {
  return (
    <>
      <div className='bg-lime-100 min-h-screen text-green-800 px-4 py-2'>
        <div className='md:flex items-center hidden'>
          <img src="/logo.png" alt="" width={'60px'} />
          <h2 className='headingFont text-xl font-semibold text-yellow-400' style={{ marginLeft: '-7px', letterSpacing: '-1.5px' }}><Link to={'/'}>HomeServe</Link></h2>
        </div>

         <div className='flex flex-col ms-1 mt-30'>

          <div className='text-semibold text-lg'>
            <FontAwesomeIcon icon={faHouse} className='me-1' />
            <Link to={'/admin-dashboard'}>Dashboard</Link>
          </div>

          <div className='text-semibold text-lg mt-4'>
            <FontAwesomeIcon icon={faClipboardList} className='me-1' />
            <Link to={'/admin-bookings'}>Bookings</Link>
          </div>

          <div className='text-semibold text-lg mt-4'>
            <FontAwesomeIcon icon={faUsers} className='me-1' />
            <Link to={'/admin-customer'}>Customers</Link>
          </div>


          <div className='text-semibold text-lg mt-4'>
            <FontAwesomeIcon icon={faUserTie} className='me-1' />
            <Link to={'/admin-serviceProvider'}>Service Providers</Link>
          </div>
          <div className='text-semibold text-lg mt-4'>
            <FontAwesomeIcon icon={faBriefcase} className='me-1' />
            <Link to={'/admin-careers'}>Careers</Link>
          </div>
              <div className='text-semibold text-lg mt-4'>
            <FontAwesomeIcon icon={faUserTie} className='me-1' />
            <Link to={'/admin-service'}>Services</Link>
          </div>

          <div className='text-semibold text-lg mt-4'>
            <FontAwesomeIcon icon={faGear} className='me-1' />
            <Link to={'/admin-settings'}>Settings</Link>
          </div>

          
        </div>
   
      </div>


    </>
  )
}

export default AdminSideBar