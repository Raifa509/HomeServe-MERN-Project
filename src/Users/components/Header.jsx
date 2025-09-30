import { faUser } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <>
    <div className="w-full bg-green-800 h-15 text-white">
      <div className="flex justify-between items-center p-3">
        <div className='flex items-center'>
          {/* <img src="/logo.png" alt="" width={'50px'}/> */}
          <h2 className='headingFont text-2xl font-semibold ms-5'><Link to={'/'}>HomeServe</Link></h2>
        </div>
        <div>
          <ul className='flex items-center justify-center'>
            <li className='mx-2 hover:text-orange-300'><Link to={'/'}>Home</Link></li>
            <li className='mx-2 hover:text-orange-300'><Link to={'/services'}>Services</Link></li>
            <li className='mx-2 hover:text-orange-300'><Link to={'/'}>About us</Link></li>
            <li className='mx-2 hover:text-orange-300'><Link to={'/careers'}>Careers</Link></li>
            <li className='mx-2 hover:text-orange-300'><Link to={'/'}>Contact</Link></li>
          </ul>

        </div>
        <div className='flex items-center me-2'>
          <button className='bg-orange-400 text-white shadow cursor-pointer rounded px-3 py-2 text-sm font-semibold me-3 hover:bg-amber-400'>Book Now</button>
            <button className='bg-white text-green-600 shadow cursor-pointer rounded px-3 py-2 text-sm font-semibold hover:bg-green-800 hover:text-white border border-transparent hover:border-white'><FontAwesomeIcon icon={faUser} size='lg'/>Login</button>
        </div>
      </div>
    </div>
    
    </>
  )
}

export default Header