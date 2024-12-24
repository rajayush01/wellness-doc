import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UserTypeSelection = () => {
    const [userType, setUserType] = useState('');
    const navigate = useNavigate();

    const handleSelection = (type) => {
        setUserType(type);
        navigate(`/login?userType=${type}`); // Pass userType in the URL
    };

    return (
        <div className="relative min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-10 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold mb-8 text-center">Are you a Doctor or a Patient?</h2>
                <div className="flex justify-around">
                    <button
                        onClick={() => handleSelection('doctor')}
                        className="bg-blue-500 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition"
                    >
                        Doctor
                    </button>
                    <button
                        onClick={() => handleSelection('patient')}
                        className="bg-green-500 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-green-700 transition"
                    >
                        Patient
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserTypeSelection;
