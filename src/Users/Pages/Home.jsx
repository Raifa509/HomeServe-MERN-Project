import React from 'react';
import Header from "../components/Header";
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';
import Masonry from '../components/Masonry';


function Home() {
  const items = [
    {
      id: "1",
      img: "/clean.png",
      height: 400,
    },
    {
      id: "2",
      img: "/houseCleaning.png",
      height: 250,
    },
    {
      id: "3",
      img: "/home2.jpg",
      height: 600,
    },
    {
      id: "4",
      img: "/home6.jpg",
      height: 500,
    },
    {
      id: "5",
      img: "/home4.jpg",
      height: 650,
    },
    {
      id: "6",
      img: "https://media.istockphoto.com/id/2187421629/photo/plumber-house-and-handyman-with-clipboard-inspection-and-maintenance-with-expert-employee.jpg?s=612x612&w=0&k=20&c=rqPHAz0849mFaQ2Box2eszZDaZZ9pDbvCUKJCZ700RI=",
      height: 400,
    },
    {
      id: "7",
      img: "https://media.istockphoto.com/id/1435449600/photo/plumber-explaining-to-a-client-the-problem-with-her-kitchen-sink.jpg?s=612x612&w=0&k=20&c=KFI8f97NOQBSAMgdO-hldVA39rESrD07N7OZU1LQ6s0=",
      height: 550,
    },
    {
      id: "8",
      img: "https://media.istockphoto.com/id/1291079851/photo/home-repairman-working-on-a-furnace.jpg?s=612x612&w=0&k=20&c=HM_1TAZ2zdzlssHUjpZ7TX2_lIP6Vqsedp1I0rOKNbo=",
      height: 700,
    },
    {
      id: "9",
      img: "https://media.istockphoto.com/id/1345670548/photo/plumber-fixing-a-pipe-and-talking-to-his-clients-in-the-kitchen.jpg?s=612x612&w=0&k=20&c=1MqacdZMU-Cc2wr43HsaZjD3rgpg-JpV_My1HUpxc5g=",
      height: 300,
    },
    {
      id: "10",
      img: "https://media.istockphoto.com/id/1129117264/photo/learning-from-the-best-two-men-technician-sitting-near-dishwasher.jpg?s=612x612&w=0&k=20&c=gQ3ek4egcKNzAe6pUVjMnI1ljb62qw5HxpA3gb1Na-o=",
      height: 600,
    },
  ];

  return (
    <>
      <Header />

      {/* Hero Section */}
      <div id='/home' className='min-h-screen relative bg-cover bg-center'>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/video.mp4" type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/65"></div>

        <div className='min-h-screen relative z-10 flex flex-col'>
          {/* Centered Hero Text */}
          <div className='flex flex-1 items-center justify-center mb-17 text-center px-5 md:px-96 flex-col'>
            <div>
              <h2 className='text-white font-semibold text-3xl md:text-5xl leading-relaxed'>
                Trusted <span className='text-yellow-300'> Professionals </span> for Every Job in Your Home
              </h2>
              <h2 className='text-white text-md mt-2'>
                Expert help for every home need, with trusted professionals <br /> at your fingertips.
              </h2>
            </div>

            <div className="flex gap-4 mt-10">
              <Link to={'/emergency'}>
                <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition">
                  Emergency Service
                </button>
              </Link>
              <button className="bg-transparent border border-white text-white hover:bg-white hover:text-black font-semibold px-6 py-3 rounded-full transition">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* about */}
      <div id='about' className="min-h-screen py-10">
        <section className="mx-40 mt-10 bg-gray-100 p-10 rounded-2xl shadow-xl">
          <div className="grid md:grid-cols-2  items-center">

            {/* Left Side - Illustration/Image */}
            <div className="col-span-1 flex justify-center">
              <img
                src="/about.jpg"
                alt="Home Services"
                className="rounded-2xl shadow-lg w-full md:w-4/5 object-cover"
              />
            </div>

            {/* Right Side - Text Content */}
            <div className="col-span-1 flex justify-center">
              <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-200 ">
                <h2 className="text-3xl font-bold text-gray-800 mb-5">
                  Few Words About <span className="text-green-600">HomeServe</span>
                </h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Founded in 2025, HomeServe is a professional and certified service platform dedicated to making your home cleaner, safer, and more comfortable. Our team of diligent and respectful professionals works to ensure your home shines like new.
                </p>

                <ul className="text-gray-700 space-y-3 mb-8">
                  {[
                    "Coverage in all major cities",
                    "Multiple home services available",
                    "Over 100 verified professionals",
                    "7 days a week service",
                    "Local support & assistance"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="text-green-600 font-bold">✔</span> {item}
                    </li>
                  ))}
                </ul>

                <Link to="/services">
                  <button className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition shadow-md">
                    View Services
                  </button>
                </Link>
              </div>
            </div>

          </div>
        </section>
      </div>

      {/* gallery */}
      <div className="min-h-screen py-10 mx-40">
        {/* Intro Text */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Our <span className='text-green-600'>Services</span> at a Glance
          </h2>
          <p className="text-gray-600 text-lg">
            Explore some examples of the wide range of home services we provide to make <br /> your space cleaner, safer, and more comfortable.
          </p>
        </div>

        {/* Masonry Grid */}
        <Masonry
          items={items}
          ease="power3.out"
          duration={0.6}
          stagger={0.05}
          animateFrom="bottom"
          scaleOnHover={true}
          hoverScale={0.95}
          blurToFocus={true}
          colorShiftOnHover={false}
          onClick={(e) => e.preventDefault()}
        />
      </div>

      {/* steps  */}
      <div className="min-h-screen mt-50 py-10">
        <section className="mx-20 bg-green-50 p-16 rounded-3xl shadow-xl">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
              How <span className="text-green-600">HomeServe</span> Works
            </h2>
            <p className="text-gray-700 text-lg">
              Our simple, streamlined process ensures your home is cared for efficiently and safely.
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid md:grid-cols-4 gap-10 text-center">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg transform hover:-translate-y-2 transition duration-300">
              <div className="text-green-600 text-5xl mb-5">📅</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Book a Service</h3>
              <p className="text-gray-600 leading-relaxed">
                Choose the service you need and schedule a convenient time online or via our app.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg transform hover:-translate-y-2 transition duration-300">
              <div className="text-green-600 text-5xl mb-5">👷‍♂️</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Professional Assigned</h3>
              <p className="text-gray-600 leading-relaxed">
                A verified and experienced professional is assigned to your home for the requested service.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg transform hover:-translate-y-2 transition duration-300">
              <div className="text-green-600 text-5xl mb-5">🛠️</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Service Delivered</h3>
              <p className="text-gray-600 leading-relaxed">
                Our team arrives on time and completes the job with precision and care.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg transform hover:-translate-y-2 transition duration-300">
              <div className="text-green-600 text-5xl mb-5">✔️</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Satisfaction Guaranteed</h3>
              <p className="text-gray-600 leading-relaxed">
                Review the work, provide feedback, and enjoy a clean, safe, and comfortable home.
              </p>
            </div>
          </div>
        </section>
      </div>

      <div className="min-h-screen py-20">
        <section className="mx-40 p-16 rounded-3xl ">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold  mb-4">
              What Our <span className="text-green-600">Customers Say</span>
            </h2>
            <p className="text-gray-700 text-lg">
              Hear from happy homeowners who trust HomeServe to make their homes safer and cleaner.
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-10">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
              <p className="text-gray-600 leading-relaxed mb-4">
                "HomeServe made my home sparkling clean in no time! The team was punctual and professional."
              </p>
              <div className="flex items-center gap-4">
                <img src="https://i.pravatar.cc/50?img=1" alt="User 1" className="rounded-full w-12 h-12" />
                <div>
                  <h4 className="text-gray-800 font-semibold">Sarah Williams</h4>
                  <div className="text-green-600">★★★★★</div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
              <p className="text-gray-600 leading-relaxed mb-4">
                "Professional, reliable, and friendly staff. Highly recommend for any home service!"
              </p>
              <div className="flex items-center gap-4">
                <img src="https://i.pravatar.cc/50?img=2" alt="User 2" className="rounded-full w-12 h-12" />
                <div>
                  <h4 className="text-gray-800 font-semibold">James Anderson</h4>
                  <div className="text-green-600">★★★★★</div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
              <p className="text-gray-600 leading-relaxed mb-4">
                "Excellent service! My home feels brand new, and the support team is amazing."
              </p>
              <div className="flex items-center gap-4">
                <img src="https://i.pravatar.cc/50?img=3" alt="User 3" className="rounded-full w-12 h-12" />
                <div>
                  <h4 className="text-gray-800 font-semibold">Emily Johnson</h4>
                  <div className="text-green-600">★★★★★</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}

export default Home;
