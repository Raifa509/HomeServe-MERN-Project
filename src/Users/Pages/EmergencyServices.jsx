import React, { useEffect, useState } from 'react';
import Header from "../../Users/components/Header";
import Footer from "../../components/Footer";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { Link } from 'react-router-dom';
import { getAllUserServicesAPI } from '../../Services/allAPI';
import SERVERURL from '../../Services/server';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from "framer-motion";

function EmergencyServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmergencyServices();
  }, []);

  const fetchEmergencyServices = async () => {
    try {
      const result = await getAllUserServicesAPI("");
      if (result.status === 200) {
        const emergencyServices = result.data.filter(item => item.isEmergency);
        setServices(emergencyServices);
      } else {
        toast.warning("Unable to fetch services!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error!");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Header insideHeader={true} />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center items-center min-h-screen text-green-900 font-semibold text-xl"
        >
          Loading Emergency Services...
        </motion.div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header insideHeader={true} />

      {/* Page Heading */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='mt-10 flex flex-col items-center justify-center w-full bg-lime-50 p-5'
      >
        <h2 className='headingFont md:text-2xl text-xl font-medium text-green-900 mt-2'>
          Emergency Services
        </h2>
        <h3 className='headingFont font-medium md:text-lg text-sm text-center text-green-900 mt-2'>
          Fast, Reliable Emergency Services at Your Doorstep
        </h3>
      </motion.div>

      {/* Services Grid */}
      <div className="flex justify-center p-5">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
          className="my-10 grid md:grid-cols-5 sm:grid-cols-2 grid-cols-1 gap-10 justify-items-center"
        >
          {services.length > 0 ? (
            services.map(service => (
              <motion.div
                key={service._id}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  show: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                className="shadow-lg bg-white flex items-center justify-center p-4 flex-col rounded-xl relative md:w-52"
              >
                <h2 className="text-green-700 font-semibold text-center">{service.name}</h2>

                <img
                  src={`${SERVERURL}/uploads/${service.thumbnail}`}
                  alt={service.name}
                  className="mt-5 rounded-md w-48 h-48 object-cover"
                />

                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className='bg-green-900 h-12 w-12 rounded-full absolute bottom-2.5 right-3 flex items-center justify-center cursor-pointer hover:bg-green-800 transition'
                >
                  <Link to={`/booking?service=${service.name}`}>
                    <ArrowOutwardIcon className='text-white font-bold' fontSize='medium' />
                  </Link>
                </motion.div>
              </motion.div>
            ))
          ) : (
            <p className="text-green-900 font-medium col-span-full text-center mt-10">
              No Emergency Services Available!
            </p>
          )}
        </motion.div>
      </div>

      <Footer />

      <ToastContainer position="bottom-right" autoClose={3000} theme="colored" />
    </>
  );
}

export default EmergencyServices;
