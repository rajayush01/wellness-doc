import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = () => {
    const location = useLocation();
    const navigate = useNavigate(); // Initialize useNavigate
    const queryParams = new URLSearchParams(location.search);
    const userTypeFromQuery = queryParams.get('userType'); // Get the userType from the query params

    const [formData, setFormData] = useState({
        userType: userTypeFromQuery || '', // Pre-fill userType if available
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Simulating login validation
        if (formData.email.trim() !== '' && formData.password.trim() !== '') {
            console.log('Form submitted:', formData);
            
            // Redirect user to their respective dashboard based on userType
            if (formData.userType === 'doctor') {
                navigate('/dashboard?userType=doctor');
            } else if (formData.userType === 'patient') {
                navigate('/dashboard?userType=patient');
            } else {
                alert('Please select a valid user type.');
            }
        } else {
            alert('Please enter valid email and password.');
        }
    };

    const isFormValid = () => {
        return formData.email.trim() !== '' && formData.password.trim() !== '';
    };

    return (
        <div className="relative min-h-screen bg-gray-100">
            {/* Navbar */}
            <div className="relative z-20">
                <Navbar />
            </div>

            {/* Background image */}
            <div 
                className="absolute inset-0 bg-cover bg-center z-0" 
                style={{ backgroundImage: "url('/login1.png')" }}
            ></div>

            {/* Overlay for a darker background */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-70 z-0"></div>

            {/* Login Box */}
            <div className="relative flex items-center justify-center min-h-screen z-10">
                <div className="bg-white bg-opacity-50 p-10 rounded-lg shadow-2xl max-w-md w-full transform hover:scale-105 transition duration-500 ease-in-out">
                    <h2 className="text-3xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500">
                        Welcome Back {formData.userType ? `(${formData.userType})` : ''}
                    </h2>

                    <form onSubmit={handleSubmit}>
                        {!formData.userType && (
                            <div className="mb-6">
                                <label htmlFor="userType" className="block text-gray-700 font-semibold mb-2">
                                    Are you a Doctor or Patient?
                                </label>
                                <select
                                    id="userType"
                                    value={formData.userType}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition"
                                    required
                                >
                                    <option value="">Select user type</option>
                                    <option value="doctor">Doctor</option>
                                    <option value="patient">Patient</option>
                                </select>
                            </div>
                        )}

                        <div className="mb-6">
                            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition"
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition"
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={!isFormValid()}
                            className={`w-full font-bold py-3 rounded-lg shadow-md transition duration-300 ease-in-out ${
                                isFormValid()
                                    ? 'bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 text-white hover:bg-indigo-700 hover:shadow-lg'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                        >
                            Login
                        </button>
                    </form>

                    <p className="mt-6 text-center text-gray-600">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-indigo-600 font-semibold hover:underline transition">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
