import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  Search,
  ExternalLink,
  Settings,
  Calendar,
  MessageSquare,
  FileText,
  Grid,
  LogOut,
  HelpCircle
} from 'lucide-react';
import PatientFormPopup from '@/app/components/DashboardComponents/Patients/PatientFormPopup';
import DashboardCalendar from '@/app/components/DashboardComponents/DashboardCalender';
import AppointmentDetailsModal from '@/app/components/DashboardComponents/Patients/AppointmentDetailsModal';

const DashboardPatient = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(true);
  const [showAppointmentDetails, setShowAppointmentDetails] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedAppointment, setSelectedAppointment] = useState(null);

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

  const renderSidebar = () => (
    <aside className="w-64 bg-white border-r border-gray-200">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-8">
          <img src="/logo1.png" alt="logo" className='h-42 -mt-20 -mb-16 -ml-8'/>
        </div>

        <nav className="space-y-4">
          <button
            onClick={() => setActiveSection('overview')}
            className={`flex items-center space-x-3 px-4 py-2 rounded-lg ${activeSection === 'overview' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
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
            onClick={() => setActiveSection('reports')}
            className={`flex items-center space-x-3 px-4 py-2 rounded-lg ${activeSection === 'reports' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <FileText className="w-5 h-5" />
            <span>Reports</span>
          </button>
          <button
            onClick={() => setActiveSection('settings')}
            className={`flex items-center space-x-3 px-4 py-2 rounded-lg ${activeSection === 'settings' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
        </nav>
      </div>

      <div className="mt-auto p-6">
        <button 
          onClick={handleLogout}
          className="flex items-center space-x-3 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 w-full">
          <LogOut className="w-5 h-5" />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );

  const renderHeader = () => (
    <header className="bg-white border-b border-gray-200 px-8 py-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Good Morning Umair!</h1>
          <p className="text-gray-600 mt-1">How are you feeling today?</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Search className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Bell className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex items-center space-x-2">
            <img src="/api/placeholder/32/32" alt="Profile" className="w-8 h-8 rounded-full" />
            <span className="text-sm font-medium">Umair Iqbal</span>
          </div>
        </div>
      </div>
    </header>
  );

  const renderBanner = () => (
    <div className="bg-blue-600 text-white rounded-xl p-8 flex justify-between items-center relative overflow-visible mt-10">
      <div>
        <h2 className="text-2xl font-bold mb-2">Find the best doctors with Health Care</h2>
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
        <button className="text-gray-400 hover:text-gray-600">
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
    </div>
  );
};

export default DashboardPatient;