import React from 'react';
import Header from "../../Users/components/Header";
import Footer from "../../components/Footer";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { Link } from 'react-router-dom';

function EmergencyServices() {
  const emergencyServices = [
    { id: 1, name: "Plumbing", image: "./plumbing.png" },
    { id: 2, name: "Electrical", image: "./electrical.png" },
    { id: 3, name: "AC Repair", image: "./acRepair.png" },
    { id: 4, name: "Gas Leak", image: "./gasLeak.png" },
    { id: 5, name: "Fire Safety", image: "./fireSafety.png" },
    { id: 6, name: "Leak Repair", image: "./leakRepair.png" },
    { id: 7, name: "Power Outage", image: "./powerOutage.png" },
    { id: 8, name: "Roof Leakage", image: "./roofLeak.png" },
    { id: 9, name: "Locksmith", image: "./locksmith.png" },
    { id: 10, name: "Water Damage", image: "./waterDamage.png" },
  ];

  return (
    <>
      <Header insideHeader={true} />

      {/* service heading */}
      <div className='mt-10 flex items-center justify-center flex-col w-full bg-lime-50 p-5'>
        <h2 className='headingFont md:text-2xl text-xl font-medium text-green-900 mt-2'>
          Emergency Services
        </h2>
        <h3 className='headingFont font-medium md:text-lg text-sm text-center text-green-900 mt-2'>
          Fast, Reliable Emergency Services at Your Doorstep
        </h3>
      </div>

      <div className="md:grid grid-cols-6 p-5">
        {/* Empty filter section for now */}
        <div className='col-span-1 p-3 md:mt-28'></div>

        <div className='col-span-5 md:px-15 px-5'>
          {/* Service cards */}
          <div className="md:grid grid-cols-4 mt-10 gap-10 ">
            {emergencyServices.map(service => (
              <div
                key={service.id}
                className="shadow-lg bg-white flex items-center justify-center p-4 flex-col rounded-xl transition-transform duration-400 hover:scale-105 relative"
              >
                <h2 className="text-green-700 font-semibold">{service.name}</h2>
                <img src={service.image} alt={service.name} className="mt-5 rounded-md" />

                <div className='bg-green-900 h-12 w-12 rounded-full absolute bottom-2.5 right-3 flex items-center justify-center cursor-pointer'>
                  <Link to={`/booking?service=${service.name}`}>
                    <ArrowOutwardIcon className='text-white font-bold' fontSize='medium' />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default EmergencyServices;
