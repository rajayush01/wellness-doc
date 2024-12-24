import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, MessageSquare, Grid, FileText, Settings, LogOut,X} from 'lucide-react';
import "./Patient.css";
import { useNavigate } from 'react-router-dom';
import { FaBell, FaLock, FaShieldAlt, FaUser } from "react-icons/fa";

const AppointmentPortal = () => {
  const navigate = useNavigate();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    reason: '',
    date: '',
    time: '',
    mode: '',
    notes: ''
  });

  const [appointments, setAppointments] = useState([
    {
      name: 'Dr. Sarah Wilson',
      phone: '+1 (555) 123-4567',
      date: '2024-11-10',
      time: '10:00 AM',
      reason: 'Discuss test results',
      mode: 'Virtual'
    },
    {
      name: 'Dr. James Lee',
      phone: '+1 (555) 987-6543',
      date: '2024-11-12',
      time: '02:30 PM',
      reason: 'Follow-up appointment',
      mode: 'In-Person'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [activeSection, setActiveSection] = useState('appointments');

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setAppointments([...appointments, formData]);
    setFormData({
      name: '',
      phone: '',
      reason: '',
      date: '',
      time: '',
      mode: '',
      notes: ''
    });
    setShowForm(false);
  };

  const handleOverview = () => {
    navigate('/dashboard?userType=patient');
  };

  const handleReports = () => {
    navigate('/patreport');
  };


  const toggleChat = () => {
    setIsChatOpen(prev => !prev);
};

const [isSettingsDropdownOpen, setIsSettingsDropdownOpen] = useState(false);

    const toggleSettingsDropdown = () => {
      setIsSettingsDropdownOpen(!isSettingsDropdownOpen);
    };
    const currentPatient = {
      id: 'P-12345',
      name: 'John Doe',
      image: '/api/placeholder/32/32'
    };

    const handlemyprofile = () => {
      setActiveSection('profile');
      console.log("Profile section activated");
      navigate(`/edit/${currentPatient.id}`);     
    }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

   // Utility function to determine status color based on date
   const getStatusColor = (date) => {
    const appointmentDate = new Date(date);
    const today = new Date();
    
    if (appointmentDate < today) {
      return 'bg-gray-100 text-gray-600 border-gray-200';
    } else if (appointmentDate.toDateString() === today.toDateString()) {
      return 'bg-green-100 text-green-600 border-green-200';
    }
    return 'bg-blue-100 text-blue-600 border-blue-200';
  };

  // Utility function to format dates
  const formatDate = (dateStr) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString('en-US', options);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Component */}
      <aside className="w-64 bg-white border-r border-gray-200">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-8">
          <img src="/logo1.png" alt="logo" className='h-42 -mt-20 -mb-16 -ml-8'/>
          </div>

          <nav className="space-y-4">
          <button
              onClick={handleOverview}
              className={`flex items-center space-x-3 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100`}
            >
              <Grid className="w-5 h-5" />
              <span>Overview</span>
            </button>
            <button
              onClick={() => setActiveSection('appointments')}
              className={`flex items-center space-x-3 px-4 py-2 rounded-lg ${activeSection === 'appointments' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Calendar className="w-5 h-5" />
              <span>Appointments</span>
            </button>
            <button
              onClick={handleReports}
              className={`flex items-center space-x-3 px-4 py-2 rounded-lg ${activeSection === 'reports' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <FileText className="w-5 h-5" />
              <span>Reports</span>
            </button>
            <button
              onClick={toggleSettingsDropdown}
              className={`flex items-center space-x-3 px-4 py-2 rounded-lg ${activeSection === 'settings' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>

            {isSettingsDropdownOpen && (
              <div className="pl-8 mt-2 space-y-2">
                <button
                  onClick={handlemyprofile}
                  className="flex items-center space-x-3 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100"
                >
                  <FaUser className="w-5 h-5" />
                  <span>My Profile</span>
                </button>
                {/* <button
                  onClick={() => setActiveSection('account')}
                  className="flex items-center space-x-3 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100"
                >
                  <FaShieldAlt className="w-5 h-5" />
                  <span>Account Settings</span>
                </button> */}
                <button
                  onClick={() => setActiveSection('notifications')}
                  className="flex items-center space-x-3 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100"
                >
                  <FaBell className="w-5 h-5" />
                  <span>Notifications</span>
                </button>
                <button
                  onClick={() => setActiveSection('privacy')}
                  className="flex items-center space-x-3 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100"
                >
                  <FaLock className="w-5 h-5" />
                  <span>Privacy</span>
                </button>
              </div>
            )}
          </nav>
        </div>

        <div className="mt-auto p-6">
          <button className="flex items-center space-x-3 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 w-full">
            <LogOut className="w-5 h-5" />
            <span>Log out</span>
          </button>
        </div>
      </aside>

      <div className="flex-1 p-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">
            <span className="block text-lg text-gray-500 mb-2">Welcome back</span>
            Your Appointments
          </h1>

          <div className="grid gap-6">
            {appointments.map((appointment, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Time Column */}
                  <div className="md:w-48 p-6 bg-gray-50 flex flex-col justify-center items-center border-b md:border-b-0 md:border-r border-gray-100">
                    <p className="text-3xl font-bold text-gray-800">
                      {appointment.time}
                    </p>
                    <p className="text-gray-500 mt-1 text-center">
                      {formatDate(appointment.date)}
                    </p>
                  </div>

                  {/* Main Content */}
                  <div className="flex-1 p-6">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <User className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-500">Doctor</p>
                            <p className="font-semibold text-gray-900">{appointment.name}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <Phone className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-500">Contact</p>
                            <p className="font-semibold text-gray-900">{appointment.phone}</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.date)} border`}>
                            {appointment.mode}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <MessageSquare className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-500">Reason</p>
                            <p className="font-semibold text-gray-900">{appointment.reason}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add New Appointment Button */}
          <button
            onClick={() => setShowForm(true)}
            className="mt-8 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2 w-full md:w-auto"
          >
            <Calendar className="w-5 h-5" />
            <span>Schedule New Appointment</span>
          </button>

        {/* Popup Modal for Scheduling Appointment */}
        {showForm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6 relative">
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X size={24} />
              </button>
              <h2 className="text-2xl font-semibold text-center mb-4">Schedule Appointment</h2>

              {/* Form container with fixed height and hidden scrollbar */}
              <div className="h-96 overflow-y-auto scrollbar-hide">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="flex items-center space-x-2 text-sm font-medium">
                      <User className="text-gray-500" size={20} />
                      <span>Full Name</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="flex items-center space-x-2 text-sm font-medium">
                      <Phone className="text-gray-500" size={20} />
                      <span>Phone Number</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="reason" className="flex items-center space-x-2 text-sm font-medium">
                      <span>Reason</span>
                    </label>
                    <input
                      type="text"
                      id="reason"
                      name="reason"
                      value={formData.reason}
                      onChange={handleChange}
                      className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      placeholder="Reason for appointment"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="date" className="flex items-center space-x-2 text-sm font-medium">
                      <Calendar className="text-gray-500" size={20} />
                      <span>Preferred Date</span>
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="time" className="flex items-center space-x-2 text-sm font-medium">
                      <Clock className="text-gray-500" size={20} />
                      <span>Preferred Time</span>
                    </label>
                    <select
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select time slot</option>
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="mode" className="flex items-center space-x-2 text-sm font-medium">
                      <span>Mode</span>
                    </label>
                    <select
                      id="mode"
                      name="mode"
                      value={formData.mode}
                      onChange={handleChange}
                      className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select mode</option>
                      <option value="virtual">Virtual</option>
                      <option value="in-person">In-Person</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="notes" className="flex items-center space-x-2 text-sm font-medium">
                      <MessageSquare className="text-gray-500" size={20} />
                      <span>Notes</span>
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows="3"
                      className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      placeholder="Additional notes"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
                  >
                    Confirm Appointment
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
       {/* Chat Interface */}
       <div 
                className={`fixed bottom-24 right-5 transform transition-all duration-300 ease-in-out ${
                    isChatOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 pointer-events-none'
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
                <div className={`absolute -top-12 right-0 transform transition-all duration-300 ${
                    isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
                }`}>
                    <div className="bg-black text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap">
                        Chat with Medical Assistant
                    </div>
                </div>
                <button
                    onClick={toggleChat}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className={`group relative bg-transparent border-2 border-black p-2 rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 ${
                        isChatOpen ? 'rotate-0' : 'hover:scale-110'
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
  );
};

export default AppointmentPortal;
