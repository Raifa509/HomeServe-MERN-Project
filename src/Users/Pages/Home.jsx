import React from 'react';
import Header from "../components/Header";
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';
import Masonry from '../components/Masonry';
import FadeIn from '../../components/animations/FadeIn';



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
      <div id='/home' className='relative min-h-screen bg-cover bg-center'>
        {/* Video Background */}
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
        <div className="absolute inset-0 bg-black/55"></div>

        <FadeIn delay={0.2}>
          <div className='relative z-10 flex flex-col min-h-screen'>
            {/* Centered Hero Text */}
            <div className='flex flex-1 items-center justify-center text-center flex-col px-5 sm:px-10 md:px-96 mb-16'>
              <div>
                <h2 className='text-white font-semibold text-3xl md:text-5xl leading-relaxed'>
                  Trusted <span className='text-yellow-300'> Professionals </span> for Every Job in Your Home
                </h2>
                <h2 className='text-white text-md mt-2'>
                  Expert help for every home need, with trusted professionals <br /> at your fingertips.
                </h2>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-10">
                <Link to={'/emergency'}>
                  <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition">
                    Emergency Service
                  </button>
                </Link>
                <a href='#more'>
                  <button className="bg-transparent border border-white text-white hover:bg-white hover:text-black font-semibold px-6 py-3 rounded-full transition">
                    Learn More
                  </button>
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>


      {/* about */}
      <FadeIn delay={0.2}>
        <div id='about' className="min-h-screen py-10 bg-gray-50">
          <section className="max-w-7xl mx-auto mt-10 bg-gray-100 p-5 sm:p-10 md:p-10 rounded-2xl shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">

              {/* Left Side - Illustration/Image */}
              <div className="flex justify-center">
                <img
                  src="/about.jpg"
                  alt="Home Services"
                  className="rounded-2xl shadow-lg w-full md:w-4/5 object-cover"
                />
              </div>

              {/* Right Side - Text Content */}
              <div className="flex justify-center">
                <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-6 shadow-xl border border-gray-200 max-w-md md:max-w-full">
                  <h2 className="text-3xl font-bold text-gray-800 mb-5">
                    Few Words About <span className="text-green-600">HomeServe</span>
                  </h2>
                  <p className="text-gray-700 mb-6 leading-relaxed text-sm sm:text-base md:text-base">
                    Founded in 2025, HomeServe is a professional and certified service platform dedicated to making your home cleaner, safer, and more comfortable. Our team of diligent and respectful professionals works to ensure your home shines like new.
                  </p>

                  <ul className="text-gray-700 space-y-3 mb-8 text-sm sm:text-base">
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
      </FadeIn>


      {/* Emergency Services Section */}
      <FadeIn delay={0.2}>
        <div id='more' className="min-h-screen py-20 bg-green-50">
          <div className="max-w-7xl mx-auto md:px-4 px-6 lg:px-8 text-center">

            {/* Section Header */}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Emergency Help <span className="text-green-600">When You Need It Most</span>
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-12 sm:mb-16">
              Life at home is unpredictable. From sudden leaks to electrical faults, our emergency services ensure fast, reliable, and professional assistance—so your home stays safe and comfortable.
            </p>

            {/* Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 text-left">

              <div className="flex flex-col justify-start">
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">Rapid Plumbing Solutions</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  Burst pipe or leak? Our expert plumbers respond immediately, repair efficiently, and prevent further damage to your home.
                </p>
              </div>

              <div className="flex flex-col justify-start">
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">Emergency Electrical Services</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  From power outages to sparking wires, our certified electricians restore your home safely and quickly, minimizing downtime.
                </p>
              </div>

              <div className="flex flex-col justify-start">
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">Urgent Repairs & Maintenance</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  Broken doors, sudden appliance failure, or structural issues? Our skilled team handles emergency repairs to secure your home immediately.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-12 sm:mt-16 flex justify-center">
              <Link to="/emergency">
                <button className="bg-green-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-green-700 transition text-sm md:text-lg shadow-md">
                  Request Emergency Service
                </button>
              </Link>
            </div>
          </div>
        </div>
      </FadeIn>


      {/* gallery */}
      <FadeIn delay={0.2}>
        <div className="min-h-screen hidden md:block py-20 px-4 sm:px-6 lg:px-16 max-w-7xl mx-auto">
          {/* Intro Text */}
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold text-gray-800 mb-4">
              Our <span className='text-green-600'>Services</span> at a Glance
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg">
              Explore some examples of the wide range of home services we provide to make <br className="hidden sm:block" /> your space cleaner, safer, and more comfortable.
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
      </FadeIn>



      {/* steps  */}
      <FadeIn delay={0.2}>
        <div className="min-h-screen py-20 md:mt-30  ">
          <section className="md:mx-20 mx-5 px-5 py-10 bg-green-50 md:p-16 rounded-3xl shadow-xl">

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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-center">

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
      </FadeIn>


      {/* testimonial */}
      <FadeIn delay={0.2}>
        <div className="min-h-screen">
          <section className="mx-4 sm:mx-10 md:mx-40 p-6 sm:p-10 md:p-16 rounded-3xl">

            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-4xl font-extrabold mb-4">
                What Our <span className="text-green-600">Customers Say</span>
              </h2>
              <p className="text-gray-700 text-sm sm:text-base md:text-lg">
                Hear from happy homeowners who trust HomeServe to make their homes safer and cleaner.
              </p>
            </div>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10">

              {/* Testimonial 1 */}
              <div className="bg-white p-6 sm:p-8 md:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
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
              <div className="bg-white p-6 sm:p-8 md:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
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
              <div className="bg-white p-6 sm:p-8 md:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
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
      </FadeIn>


      {/* Contact Section */}
      <FadeIn delay={0.2}>
        <div id="contact" className="min-h-screen md:-mt-30 mt-10 md:mb-30 mb-10">
          <div className="w-full sm:w-4/5 md:w-3xl mx-auto px-4 sm:px-6 md:px-6">

            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-4xl font-extrabold text-gray-800 mb-4">
                Get in <span className="text-green-600">Touch</span>
              </h2>
              <p className="text-gray-700 text-sm sm:text-base md:text-lg">
                Have a question or need a service? Send us a message and we'll get back to you quickly.
              </p>
            </div>

            {/* Form */}
            <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-10 md:p-16">
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-6">

                {/* Name */}
                <div className="flex flex-col">
                  <label htmlFor="name" className="text-gray-700 font-semibold mb-2">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-green-600"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col">
                  <label htmlFor="email" className="text-gray-700 font-semibold mb-2">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-green-600"
                    placeholder="john@example.com"
                  />
                </div>

                {/* Subject */}
                <div className="flex flex-col md:col-span-2">
                  <label htmlFor="subject" className="text-gray-700 font-semibold mb-2">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-green-600"
                    placeholder="Service Inquiry"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col md:col-span-2">
                  <label htmlFor="message" className="text-gray-700 font-semibold mb-2">Message</label>
                  <textarea
                    id="message"
                    rows="5"
                    className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-green-600"
                    placeholder="Write your message here..."
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="md:col-span-2 flex justify-center">
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-green-700 transition shadow-md"
                  >
                    Send Message
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </FadeIn>


      <Footer />
    </>
  );
}

export default Home;
