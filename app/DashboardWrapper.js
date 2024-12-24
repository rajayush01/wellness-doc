"use client";
import React, { useEffect, useState } from 'react';
import DoctorDashboard from './pages/Dashboard/DashboardDoc'
import PatientDashboard from './pages/Dashboard/DashboardPatient';


const DashboardWrapper = () => {
    const [userType, setUserType] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const searchParams = new URLSearchParams(window.location.search);
            setUserType(searchParams.get('userType'));
        }
    }, []);

    if (userType === 'doctor') {
        return <DoctorDashboard />;
    } else if (userType === 'patient') {
        return <PatientDashboard />;
    } else if (userType === null) {
        return <div>Loading...</div>; // Display a loading state until userType is determined
    } else {
        return <div>No user type specified. Please login again.</div>;
    }
};

export default DashboardWrapper;