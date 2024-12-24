import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar_home = () => {
  const [activeSection, setActiveSection] = useState('');

  const handleSetActive = (section) => {
    setActiveSection(section);
  };

  return (
    <div className='flex justify-center'>
      <div className='fixed z-50 flex bg-black bg-opacity-0 justify-center items-center h-16 w-full'>
        {/* Logo Section */}
        <div className='absolute left-0 ml-5'>
          <a href="/"><img src="/logo.png" alt="logo" className='h-32 w-32'/></a>
        </div>

        {/* Nav Links Section */}
        <div className='flex justify-center gap-8 text-white text-lg font-bold'>
          <div>
            <a 
              href="/" 
              onClick={() => handleSetActive('home')}
              className={`cursor-pointer hover:border-b-2 hover:border-blue-500 ${activeSection === 'home' ? 'border-b-2 border-blue-500' : ''}`}
            >
              Home
            </a>
          </div>
          <div>
            <a 
              href="#services" 
              onClick={() => handleSetActive('services')}
              className={`cursor-pointer hover:border-b-2 hover:border-blue-500 ${activeSection === 'services' ? 'border-b-2 border-blue-500' : ''}`}
            >
              Services
            </a>
          </div>
          <div>
            <a 
              href="/about" 
              onClick={() => handleSetActive('about-us')}
              className={`cursor-pointer hover:border-b-2 hover:border-blue-500 ${activeSection === 'about-us' ? 'border-b-2 border-blue-500' : ''}`}
            >
              About
            </a>
          </div>
          <div>
            <a 
              href="/contact" 
              onClick={() => handleSetActive('contact')}
              className={`cursor-pointer hover:border-b-2 hover:border-blue-500 ${activeSection === 'contact' ? 'border-b-2 border-blue-500' : ''}`}
            >
              Contact
            </a>
          </div>
        </div>

        {/* Sign Up and Login Buttons */}
        <div className='absolute right-0 mr-5 flex gap-2'>
          <div className='border-2 p-1 px-5 rounded-xl border-blue-500 text-white hover:scale-95 hover:bg-blue-500 hover:text-white transform duration-300 font-semibold'>
            <Link to="/signup">Sign Up</Link>
          </div>
          <div className='border-2 p-1 px-5 rounded-xl text-white border-blue-500 hover:scale-95 hover:bg-blue-500 hover:text-white transform duration-300 font-semibold'>
            <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar_home;
