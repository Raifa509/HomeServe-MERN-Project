import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'
import { faFacebook, faInstagram, faLinkedin, faLinkedinIn, faTwitter, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faLocation, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';

function Footer() {
    return (
        <>
            <div className='bg-green-800 w-full md:h-70 h-179 mt-4'>
                <div className="md:grid grid-cols-4 p-5">
                    <div className='flex flex-col items-center justify-center md:items-start md:justify-start md:ms-10'>
                        <div className='flex items-center ms-3  mt-4 '>
                            <img src="/logo.png" alt="" width={'50px'} />
                            <h2 className='headingFont text-xl font-semibold text-yellow-400' style={{ marginLeft: '-6px', letterSpacing: '-1.5px' }}><Link to={'/'}>HomeServe</Link></h2>
                        </div>

                        <p className='text-gray-200 text-[13px] text-justify px-2 py-3'>HomeServe is your trusted partner for reliable home services, from cleaning and repairs to complete maintenance solutions. Our skilled professionals ensure quality, convenience, and peace of mind , right at your doorstep. We’re here to make your home hassle-free, every day.</p>
                    </div>

                    {/* QUick Links */}
                    <div className='flex flex-col mt-4 items-center text-gray-200'>
                        <h3 className='mb-3'>Quick Links</h3>
                        <p className='my-1 text-sm'><Link to={'/'}>About us</Link></p>
                        <p className='my-1 text-sm'><Link to={'/services'}>Services</Link></p>
                        <p className='my-1 text-sm'><Link to={'/careers'}>Careers</Link></p>
                        <p className='my-1 text-sm'><Link to={'/'}>Testimonial</Link></p>
                    </div>

                    {/* contact us */}
                    <div className='flex flex-col mt-4 text-gray-200 items-center md:items-start'>
                        <h3 className='mb-3'>Contact us</h3>
                        <p className='my-1 text-sm'><FontAwesomeIcon icon={faPhone} className='me-2' />9898304958</p>
                        <p className='my-1 text-sm'><FontAwesomeIcon icon={faEnvelope} className='me-2' />homeserve@gmail.com</p>
                        <p className='my-1 text-sm'><FontAwesomeIcon icon={faLocationDot} className='me-2' />2nd Floor,Amana Complex,Kakkanad,Kochi</p>
                    </div>
                    {/* follow us */}

                    <div className='flex flex-col mt-4 text-gray-200 md:ms-20 items-center'>
                        <h3 className='mb-3'>Let's stay in Touch</h3>
                        <div className='flex space-x-2'>
                            <FontAwesomeIcon icon={faInstagram} size='lg' color='white' className='hover:text-yellow-400 transform transition-transform hover:scale-110 ' />
                            <FontAwesomeIcon icon={faLinkedinIn} size='lg' color='white' className='hover:text-yellow-400 transform transition-transform hover:scale-110 ' />
                            <FontAwesomeIcon icon={faFacebook} size='lg' color='white' className='hover:text-yellow-400 transform transition-transform hover:scale-110 ' />
                            <FontAwesomeIcon icon={faWhatsapp} size='lg' color='white' className='hover:text-yellow-400 transform transition-transform hover:scale-110 ' />
                            <FontAwesomeIcon icon={faTwitter} size='lg' color='white' className='hover:text-yellow-400 transform transition-transform hover:scale-110 ' />
                        </div>

                    </div>
                </div>
                <div className='text-center text-gray-200 md:text-sm text-xs md:mt-0 mt-10'>
                    <p>© 2025 HomeServe. By Fathimathul Raifa NP .All rights reserved</p>
                </div>
            </div>

        </>
    )
}

export default Footer