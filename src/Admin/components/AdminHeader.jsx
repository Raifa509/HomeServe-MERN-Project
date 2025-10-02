import { faSearch, faSignOutAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function AdminHeader({insideHeader}) {
  return (
    <>
    <div className='bg-green-800 h-15 w-full'>
        <div className={`flex items-center py-3 ${insideHeader ? 'justify-between' : 'justify-end'}`}>

          
          {/* search */}
          {
            insideHeader &&
           <div className='relative'>
              <FontAwesomeIcon icon={faSearch} className='absolute md:left-9 left-4 top-2 text-gray-500 ms-2' />
              <input type="text" className='bg-white md:ms-8 ms-3 rounded px-9 py-1 md:w-xs w-40 placeholder-gray-500 shadow' placeholder='Search' />
           </div>
          }

          {/* user profile */}
          <div className='flex items-center md:me-5 me-2'>
            <FontAwesomeIcon icon={faUserCircle} className='text-white text-3xl'/>
            <button className='bg-white text-green-600 shadow cursor-pointer rounded md:px-3 px-1 py-1 text-sm font-semibold hover:bg-green-800 hover:text-white border border-transparent hover:border-white md:ms-3'><FontAwesomeIcon icon={faSignOutAlt}  size='lg' className='me-1 hidden md:inline' />Logout</button>

          </div>

        </div>
    </div>
    </>
  )
}

export default AdminHeader