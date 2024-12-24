import React, { useState } from 'react';
import { Calendar, UserCog, MessageSquare, ClipboardList, Clock, FileText, Settings, Bell, Search, Plus, LogOut, X, Check, Shield, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AppointmentModal = ({ isOpen, onClose, onSubmit, appointment = null }) => {
  const [formData, setFormData] = useState({
    patient: appointment?.patient || '',
    date: appointment?.date || '',
    time: appointment?.time || '',
    type: appointment?.type || 'Check-up'
  });

  

  React.useEffect(() => {
    if (appointment) {
      setFormData({
        patient: appointment.patient,
        date: appointment.date,
        time: appointment.time,
        type: appointment.type
      });
    }
  }, [appointment]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {appointment ? 'Reschedule Appointment' : 'New Appointment'}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Patient Name</label>
            <input
              type="text"
              value={formData.patient}
              onChange={(e) => setFormData({ ...formData, patient: e.target.value })}
              className="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Time</label>
            <input
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option>Check-up</option>
              <option>Follow-up</option>
              <option>Consultation</option>
              <option>Treatment</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              {appointment ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AppointmentScheduling = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([
    { id: 1, patient: "John Doe", date: "2024-10-25", time: "10:00", type: "Check-up" },
    { id: 2, patient: "Jane Smith", date: "2024-10-25", time: "11:30", type: "Follow-up" }
  ]);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
      {
          id: 1,
          type: 'appointment',
          message: 'New appointment request from John Doe',
          time: '10 minutes ago',
          unread: true
      },
      {
          id: 2,
          type: 'lab',
          message: 'Lab results ready for Patient ID #12345',
          time: '1 hour ago',
          unread: true
      },
      {
          id: 3,
          type: 'message',
          message: 'Nurse Sarah: Patient in Room 302 needs attention',
          time: '2 hours ago',
          unread: false
      }
  ];

  const toggleChat = () => {
    setIsChatOpen(prev => !prev);
};
  const handleNewAppointment = (formData) => {
    const newAppointment = {
      id: appointments.length + 1,
      ...formData
    };
    setAppointments([...appointments, newAppointment]);
  };

  const handleReschedule = (formData) => {
    const updatedAppointments = appointments.map(apt =>
      apt.id === selectedAppointment.id ? { ...apt, ...formData } : apt
    );
    setAppointments(updatedAppointments);
    setSelectedAppointment(null); 
  };

  const handleCancel = (id) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      setAppointments(appointments.filter(apt => apt.id !== id));
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

  return (
    <div>
      <nav className="bg-white shadow-sm px-8 py-4 h-20 flex justify-between items-center">
        <div className="font-bold text-gray-800">
          <img src="/logo1.png" alt="logo" className="h-32 w-32" />
        </div>
        <div className="flex items-center gap-4">
                    <button
                        onClick={() => {
                            setShowNotifications(!showNotifications);
                            setShowSettings(false);
                        }}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
                    >
                        <Bell className="w-6 h-6 text-gray-600" />
                        {notifications.some(n => n.unread) && (
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                        )}
                    </button>

                    {/* Notifications Dropdown */}
                    {showNotifications && (
                        <div className="absolute right-28 mt-[380px] w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                            <div className="p-4 border-b border-gray-200">
                                <h3 className="text-lg font-semibold">Notifications</h3>
                            </div>
                            <div className="max-h-96 overflow-y-auto">
                                {notifications.map(notification => (
                                    <div
                                        key={notification.id}
                                        className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${notification.unread ? 'bg-blue-50' : ''
                                            }`}
                                    >
                                        <div className="flex items-start gap-3">
                                            {notification.type === 'appointment' && (
                                                <Calendar className="w-5 h-5 text-blue-500" />
                                            )}
                                            {notification.type === 'lab' && (
                                                <ClipboardList className="w-5 h-5 text-green-500" />
                                            )}
                                            {notification.type === 'message' && (
                                                <MessageSquare className="w-5 h-5 text-purple-500" />
                                            )}
                                            <div className="flex-1">
                                                <p className="text-sm text-gray-800">{notification.message}</p>
                                                <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    <button
                        onClick={() => {
                            setShowSettings(!showSettings);
                            setShowNotifications(false);
                        }}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <Settings className="w-6 h-6 text-gray-600" />
                    </button>

                    {/* Settings Dropdown */}
                    {showSettings && (
                        <div className="absolute right-28 mt-[300px] w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                            <div className="py-2">
                                <button className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-50">
                                    <UserCog className="w-4 h-4" />
                                    <span>Account Settings</span>
                                </button>
                                <button className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-50">
                                    <Bell className="w-4 h-4" />
                                    <span>Notification Preferences</span>
                                </button>
                                <button className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-50">
                                    <Shield className="w-4 h-4" />
                                    <span>Privacy & Security</span>
                                </button>
                                <button className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-50">
                                    <User className="w-4 h-4" />
                                    <span>Profile Settings</span>
                                </button>
                            </div>
                        </div>
                    )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </nav>
      <div className="flex justify-center items-center mt-6">
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-2xl border-t">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Appointments
            </h2>
            <button
              onClick={() => setIsNewModalOpen(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-600"
            >
              <Plus className="h-4 w-4" />
              New Appointment
            </button>
          </div>
          <div className="space-y-4">
            {appointments.map((apt) => (
              <div key={apt.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{apt.patient}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    {apt.date} at {apt.time}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedAppointment(apt);
                      setIsRescheduleModalOpen(true);
                    }}
                    className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100"
                  >
                    Reschedule
                  </button>
                  <button
                    onClick={() => handleCancel(apt.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AppointmentModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        onSubmit={handleNewAppointment}
      />

      <AppointmentModal
        isOpen={isRescheduleModalOpen}
        onClose={() => setIsRescheduleModalOpen(false)}
        onSubmit={handleReschedule}
        appointment={selectedAppointment}
      />

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

export default AppointmentScheduling;
