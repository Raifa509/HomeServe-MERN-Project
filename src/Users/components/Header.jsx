import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Link} from 'react-router-dom'

function Header({ insideHeader }) {
  const [listStatus, setListStatus] = useState(false)

  return (
    <>

      <div className="w-full bg-green-800 md:h-15 text-white p-1">
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
                <li className='md:mx-2 mx-4 my-0.5 hover:text-orange-300'><Link to={'/'}>Home</Link></li>
                <li className='md:mx-2 mx-4 my-0.5 hover:text-orange-300'><Link to={'/services'}>Services</Link></li>
                <li className='md:mx-2 mx-4 my-0.5 hover:text-orange-300'><Link to={'/'}>About us</Link></li>
                <li className='md:mx-2 mx-4 my-0.5 hover:text-orange-300'><Link to={'/careers'}>Careers</Link></li>
                <li className='md:mx-2 mx-4 my-0.5 hover:text-orange-300'><Link to={'/'}>Contact</Link></li>
              </ul>

            </div>
          </nav>

          {/* desktop buttons */}
          <div className='md:flex items-center me-2 hidden'>
            {
              !insideHeader &&
              <>
               <Link to={'/booking'}> <button className='bg-orange-400 text-white shadow cursor-pointer rounded px-3 py-2 text-sm font-semibold me-3 hover:bg-amber-400'>Book Now</button></Link>
                <button className='bg-white text-green-600 shadow cursor-pointer rounded px-3 py-2 text-sm font-semibold hover:bg-green-800 hover:text-white border border-transparent hover:border-white'><FontAwesomeIcon icon={faUser} size='lg' />Login</button>
              </>

            }
            {/* <button className='bg-white text-green-600 shadow cursor-pointer w-10 h-10 px-3 py-2 text-sm font-semibold rounded-full flex items-center hover:bg-black hover:text-white'><FontAwesomeIcon icon={faUser} size='lg' /></button> */}

          </div>
        </div>
      </div>

    </>
  )
}

export default Header