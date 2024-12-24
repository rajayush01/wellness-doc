import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Calendar, Clock, Phone, Mail, X, Bell, LogOut, Settings, MapPin, Award, Stethoscope } from 'lucide-react';

const DoctorProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the id from URL parameters
  const [profileImage, setProfileImage] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const doctors = [
    {
      id: "D-12345",
      name: "Dr. Ayush Raj",
      specialty: "Cardiologist",
      experience: "15+ years",
      education: "MD - Harvard Medical School",
      location: "123 Medical Center, New York",
      email: "ayush@hospital.com",
      phone: "1234567890",
      availableDays: "Monday - Friday",
      hours: "9:00 AM - 5:00 PM",
      certifications: [
        "American Board of Internal Medicine",
        "Cardiovascular Disease Certification",
        "Advanced Cardiac Life Support"
      ]
    },
    {
      id: "D-12346",
      name: "Dr. Bharath",
      specialty: "Orthopedic Surgeon",
      experience: "10+ years",
      education: "MD - University of California, Los Angeles",
      location: "789 Medical Plaza, Los Angeles",
      email: "bharath@hospital.com",
      phone: "1234567890",
      availableDays: "Tuesday - Saturday",
      hours: "10:00 AM - 6:00 PM",
      certifications: [
        "American Board of Orthopedic Surgery",
        "Certified in Sports Medicine",
        "Orthopedic Trauma Certification"
      ]
    },
    {
      id: "D-12347",
      name: "Dr. Priya Patel",
      specialty: "Pediatrician",
      experience: "8+ years",
      education: "MD - Johns Hopkins University",
      location: "456 Health Clinic, Chicago",
      email: "dr.patel@clinic.com",
      phone: "+1 (555) 321-7654",
      availableDays: "Monday - Friday",
      hours: "8:00 AM - 4:00 PM",
      certifications: [
        "American Board of Pediatrics",
        "Neonatal Resuscitation Certification",
        "Child Health and Safety Certification"
      ]
    },
    {
      id: "D-12348",
      name: "Dr. Elena Rossi",
      specialty: "Neurologist",
      experience: "12+ years",
      education: "MD - University of Oxford",
      location: "123 Neuro Center, San Francisco",
      email: "dr.rossi@neurocenter.com",
      phone: "+1 (555) 654-9870",
      availableDays: "Wednesday - Sunday",
      hours: "9:00 AM - 5:00 PM",
      certifications: [
        "American Board of Psychiatry and Neurology",
        "Certified in Epilepsy Management",
        "Cognitive Neuroscience Certification"
      ]
    },
    {
      id: "D-12349",
      name: "Dr. Michael Chen",
      specialty: "Dermatologist",
      experience: "6+ years",
      education: "MD - Stanford University",
      location: "Dermatology Clinic, Miami",
      email: "dr.chen@skinhealth.com",
      phone: "+1 (555) 567-8901",
      availableDays: "Monday - Thursday",
      hours: "10:00 AM - 4:00 PM",
      certifications: [
        "American Board of Dermatology",
        "Cosmetic Dermatology Certification",
        "Skin Cancer Treatment Specialist"
      ]
    }
  ];
  

  useEffect(() => {
    // Find the doctor based on the ID from URL
    const doctor = doctors.find(doc => doc.id === id);
    if (doctor) {
      setSelectedDoctor(doctor);
    } else {
      navigate('/not-found'); // Redirect if doctor not found
    }
  }, [id, navigate]);

  // Set a random placeholder profile image on mount
  useEffect(() => {
    const randomImage = `https://randomuser.me/api/portraits/women/${Math.floor(Math.random() * 100)}.jpg`;
    setProfileImage(randomImage);
  }, []);

  const toggleChat = () => {
    setIsChatOpen(prev => !prev);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const handleNotification = () => {
    navigate('/notification');
  };

  const handleSetting = () => {
    navigate('/setting');
  };

  if (!selectedDoctor) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div>
      <nav className="bg-white shadow-sm px-8 py-4 h-20 flex justify-between items-center">
        <div className="font-bold text-gray-800">
          <img src="/logo1.png" alt="logo" className='h-32 w-32' />
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleNotification}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <Bell className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={handleSetting}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <Settings className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </nav>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Profile Header */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-blue-600 h-32"></div>
            <div className="relative px-6 pb-6">
              <div className="absolute -top-16 cursor-pointer">
                <label htmlFor="profileUpload">
                  <img
                    src={profileImage}
                    alt="Doctor profile"
                    className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 object-cover"
                  />
                </label>
                <input
                  id="profileUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
              <div className="pt-20">
                <h1 className="text-3xl font-bold text-gray-900">{selectedDoctor.name}</h1>
                <p className="text-gray-600 flex items-center gap-2 mt-1">
                  <Stethoscope className="w-5 h-5" />
                  {selectedDoctor.specialty}
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">About</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-500">Experience</p>
                      <p className="text-gray-900">{selectedDoctor.experience}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-500">Education</p>
                      <p className="text-gray-900">{selectedDoctor.education}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Certifications</h2>
                <ul className="space-y-2">
                  {selectedDoctor.certifications.map((cert, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-blue-600" />
                      <span>{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-blue-600" />
                    <span>{selectedDoctor.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <span>{selectedDoctor.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <span>{selectedDoctor.location}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Availability</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <span>{selectedDoctor.availableDays}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <span>{selectedDoctor.hours}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Interface */}
          <div
            className={`fixed bottom-24 right-5 transform transition-all duration-300 ease-in-out ${isChatOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 pointer-events-none'
              }`}
          >
            <div
              className="bg-white rounded-2xl shadow-2xl border border-gray-200"
              style={{
                width: '384px', // w-96 equivalent
                height: '600px'
              }}
            >
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 flex justify-between items-center rounded-t-2xl">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src="/doc.png"
                      alt="AI Assistant"
                      className="w-10 h-10 rounded-full border-2 border-white"
                    />
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Medical Assistant</h3>
                    <span className="text-xs text-blue-100">Online</span>
                  </div>
                </div>
                <button
                  onClick={toggleChat}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Chat Content Container */}
              <div
                className="relative"
                style={{ height: 'calc(570px - 72px)' }} // Total height minus header height
              >
                <iframe
                  src="https://med-bot-sable.vercel.app/"
                  className="absolute top-0 left-0 w-full h-full"
                  style={{
                    border: 'none',
                    overflow: 'scroll'
                  }}
                  title="Medical Assistant Chat"
                  sandbox="allow-same-origin allow-scripts allow-forms"
                />
              </div>
            </div>
          </div>

          {/* Enhanced AI Chatbot Button */}
          <div className="fixed bottom-5 right-5 z-20">
            <div className={`absolute -top-12 right-0 transform transition-all duration-300 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
              }`}>
              <div className="bg-black text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap">
                Chat with Medical Assistant
              </div>
            </div>
            <button
              onClick={toggleChat}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className={`group relative bg-transparent border-2 border-black p-2 rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 ${isChatOpen ? 'rotate-0' : 'hover:scale-110'
                }`}
            >
              <div className="relative">
                <img
                  src="/doc.png"
                  alt="AI Chatbot"
                  className="h-12 w-12 rounded-full transition-transform duration-300"
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div className="absolute -top-1 -right-1">
                <div className="relative">
                  <div className="animate-ping absolute h-3 w-3 rounded-full bg-red-400 opacity-75"></div>
                  <div className="relative h-3 w-3 rounded-full bg-red-500"></div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
