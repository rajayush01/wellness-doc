import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import Navbar from '../Navbar/Navbar';

const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        specialty: '',
        licenseNumber: '',
        practiceAddress: '',
        experience: '',
    });

    const [selectedRole, setSelectedRole] = useState(null);

    const handleRoleSelect = (role) => {
        setSelectedRole(role);
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // Here you would typically make an API call to register the user
            // For now, we'll simulate a successful registration
            console.log('Form submitted:', formData, 'as', selectedRole);
            
            // Navigate to the appropriate dashboard based on role
            if (selectedRole === 'doctor') {
                navigate('/dashboard?userType=doctor');
            } else {
                navigate('/dashboard?userType=patient');
            }
        } catch (error) {
            console.error('Registration failed:', error);
            // Handle registration error (show error message, etc.)
        }
    };

    const isFormValid = () => {
        return formData.name.trim() !== '' &&
            formData.email.trim() !== '' &&
            formData.password.trim() !== '' &&
            (selectedRole === 'doctor'
                ? formData.phone.trim() !== '' &&
                formData.specialty.trim() !== '' &&
                formData.licenseNumber.trim() !== '' &&
                formData.practiceAddress.trim() !== '' &&
                formData.experience.trim() !== ''
                : true);
    };

    return (
        <div className="relative min-h-screen bg-gray-100">
            <div className="relative z-10">
                <Navbar />
            </div>

            <div
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{ backgroundImage: "url('/login1.png')" }}
            ></div>

            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-70 z-0"></div>

            <div className="relative flex items-center justify-center min-h-screen">
                <div className="bg-white bg-opacity-60 backdrop-blur-sm p-10 rounded-2xl shadow-2xl max-w-sm w-full transform transition duration-500">
                    {selectedRole && (
                        <button
                            onClick={() => setSelectedRole(null)}
                            className="absolute top-4 left-4 text-gray-700 hover:text-gray-900"
                        >
                            <FaArrowLeft size={24} />
                        </button>
                    )}

                    {!selectedRole ? (
                        <>
                            <h2 className="text-3xl font-bold mb-8 text-center">
                                Sign Up As
                            </h2>
                            <div className="flex flex-col gap-6 items-center justify-center md:flex-row md:gap-10">
                                <button
                                    onClick={() => handleRoleSelect('doctor')}
                                    className="w-full md:w-auto py-2 px-4 border-2 border-blue-500 text-black rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-r hover:text-white hover:from-blue-700 hover:via-blue-500 hover:to-blue-300 focus:outline-none focus:ring-4 focus:ring-purple-300"
                                >
                                    Doctor
                                </button>
                                <button
                                    onClick={() => handleRoleSelect('patient')}
                                    className="w-full md:w-auto py-2 px-4 border-2 border-blue-500 text-black rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-r hover:text-white hover:from-blue-700 hover:via-blue-500 hover:to-blue-300 focus:outline-none focus:ring-4 focus:ring-teal-300"
                                >
                                    Patient
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                             <h2 className="text-2xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500">
                                {selectedRole === 'doctor' ? 'Doctor Registration' : 'Patient Registration'}
                            </h2>
                            <form
                                className={`space-y-4 max-h-[300px] overflow-y-auto ${selectedRole === 'doctor' ? 'scrollbar-hidden' : 'scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200'}`}
                                onSubmit={handleSubmit}
                            >                                
                            <div className="relative">
                                    <label className="block text-gray-700 font-medium text-sm mb-2" htmlFor="name">Full Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full p-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-300 focus:outline-none text-sm"
                                        placeholder="Enter your full name"
                                        required
                                    />
                                </div>
                                <div className="relative">
                                    <label className="block text-gray-700 font-medium text-sm mb-2" htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full p-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-300 focus:outline-none text-sm"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>
                                <div className="relative">
                                    <label className="block text-gray-700 font-medium text-sm mb-2" htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full p-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-300 focus:outline-none text-sm"
                                        placeholder="Create a password"
                                        required
                                    />
                                </div>

                                {/* Conditional fields for doctors */}
                                {selectedRole === 'doctor' && (
                                    <>
                                        <div className="relative">
                                            <label className="block text-gray-700 font-medium text-sm mb-2" htmlFor="phone">Phone Number</label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full p-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-300 focus:outline-none text-sm"
                                                placeholder="Enter your phone number"
                                                required
                                            />
                                        </div>
                                        <div className="relative">
                                            <label className="block text-gray-700 font-medium text-sm mb-2" htmlFor="specialty">Specialty</label>
                                            <input
                                                type="text"
                                                id="specialty"
                                                value={formData.specialty}
                                                onChange={handleChange}
                                                className="w-full p-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-300 focus:outline-none text-sm"
                                                placeholder="Enter your specialty"
                                                required
                                            />
                                        </div>
                                        <div className="relative">
                                            <label className="block text-gray-700 font-medium text-sm mb-2" htmlFor="licenseNumber">Medical License Number</label>
                                            <input
                                                type="text"
                                                id="licenseNumber"
                                                value={formData.licenseNumber}
                                                onChange={handleChange}
                                                className="w-full p-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-300 focus:outline-none text-sm"
                                                placeholder="Enter your medical license number"
                                                required
                                            />
                                        </div>
                                        <div className="relative">
                                            <label className="block text-gray-700 font-medium text-sm mb-2" htmlFor="practiceAddress">Practice Address</label>
                                            <input
                                                type="text"
                                                id="practiceAddress"
                                                value={formData.practiceAddress}
                                                onChange={handleChange}
                                                className="w-full p-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-300 focus:outline-none text-sm"
                                                placeholder="Enter your practice address"
                                                required
                                            />
                                        </div>
                                        <div className="relative">
                                            <label className="block text-gray-700 font-medium text-sm mb-2" htmlFor="experience">Years of Experience</label>
                                            <input
                                                type="number"
                                                id="experience"
                                                value={formData.experience}
                                                onChange={handleChange}
                                                className="w-full p-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-300 focus:outline-none text-sm"
                                                placeholder="Enter your years of experience"
                                                required
                                            />
                                        </div>
                                    </>
                                )}

<button
                                    type="submit"
                                    className="w-full py-2 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 text-white rounded-lg shadow-lg hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-700 transition duration-300 transform focus:outline-none focus:ring-4 focus:ring-teal-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                                    disabled={!isFormValid()}
                                >
                                    Sign Up
                                </button>
                            </form>
                        </>
                    )}

                    <div className="mt-4 text-center text-sm">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-500 hover:underline">
                            Log In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
