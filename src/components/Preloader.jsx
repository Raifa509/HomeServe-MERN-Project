import React from 'react'

function Preloader() {
  return (
    <>
    <div className='flex items-center justify-center h-screen'>
        <img src="/preloader.gif" alt="preloader" width={'70px'} height={'70px'} />
    </div>
    </>
  )
}

export default Preloader