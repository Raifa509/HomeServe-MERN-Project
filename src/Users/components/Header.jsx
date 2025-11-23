import { faAddressCard, faUser } from '@fortawesome/free-regular-svg-icons'
import { faBars, faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Header() {
  const [listStatus, setListStatus] = useState(false)
  const [token, setToken] = useState("")
  const [userDp, setUserDp] = useState("")
  const [dropDownStatus, setDropDownStatus] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token")
      setToken(token)
      const user = JSON.parse(sessionStorage.getItem("user"))
      setUserDp(user.profile)
    }
  }, [])

  const handleLogout = () => {
    sessionStorage.clear()
    setToken("")
    setUserDp("")
    setDropDownStatus(false)
    navigate("/")
  }

  return (
    <div className="w-full bg-green-900 md:h-15 text-white p-1">
      <div className="md:flex justify-between items-center">

        {/* Desktop logo */}
        <div className='md:flex items-center ms-3 hidden'>
          <img src="/logo.png" alt="" width={70} />
          <h2 className='headingFont text-2xl font-semibold text-yellow-400'
              style={{ marginLeft: '-7px', letterSpacing: '-1.5px' }}>
            <Link to={'/'}>HomeServe</Link>
          </h2>
        </div>

        {/* Mobile logo */}
        <div className='flex items-center justify-center md:hidden'>
          <img src="/logo.png" alt="" width={50} />
          <h2 className='headingFont text-xl font-semibold text-yellow-400'
              style={{ marginLeft: '-7px', letterSpacing: '-1.5px' }}>
            <Link to={'/'}>HomeServe</Link>
          </h2>
        </div>

        {/* Nav and Mobile Menu */}
        <nav className='flex-1'>
          <div className='flex items-center justify-between p-3 md:hidden'>

            {/* Hamburger */}
            <FontAwesomeIcon icon={faBars} size='xl' onClick={() => setListStatus(!listStatus)} />

            {/* User / Login */}
            {!token ? (
              <Link to="/login">
                <button className='bg-white text-green-600 shadow cursor-pointer rounded px-3 py-2 text-sm font-semibold hover:bg-green-800 hover:text-white border border-transparent hover:border-white'>
                  <FontAwesomeIcon icon={faUser} size='lg' /> Login
                </button>
              </Link>
            ) : (
              <div className="relative inline-block text-left">
                <button
                  onClick={() => setDropDownStatus(!dropDownStatus)}
                  className="cursor-pointer"
                >
                  <img
                    width={40}
                    height={40}
                    style={{ borderRadius: "50%" }}
                    src={
                      userDp === ""
                        ? "/user.png"
                        : userDp.startsWith("https://lh3.googleusercontent.com")
                        ? userDp
                        : "/user.png"
                    }
                    alt="user"
                  />
                </button>

                {dropDownStatus && (
                  <div className="absolute right-0 z-50 mt-2 w-40 origin-top-right rounded-md bg-green-50 shadow-lg">
                    <div className="py-1">
                      <Link to="/" className="block px-4 py-2 text-sm text-gray-700">
                        <FontAwesomeIcon icon={faAddressCard} className="me-2" /> Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                      >
                        <FontAwesomeIcon icon={faPowerOff} className="me-2" /> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Menu List with Hover Underline */}
          <ul className={listStatus ? 'flex flex-col' : 'md:flex justify-center items-center hidden'}>
            {[
              { name: "Home", link: "/home" },
              { name: "Services", link: "/services" },
              { name: "About us", link: "#about" },
              { name: "Careers", link: "/careers" },
              { name: "Contact", link: "/" },
            ].map((item) => (
              <li key={item.name} className="relative group md:mx-2 mx-4 my-0.5">
                <Link to={item.link} className="hover:text-orange-300">{item.name}</Link>
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-orange-300 transition-all duration-300 group-hover:w-8"></span>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop buttons */}
        <div className='md:flex items-center me-2 hidden'>
          <Link to={'/booking'}>
            <button className='bg-yellow-400 text-white shadow cursor-pointer rounded px-3 py-2 text-sm font-semibold me-3 hover:bg-yellow-500'>Book Now</button>
          </Link>

          {!token ? (
            <Link to="/login">
              <button className="bg-white text-green-600 shadow cursor-pointer rounded px-3 py-2 text-sm font-semibold border me-3 hover:bg-transparent hover:text-white hover:border-white">
                <FontAwesomeIcon icon={faUser} size="lg" /> Login
              </button>
            </Link>
          ) : (
            <div className="relative inline-block text-left">
              <button onClick={() => setDropDownStatus(!dropDownStatus)} className="me-3 mt-1 cursor-pointer">
                <img
                  width={45}
                  height={45}
                  style={{ borderRadius: "50%" }}
                  src={userDp === "" ? "/user.png" : userDp.startsWith("https://lh3.googleusercontent.com") ? userDp : "/user.png"}
                  alt="user"
                />
              </button>

              {dropDownStatus && (
                <div className="absolute right-0 z-50 mt-2 w-40 origin-top-right rounded-md bg-green-50 shadow-lg">
                  <div className="py-1">
                    <Link to="/profile" className="block px-4 py-2 font-medium text-md text-green-950 cursor-pointer">
                      <FontAwesomeIcon icon={faAddressCard} className="me-2" /> Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 font-medium text-md text-green-950 cursor-pointer"
                    >
                      <FontAwesomeIcon icon={faPowerOff} className="me-2" /> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default Header
