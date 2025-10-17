import React from 'react'
import Header from "../components/Header";
import Footer from '../../components/Footer';


function Home() {
  return (
    <>
      <Header />
  <div className='bg-cover' style={{backgroundImage:`url("https://media.istockphoto.com/id/590277812/photo/its-better-to-work-in-group.jpg?s=612x612&w=0&k=20&c=Q9xmEdXJlGAkUcH9FbM4bJI0AByOvnLLjzb6uxd7jhA=")`}}>
        <div className='min-h-screen '>
          <marquee behavior="" direction="" className="bg-green-100 text-sm p-2">  ⚡ Emergency Home Service available 24/7 – Get Help Within 1 Hr → Book Now ⚡ &nbsp;
            Plumbing, Electrical, AC, House Cleaning, Painting, Locksmith & More! Call Us Anytime! &nbsp;
            &nbsp;
            Quick Response, Reliable Professionals, Affordable Pricing – Book Your Service Today! &nbsp;
          </marquee>
          <div className='md:grid grid-cols-2 p-20 '>
            <div className='p-9'>
              <h2 className='text-green-800 font-semibold text-5xl leading-relaxed'>Trusted <span className='text-green-500'> Professionals </span> for Every Job in Your Home
              </h2>
              <h2 className='text-gray-800 text-xl'>Expert help for every home need, with trusted professionals at your fingertips.</h2>
            </div>
            <div className='flex items-center '>
              <img src="/home.png" alt="" width={600}/>
            </div>
          </div>
        </div>
  </div>
 
      <Footer />
    </>
  )
}

export default Home