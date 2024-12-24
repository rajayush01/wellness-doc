import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGreaterThan, FaLessThan } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '@/app/components/Footer/Footer';
import Navbar_home from '@/app/components/Navbar/Navbar_home';

const services = [
  {
    title: 'General Checkup',
    description: 'Comprehensive health checkups for patients of all ages.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3FRcAzJrzpwHpIQgXVWTItcOTXSoQt2P4pQ&s'
  },
  {
    title: 'Pediatrics',
    description: 'Specialized care for infants, children, and adolescents.',
    image: 'https://i0.wp.com/post.healthline.com/wp-content/uploads/2020/05/pediatrician-baby-doctor-1296x728-header.jpg?w=1155&h=1528'
  },
  {
    title: 'Cardiology',
    description: 'Heart health services from experienced cardiologists.',
    image: 'https://artemiscardiac.com/speciality/65aa6649f0169Non%20Invasive%20Cardiology%20-%20Header%20Image.webp'
  },
  {
    title: 'Dermatology',
    description: 'Skincare treatments for all skin types and conditions.',
    image: 'https://img.freepik.com/free-photo/dermatology-doctor-checking-young-woman-scalp-hair-during-appointment-clinic-diagnosing-hair-loss-health-care-hospital-consultation-with-dermatologist-examining-female-patient_482257-22841.jpg?w=2000'
  },
  {
    title: 'Orthopedics',
    description: 'Specialized in treating bone and joint disorders.',
    image: 'https://santhyahospitals.com/wp-content/uploads/2024/06/Top-listed-orthopedic-doctor-in-Chandigarh.png'
  },
  {
    title: 'Ophthalmology',
    description: 'Eye care treatments and vision correction procedures.',
    image: 'https://brighteyesmv.com/wp-content/uploads/eye-surgery-2012.jpg'
  },
  {
    title: 'Neurology',
    description: 'Care for neurological disorders and treatments.',
    image: 'https://www.umhs-sk.org/hubfs/What%20is%20a%20neurologist.jpeg'
  }
];

const Home = () => {
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false); // Modal state

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + services.length) % services.length);
  };

  // Show 3 cards at a time
  const getCurrentSlides = () => {
    const slides = [];
    for (let i = 0; i < 3; i++) {
      slides.push(services[(currentIndex + i) % services.length]);
    }
    return slides;
  };

  // Function to toggle chat modal
  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  return (
    <div>
      <div className="min-h-screen bg-cover bg-center relative" style={{ backgroundImage: "url('/image.png')" }}>
        <Navbar_home />

        {/* AI Chatbot Icon */}
        <img
          src="/doc.png"
          alt="AI Chatbot"
          className="fixed bottom-5 right-5 h-16 w-16 rounded-full border-2 border-black cursor-pointer z-20 hover:scale-105 transform duration-300"
          onClick={toggleChat}
        />

        {/* AI Chatbot Modal */}
        {isChatOpen && (
          <div className="fixed bottom-20 right-12 bg-white p-6 rounded-lg shadow-lg w-80 z-10">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Welcome to WellnessDoc Chat</h3>
            <p className="text-gray-600 mb-4">Please log in to start chatting.</p>
            <button
              onClick={() => navigate('/login')}
              className="bg-blue-500 text-white px-4 py-2 rounded-full mb-2 w-full"
            >
              Log In
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="bg-gray-500 text-white px-4 py-2 rounded-full w-full"
            >
              Sign Up
            </button>
          </div>
        )}

        <motion.div
          className="home flex flex-col items-center justify-center h-[calc(100vh-4rem)] text-white text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Hero Section */}
          <motion.h1
            className="text-6xl font-bold mb-6 text-cyan-500 drop-shadow-lg"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Welcome to WellnessDoc
          </motion.h1>

          <motion.p
            className="text-2xl mb-10 text-cyan-400 drop-shadow-md"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Providing quality healthcare for you and your family
          </motion.p>

          <motion.button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 shadow-md"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            onClick={() => navigate('/login')} // Navigates to the login page
          >
            Book an Appointment
          </motion.button>
        </motion.div>
      </div>

      {/* Services Section */}
      <section id="services" className="py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold mb-12 text-cyan-600">Our Services</h2>
          <div className="relative">
            <motion.div
              key={currentIndex}
              className="flex justify-center items-center space-x-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {getCurrentSlides().map((service, index) => (
                <div key={index} className="max-w-md p-6 bg-white shadow-lg rounded-lg hover:scale-105 transform duration-200">
                  <img src={service.image} alt={service.title} className="w-full h-48 object-cover mb-4 rounded-lg" />
                  <h3 className="text-2xl font-bold mb-2 text-cyan-800">{service.title}</h3>
                  <p className="text-gray-700">{service.description}</p>
                </div>
              ))}
            </motion.div>

            <div className="absolute top-1/2 left-5 transform -translate-y-1/2">
              <button
                onClick={prevSlide}
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-full h-12 w-12 flex items-center justify-center shadow-md"
              >
                <FaLessThan />
              </button>
            </div>

            <div className="absolute top-1/2 right-5 transform -translate-y-1/2">
              <button
                onClick={nextSlide}
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-full h-12 w-12 flex items-center justify-center shadow-md"
              >
                <FaGreaterThan />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about-us" className="py-16 bg-white text-gray-900">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold mb-8 text-cyan-600">About Us</h2>
          <p className="text-lg max-w-3xl mx-auto">
            WellnessDoc is a leading healthcare provider, committed to offering comprehensive medical services to individuals and families.
            With a focus on patient care, we combine expertise with cutting-edge technology to deliver the highest quality treatment.
            From routine checkups to specialized care, we ensure that every patient receives personalized attention in a comfortable environment.
          </p>
          <Link to="/about" className="text-lg text-blue-500 underline font-bold">Know More</Link>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="py-20 bg-gray-100 text-black overflow-hidden">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
          <p className="max-w-xl mx-auto leading-relaxed">
            If you have any questions or would like to book an appointment, please don't hesitate to contact us.
          </p>
          <motion.div whileHover={{ scale: 1.1 }} className="mt-8">
            <Link
              to="/contact"
              className="inline-block bg-blue-500 text-white px-8 py-3 rounded-full hover:bg-blue-600 transition duration-300"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;