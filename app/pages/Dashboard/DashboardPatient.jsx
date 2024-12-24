import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  Search,
  ExternalLink,
  Settings,
  Calendar,
  MessageCircle,
  Info,
  AlertCircle,
  FileText,
  Grid,
  LogOut,
  HelpCircle,
  X
} from 'lucide-react';
import { FaBell, FaLock, FaUser } from "react-icons/fa";
import PatientFormPopup from '@/app/components/DashboardComponents/Patients/PatientFormPopup';
import DashboardCalendar from '@/app/components/DashboardComponents/DashboardCalender';
import AppointmentDetailsModal from '@/app/components/DashboardComponents/Patients/AppointmentDetailsModal';
import NearbyDoctorsMap from '@/app/components/DashboardComponents/NearbyDoctorsMap';

const DashboardPatient = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(true);
  const [showAppointmentDetails, setShowAppointmentDetails] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const toggleChat = () => {
    setIsChatOpen(prev => !prev);
  };

  const vitals = [
    { name: 'Body Temperature', value: '36.2', unit: '°C' },
    { name: 'Pulse', value: '85', unit: 'bpm' },
    { name: 'Blood Pressure', value: '80/70', unit: 'mm/Hg' },
    { name: 'Breathing Rate', value: '15', unit: 'breaths/m' }
  ];

  const appointments = [
    {
      id: "D-12345",
      doctor: 'Dr. Sarah Wilson',
      image: '/api/placeholder/32/32',
      specialization: 'Cardiologist',
      date: '2024-02-08',
      time: '09:45',
      status: 'Active',
      report: '/sample-report.pdf'
    },
    {
      id: "D-12346",
      doctor: "Dr. James Lee",
      image: '/api/placeholder/32/32',
      specialization: 'Orthopedic Surgeon',
      date: '2024-02-15',
      time: '14:30',
      status: 'Upcoming',
      report: null
    },
    {
      id: "D-12347",
      doctor: "Dr. Priya Patel",
      image: '/api/placeholder/32/32',
      specialization: 'Pedestrician',
      date: '2024-02-20',
      time: '11:00',
      status: 'Completed',
      report: '/sample-report.pdf'
    },
    {
      id: "D-12348",
      doctor: "Dr. Elena Rossi",
      image: '/api/placeholder/32/32',
      specialization: 'Dentist',
      date: '2024-02-22',
      time: '16:15',
      status: 'Completed',
      report: '/sample-report.pdf'
    }
  ];

  const reports = [
    { name: 'Glucose', date: '2024-02-11', icon: '📊' },
    { name: 'Blood Count', date: '2024-02-11', icon: '🔬' },
    { name: 'Full Body X-Ray', date: '2024-02-11', icon: '📷' },
    { name: 'Hepatitis Panel', date: '2024-02-11', icon: '📋' },
    { name: 'Calcium', date: '2024-02-11', icon: '💊' }
  ];

  const appointmentHandler = () => {
    navigate('/appointment');
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-600';
      case 'upcoming':
        return 'bg-blue-100 text-blue-600';
      case 'completed':
        return 'bg-gray-100 text-gray-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };



  const handleAppointmentDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setShowAppointmentDetails(true);
  };

  const handleDownloadReport = (report) => {
    window.open(report, '_blank');
  };

  const handleLogout = () => {
    navigate("/login");
  }

  const handleReport = () => {
    navigate("/patreport");
  }

  const renderSidebar = () => {
    const [activeSection, setActiveSection] = useState('overview');
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

    return (
      <aside className="w-64 bg-white border-r border-gray-200">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-8">
            <img src="/logo1.png" alt="logo" className="h-42 -mt-20 -mb-16 -ml-8" />
          </div>

          <nav className="space-y-4">
            <button
              onClick={() => setActiveSection('overview')}
              className={`flex items-center space-x-3 px-4 py-2 rounded-lg ${activeSection === 'overview' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
              <Grid className="w-5 h-5" />
              <span>Overview</span>
            </button>
            <button
              onClick={() => setActiveSection('appointments')}
              className={`flex items-center space-x-3 px-4 py-2 rounded-lg ${activeSection === 'appointments' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
              <Calendar className="w-5 h-5" />
              <span>Appointments</span>
            </button>
            <button
              onClick={() => setActiveSection('reports')}
              className={`flex items-center space-x-3 px-4 py-2 rounded-lg ${activeSection === 'reports' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
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
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 w-full"
          >
            <LogOut className="w-5 h-5" />
            <span>Log out</span>
          </button>
        </div>
      </aside>
    );
  };

  const renderHeader = () => {
    const navigate = useNavigate();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [notifications, setNotifications] = useState([
      {
        id: 1,
        type: 'welcome',
        title: 'Welcome to WellnessDoc!',
        message: 'Thank you for choosing our platform for your healthcare needs.',
        timestamp: '2 minutes ago',
        read: false,
        icon: Info,
        color: 'blue'
      },
      {
        id: 2,
        type: 'appointment',
        title: 'Upcoming Appointment',
        message: 'You have an appointment with Dr. Sarah Wilson tomorrow at 10:00 AM.',
        timestamp: '1 hour ago',
        read: false,
        icon: Calendar,
        color: 'green'
      },
      {
        id: 3,
        type: 'message',
        title: 'New Message from Doctor',
        message: 'Dr. James Lee has sent you a message regarding your recent lab results.',
        timestamp: '2 hours ago',
        read: true,
        icon: MessageCircle,
        color: 'purple'
      },
      {
        id: 4,
        type: 'alert',
        title: 'Complete Your Profile',
        message: 'Please complete your medical history for better healthcare service.',
        timestamp: '1 day ago',
        read: true,
        icon: AlertCircle,
        color: 'orange'
      }
    ]);
    const currentPatient = {
      id: 'P-12345',
      name: 'John Doe',
      image: '/api/placeholder/32/32'
    };
    // Dummy doctor data
    const doctors = [
      {
        id: 'D-12345',
        name: 'Dr. Sarah Wilson',
        specialty: 'Cardiologist',
      },
      {
        id: 'D-12346',
        name: 'Dr. James Lee',
        specialty: 'Orthopedic Surgeon',
      },
      {
        id: 'D-12347',
        name: 'Dr. Priya Patel',
        specialty: 'Pediatrician',
      },
      {
        id: 'D-12348',
        name: 'Dr. Elena Rossi',
        specialty: 'Neurologist',
      },
      {
        id: 'D-12349',
        name: 'Dr. Michael Chen',
        specialty: 'Dermatologist',
      },
    ];


    // Filtered doctors based on search term
    const filteredDoctors = doctors.filter((doctor) =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDoctorClick = (doctor) => {
      navigate(`/docpro/${doctor.id}`);
    };

    const handlePatientProfileClick = () => {
      navigate(`/edit/${currentPatient.id}`);
    };
    const handleNotificationClick = () => {
      setIsNotificationsOpen(!isNotificationsOpen);
    };

    const markAllAsRead = () => {
      setNotifications(notifications.map(notif => ({ ...notif, read: true })));
    };

    const markAsRead = (id) => {
      setNotifications(notifications.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      ));
    };

    const deleteNotification = (id) => {
      setNotifications(notifications.filter(notif => notif.id !== id));
    };

    const unreadCount = notifications.filter(n => !n.read).length;


    return (
      <header className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Good Morning Umair!</h1>
            <p className="text-gray-600 mt-1">How are you feeling today?</p>
          </div>
          <div className="flex items-center space-x-4">
            {/* Search Button and Input */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <Search className="w-5 h-5 text-gray-600" />
              </button>
              {isSearchOpen && (
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search doctors..."
                  className="p-2 border rounded-lg w-48 bg-white shadow"
                />
              )}
            </div>

            <div className="relative">
              <button
                onClick={handleNotificationClick}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 relative"
              >
                <Bell className="w-5 h-5 text-gray-600" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-gray-900">Notifications</h3>
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllAsRead}
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          Mark all as read
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => {
                        const IconComponent = notification.icon;
                        return (
                          <div
                            key={notification.id}
                            className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200 ${!notification.read ? 'bg-blue-50' : ''
                              }`}
                            onClick={() => markAsRead(notification.id)}
                          >
                            <div className="flex items-start space-x-3">
                              <div className={`p-2 rounded-full bg-${notification.color}-100`}>
                                <IconComponent className={`w-5 h-5 text-${notification.color}-600`} />
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between items-start">
                                  <h4 className="font-medium text-gray-900">{notification.title}</h4>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      deleteNotification(notification.id);
                                    }}
                                    className="text-gray-400 hover:text-gray-600"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                                <p className="text-xs text-gray-500 mt-1">{notification.timestamp}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="p-4 text-center text-gray-500">
                        No notifications
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div
              onClick={handlePatientProfileClick}
              className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors duration-200"
            >
              <img
                src={currentPatient.image}
                alt={currentPatient.name}
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm font-medium text-gray-900">{currentPatient.name}</span>
            </div>
          </div>
        </div>

        {/* Display Filtered Results */}
        {isSearchOpen && searchTerm && (
          <div className="mt-4 bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Search Results:</h2>
            <ul>
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map((doctor, index) => (
                  <li
                    key={index}
                    className="text-gray-700 cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
                    onClick={() => handleDoctorClick(doctor)}
                  >
                    {doctor.name} - {doctor.specialty}
                  </li>
                ))
              ) : (
                <li className="text-gray-500">No results found</li>
              )}
            </ul>
          </div>
        )}
      </header>
    );
  };


  const renderBanner = () => (
    <div className="bg-blue-600 text-white rounded-xl p-8 flex justify-between items-center relative overflow-visible mt-10">
      <div>
        <h2 className="text-2xl font-bold mb-2">Find the best doctors with WellnessDoc</h2>
        <p className="text-blue-100">Appoint the doctors and get finest medical services.</p>
      </div>
      <img
        src="/patdash.png"
        alt="Doctor illustration"
        className="h-88 w-44 -mt-32"
      />
    </div>


  );

  const renderVitals = () => (
    <div className="grid grid-cols-4 gap-6 mt-8">
      {vitals.map((vital, index) => (
        <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-gray-600 text-sm font-medium">{vital.name}</h3>
          <div className="mt-2 flex items-baseline space-x-1">
            <span className="text-2xl font-bold">{vital.value}</span>
            <span className="text-gray-500 text-sm">{vital.unit}</span>
          </div>
        </div>
      ))}
    </div>
  );

  const renderAppointments = () => (
    <div className="bg-white rounded-xl shadow-sm mt-8">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Appointments</h3>
          <button
            onClick={appointmentHandler}
            className="text-gray-400 hover:text-gray-600">
            <ExternalLink className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="p-6">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-600">
              <th className="pb-4">Doctor</th>
              <th className="pb-4">Specification</th>
              <th className="pb-4">Date</th>
              <th className="pb-4">Time</th>
              <th className="pb-4">Status</th>
              <th className="pb-4"></th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr key={index} className="border-t border-gray-100">
                <td className="py-4">
                  <div className="flex items-center space-x-3">
                    <img src={appointment.image} alt={appointment.doctor} className="w-8 h-8 rounded-full" />
                    <span className="font-medium">{appointment.doctor}</span>
                  </div>
                </td>
                <td className="py-4 text-gray-600">{appointment.specialization}</td>
                <td className="py-4 text-gray-600">{appointment.date}</td>
                <td className="py-4 text-gray-600">{appointment.time}</td>
                <td className="py-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(appointment.status)}`}>
                    {appointment.status}
                  </span>
                </td>
                <td className="py-4">
                  <button
                    className="text-gray-400 hover:text-gray-600"
                    onClick={() => handleAppointmentDetails(appointment)}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="bg-white rounded-xl shadow-sm mt-8 p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">My Reports</h3>
        <button
          onClick={handleReport}
          className="text-gray-400 hover:text-gray-600">
          <ExternalLink className="w-5 h-5" />
        </button>
      </div>
      <div className="space-y-4">
        {reports.map((report, index) => (
          <div key={index} className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <span className="text-xl">{report.icon}</span>
              <span className="text-gray-600">{report.name}</span>
            </div>
            <span className="text-gray-400 text-sm">{report.date}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderReportsAndCalendar = () => (
    <div className="grid grid-cols-3 gap-6 mt-8">
      <div className="col-span-1">
        {renderReports()}
      </div>

      {/* New Calendar Integration */}
      <div className="col-span-2">
        <DashboardCalendar appointments={appointments} />
      </div>
    </div>
  );

  useEffect(() => {
    // Scroll to the respective section when the sidebar button is clicked
    const sections = {
      overview: 'overview',
      appointments: 'appointments',
      reports: 'reports',
      settings: 'settings'
    };
    const sectionElement = document.getElementById(sections[activeSection]);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeSection]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {renderSidebar()}

      <div className="flex-1">
        {renderHeader()}

        <main className="p-8">
          <div id="overview">
            {renderBanner()}
            {renderVitals()}
          </div>
          <div id="appointments">
            {renderAppointments()}
          </div>
          <div id='map'>
            <NearbyDoctorsMap />
          </div>
          <div id="reports">
            {renderReportsAndCalendar()}
          </div>
          {/* Add a section id for settings when implemented */}
        </main>
      </div>

      <div className="fixed bottom-8 left-8 bg-blue-600 text-white p-4 rounded-full shadow-lg cursor-pointer hover:bg-blue-700 transition-colors">
        <HelpCircle className="w-6 h-6" />
      </div>

      {showForm && <PatientFormPopup closeForm={() => setShowForm(false)} />}
      {showAppointmentDetails && (
        <AppointmentDetailsModal
          appointment={selectedAppointment}
          onClose={() => setShowAppointmentDetails(false)}
          onDownloadReport={handleDownloadReport}
        />
      )}

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
  );
};

export default DashboardPatient;