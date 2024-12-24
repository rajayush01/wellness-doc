import React, { useState } from 'react';

const PatientFormPopup = ({ closeForm }) => {
    const [formData, setFormData] = useState({
        // Personal Information (required)
        name: '',
        gender: '',
        dob: '',
        bloodGroup: '',
        // Physical Measurements (required)
        weight: '',
        height: '',
        // Optional fields
        lastInoculatedTABC: '',
        bcg: '',
        tripleAntigen: '',
        tetanus: '',
        lastVaccinated: '',
        vision: '',
        generalHealth: '',
        majorIllness: '',
        physicalDeformity: '',
        lastIllness: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // Clear error when field is being edited
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        let newErrors = {};

        // Required fields validation
        const requiredFields = {
            // Personal Information
            name: 'Name is required',
            gender: 'Gender is required',
            dob: 'Date of Birth is required',
            bloodGroup: 'Blood Group is required',
            // Physical Measurements
            weight: 'Weight is required',
            height: 'Height is required'
        };

        Object.keys(requiredFields).forEach(field => {
            if (!formData[field]) {
                newErrors[field] = requiredFields[field];
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Form submitted with the following data:', formData);
            closeForm();
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white dark:bg-gray-800 z-10 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <button
                        className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        onClick={closeForm}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Patient Health Form</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Fields marked with * are required</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    {/* Personal Information Section */}
                    <div className="space-y-6">
                        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Personal Information *</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={`w-full p-2 rounded-md border ${errors.name ? 'border-red-500' : 'border-gray-300'} dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                                        placeholder="Enter your full name"
                                    />
                                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Gender *
                                    </label>
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        className={`w-full p-2 rounded-md border ${errors.gender ? 'border-red-500' : 'border-gray-300'} dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                                    >
                                        <option value="">Select gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                    {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Date of Birth *
                                    </label>
                                    <input
                                        type="date"
                                        name="dob"
                                        value={formData.dob}
                                        onChange={handleChange}
                                        className={`w-full p-2 rounded-md border ${errors.dob ? 'border-red-500' : 'border-gray-300'} dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                                    />
                                    {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Blood Group *
                                    </label>
                                    <select
                                        name="bloodGroup"
                                        value={formData.bloodGroup}
                                        onChange={handleChange}
                                        className={`w-full p-2 rounded-md border ${errors.bloodGroup ? 'border-red-500' : 'border-gray-300'} dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                                    >
                                        <option value="">Select blood group</option>
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                    </select>
                                    {errors.bloodGroup && <p className="text-red-500 text-sm mt-1">{errors.bloodGroup}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Physical Measurements Section */}
                        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Physical Measurements *</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Weight (kg) *
                                    </label>
                                    <input
                                        type="number"
                                        name="weight"
                                        value={formData.weight}
                                        onChange={handleChange}
                                        className={`w-full p-2 rounded-md border ${errors.weight ? 'border-red-500' : 'border-gray-300'} dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                                        placeholder="Enter weight"
                                    />
                                    {errors.weight && <p className="text-red-500 text-sm mt-1">{errors.weight}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Height (cm) *
                                    </label>
                                    <input
                                        type="number"
                                        name="height"
                                        value={formData.height}
                                        onChange={handleChange}
                                        className={`w-full p-2 rounded-md border ${errors.height ? 'border-red-500' : 'border-gray-300'} dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                                        placeholder="Enter height"
                                    />
                                    {errors.height && <p className="text-red-500 text-sm mt-1">{errors.height}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Vaccination History Section */}
                        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Vaccination History (Optional)</h3>
                            <div className="grid grid-cols-1 gap-4">
                                {[
                                    { name: "lastInoculatedTABC", label: "Last TABC Inoculation", placeholder: "Enter date or details" },
                                    { name: "bcg", label: "BCG Vaccination", placeholder: "Enter date or details" },
                                    { name: "tripleAntigen", label: "Triple Antigen", placeholder: "Enter date or details" },
                                    { name: "tetanus", label: "Tetanus", placeholder: "Enter date or details" },
                                    { name: "lastVaccinated", label: "Last Vaccination", placeholder: "Enter date or details" }
                                ].map((item) => (
                                    <div key={item.name}>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            {item.label}
                                        </label>
                                        <input
                                            type="text"
                                            name={item.name}
                                            value={formData[item.name]}
                                            onChange={handleChange}
                                            className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            placeholder={item.placeholder}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Health Status Section */}
                        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Health Status (Optional)</h3>
                            <div className="grid grid-cols-1 gap-4">
                                {[
                                    { name: "vision", label: "Vision Status", type: "select", options: ["Normal", "Requires Correction", "Other"] },
                                    { name: "generalHealth", label: "General Health Condition", type: "textarea" },
                                    { name: "majorIllness", label: "Major Illnesses", type: "textarea", placeholder: "e.g., epilepsy, asthma, etc." },
                                    { name: "physicalDeformity", label: "Physical Deformities", type: "textarea" },
                                    { name: "lastIllness", label: "Recent Illnesses", type: "textarea", placeholder: "Illnesses in the last year" }
                                ].map((item) => (
                                    <div key={item.name}>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            {item.label}
                                        </label>
                                        {item.type === "select" ? (
                                            <select
                                                name={item.name}
                                                value={formData[item.name]}
                                                onChange={handleChange}
                                                className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            >
                                                <option value="">Select status</option>
                                                {item.options.map((option) => (
                                                    <option key={option} value={option.toLowerCase()}>{option}</option>
                                                ))}
                                            </select>
                                        ) : (
                                            <textarea
                                                name={item.name}
                                                value={formData[item.name]}
                                                onChange={handleChange}
                                                className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all h-24"
                                                placeholder={item.placeholder || `Enter ${item.label.toLowerCase()}`} />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-6 flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={closeForm}
                            className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-md shadow hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PatientFormPopup;