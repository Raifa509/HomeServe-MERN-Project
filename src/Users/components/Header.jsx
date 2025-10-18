import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Header() {
  const [listStatus, setListStatus] = useState(false)

  return (
    <>

      <div className="w-full bg-green-900 md:h-15 text-white p-1">
        <div className="md:flex justify-between items-center">
          {/* desktop logo */}
          <div className='md:flex items-center ms-3 hidden'>
            <img src="/logo.png" alt="" width={'70px'} />
            <h2 className='headingFont text-2xl font-semibold text-yellow-400' style={{ marginLeft: '-7px', letterSpacing: '-1.5px' }}><Link to={'/'}>HomeServe</Link></h2>
          </div>
          {/* phone logo */}
          <div className='flex items-center justify-center md:hidden'>
            <img src="/logo.png" alt="" width={'50px'} />
            <h2 className='headingFont text-xl font-semibold text-yellow-400' style={{ marginLeft: '-7px', letterSpacing: '-1.5px' }}><Link to={'/'}>HomeServe</Link></h2>
          </div>

          {/* nav list */}
          <nav>
            <div className='flex items-center justify-between p-3 md:hidden '>
              <FontAwesomeIcon icon={faBars} size='xl' onClick={() => setListStatus(!listStatus)} />
              <button className='bg-white text-green-600 shadow cursor-pointer rounded px-3 py-2 text-sm font-semibold hover:bg-green-800 hover:text-white border border-transparent hover:border-white'><FontAwesomeIcon icon={faUser} size='lg' />Login</button>
            </div>
            <div>
              <ul className={listStatus ? 'flex flex-col' : 'md:flex justify-center items-center hidden'}>
                <li className="relative group md:mx-2 mx-4 my-0.5">
                  <Link to={'/'} className="hover:text-orange-300">
                    Home
                  </Link>
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-orange-300 transition-all duration-300 group-hover:w-1/2"></span>
                </li>

                <li className="relative group md:mx-2 mx-4 my-0.5">
                  <Link to={'/'} className="hover:text-orange-300">
                    Services
                  </Link>
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-orange-300 transition-all duration-300 group-hover:w-1/2"></span>
                </li>
                <li className="relative group md:mx-2 mx-4 my-0.5">
                  <Link to={'/'} className="hover:text-orange-300">
                    About us
                  </Link>
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-orange-300 transition-all duration-300 group-hover:w-1/2"></span>
                </li>
                <li className="relative group md:mx-2 mx-4 my-0.5">
                  <Link to={'/'} className="hover:text-orange-300">
                    Careers
                  </Link>
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-orange-300 transition-all duration-300 group-hover:w-1/2"></span>
                </li>
                <li className="relative group md:mx-2 mx-4 my-0.5">
                  <Link to={'/'} className="hover:text-orange-300">
                    Contact
                  </Link>
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-orange-300 transition-all duration-300 group-hover:w-1/2"></span>
                </li>              
                </ul>

            </div>
          </nav>

          {/* desktop buttons */}
          <div className='md:flex items-center me-2 hidden'>



            <Link to={'/booking'}> <button className='bg-yellow-400 text-white shadow cursor-pointer rounded px-3 py-2 text-sm font-semibold me-3 hover:bg-yellow-500'>Book Now</button></Link>

            <Link to={'/login'}>  <button className='bg-white text-green-600 shadow cursor-pointer rounded px-3 py-2 text-sm font-semibold hover:bg-green-800 hover:text-white border border-transparent hover:border-white'><FontAwesomeIcon icon={faUser} size='lg' />Login</button></Link>





          </div>
        </div>
      </div>

    </>
  )
}

export default Header