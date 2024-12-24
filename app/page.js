"use client";
import React from 'react';
import dynamic from 'next/dynamic';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Home/Homepage';
import Login from './components/Login/Login';
import Signup from './components/SignUp/SignUp';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import PatientList from './components/DashboardComponents/Patients/PatientList';
import AppointmentScheduling from './components/DashboardComponents/AppointmentScheduling';
import MedicalReports from './components/DashboardComponents/MedicalReports';
import DoctorProfile from './pages/Profile/DoctorProfile';
import PatientProfile from './pages/Profile/PatientProfile';
import NotificationSystem from './components/DashboardComponents/NotificationSystem';
import SettingsComponent from './components/DashboardComponents/Settings';
import VideoCall from './components/VideoCall/VideoCall';
import AppointmentPortal from './components/DashboardComponents/Patients/PatientAppointment';
import ReportPage from './components/DashboardComponents/Patients/PatientReport';
import EditablePatient from './pages/Profile/EditablePatientProfile';


const DashboardWrapper = dynamic(() => import('./DashboardWrapper'), { ssr: false });

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/patients" element={<PatientList />} />
          <Route path="/schedule" element={<AppointmentScheduling />} />
          <Route path="/appointment" element={<AppointmentPortal />} />
          <Route path="/reports" element={<MedicalReports />} />
          <Route path="/patreport" element={<ReportPage />} />
          <Route path="/docpro/:id" element={<DoctorProfile />} />
          <Route path="/patpro/:id" element={<PatientProfile />} />
          <Route path="/notification" element={<NotificationSystem />} />
          <Route path="/setting" element={<SettingsComponent />} />
          <Route path="/video" element={<VideoCall />} />
          <Route path="/edit/:id" element={<EditablePatient />} />
          {/* Conditional Dashboard Rendering */}
          <Route path="/dashboard" element={<DashboardWrapper />} />
        </Routes>
      </div>
    </Router>

    // <Router>
    //   <div>
    //     <Routes>
    //     {/* <Route path="/" element={<DoctorDashboard/>} /> */}
    //       <Route path="/edit/:id" element={<EditablePatient/>} />
    //       <Route path="/appointment" element={<AppointmentPortal />} />
    //       <Route path="/docpro/:id" element={<DoctorProfile />} />
    //       <Route path="/patpro/:id" element={<PatientProfile />} />
    //     </Routes>
    //   </div>
    // </Router>
  );
}


export default App;
