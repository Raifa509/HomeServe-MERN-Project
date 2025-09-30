import React from 'react'
import { Link } from 'react-router-dom'

function Pnf() {
  return (
    <>
    <div className="flex items-center justify-center flex-col">
      <img src="/pnf.gif" alt="" width={'400px'}/>
      <h3 className='text-green-500 font-semibold text-2xl headingFont'>
      Oops...looks like you got lost
      </h3>
      <p className='text-green-500 font-semibold mt-3 headingFont'>404 Page Not Found</p>
      <button className='headingFont bg-green-700 text-white rounded px-4 py-2 mt-8 cursor-pointer '><Link to={'/'}>Back to Home</Link></button>
    </div>
    
    </>
  )
}

export default Pnf