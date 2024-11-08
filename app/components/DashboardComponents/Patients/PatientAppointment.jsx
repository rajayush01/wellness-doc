import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, MessageSquare, Grid, FileText, Settings, LogOut, X } from 'lucide-react';
import "./Patient.css";
import { useNavigate } from 'react-router-dom';


const AppointmentPortal = () => {
  const navigate = useNavigate();
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
    navigate('/reports?userType=patient');
  };

  const handleSettings = () => {
    navigate('/setting?userType=patient');
  };


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
              onClick={handleSettings}
              className={`flex items-center space-x-3 px-4 py-2 rounded-lg ${activeSection === 'settings' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
          </nav>
        </div>

        <div className="mt-auto p-6">
          <button className="flex items-center space-x-3 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 w-full">
            <LogOut className="w-5 h-5" />
            <span>Log out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gray-100 flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Appointments</h1>

        {/* Display Ongoing or Previous Appointments */}
        <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Ongoing or Previous Appointments</h2>

          {appointments.length > 0 ? (
            <ul className="space-y-4">
              {appointments.map((appointment, index) => (
                <li key={index} className="p-4 border-b rounded-lg">
                  <p><strong>Name:</strong> {appointment.name}</p>
                  <p><strong>Phone:</strong> {appointment.phone}</p>
                  <p><strong>Date:</strong> {appointment.date}</p>
                  <p><strong>Time:</strong> {appointment.time}</p>
                  <p><strong>Reason:</strong> {appointment.reason}</p>
                  <p><strong>Mode:</strong> {appointment.mode}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No appointments available.</p>
          )}
        </div>

        {/* Button to Schedule a New Appointment */}
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          Schedule New Appointment
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
  );
};

export default AppointmentPortal;
