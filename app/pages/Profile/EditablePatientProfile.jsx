import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { User, Calendar, Phone, Bell, LogOut, Settings, Mail, MapPin, Activity, X, Edit2, Save, XCircle } from 'lucide-react';

const EditablePatient = ({ id: propsId, isModal }) => {
    const navigate = useNavigate();
    const { id: paramsId } = useParams();
    const trimmedId = (propsId || paramsId)?.trim();
    const [profileImage, setProfileImage] = useState(`https://i.pravatar.cc/128?u=${trimmedId}`);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const handleLogout = () => {
        navigate('/login', { replace: true });
      };

    const handleNotification = () => {
        navigate('/notification');
    }

    const handleSetting = () => {
        navigate('/setting');
    }
    const toggleChat = () => {
        setIsChatOpen(prev => !prev);
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setProfileImage(reader.result);
            reader.readAsDataURL(file);
        }
    };
    
    const initialPatientsData = {
        'P-12345': {
            id: 'P-12345',
            name: "John Doe",
            age: 45,
            gender: "Male",
            bloodType: "O+",
            address: "123 Main St, New York",
            email: "john.doe@email.com",
            phone: "+1 (555) 123-4567",
            emergencyContact: {
                name: "Jane Doe",
                relation: "Spouse",
                phone: "+1 (555) 987-6543"
            },
            medicalHistory: [
                "Diabetes Type 2 - Diagnosed 2019",
                "Hypertension - Diagnosed 2020",
                "Hip Replacement - 2021"
            ],
            upcomingAppointments: [
                {
                    date: "Oct 30, 2024",
                    time: "09:00 AM",
                    doctor: "Dr. Michael Brown",
                    department: "Internal Medicine"
                }
            ]
        },
        'P-12346': {
            id: 'P-12346',
            name: "Jane Smith",
            age: 32,
            gender: "Female",
            bloodType: "A-",
            address: "456 Oak Ave, Boston",
            email: "jane.smith@email.com",
            phone: "+1 (555) 234-5678",
            emergencyContact: {
                name: "Bob Smith",
                relation: "Husband",
                phone: "+1 (555) 876-5432"
            },
            medicalHistory: [
                "Asthma - Diagnosed 2015",
                "Allergic to Penicillin",
            ],
            upcomingAppointments: [
                {
                    date: "Oct 30, 2024",
                    time: "10:30 AM",
                    doctor: "Dr. Sarah Wilson",
                    department: "Pulmonology"
                }
            ]
        },
        'P-12347': {
            id: 'P-12347',
            name: "Mike Johnson",
            age: 52,
            gender: "Male",
            bloodType: "B+",
            address: "789 Pine St, Chicago",
            email: "mike.johnson@email.com",
            phone: "+1 (555) 345-6789",
            emergencyContact: {
                name: "Susan Johnson",
                relation: "Wife",
                phone: "+1 (555) 765-4321"
            },
            medicalHistory: [
                "Arthritis - Diagnosed 2018",
                "High Cholesterol - Diagnosed 2019"
            ],
            upcomingAppointments: [
                {
                    date: "Oct 30, 2024",
                    time: "02:00 PM",
                    doctor: "Dr. James Lee",
                    department: "Orthopedics"
                }
            ]
        }
    };

    const [patientsData, setPatientsData] = useState(initialPatientsData);
    const [editedPatient, setEditedPatient] = useState(null);
    const [currentPatient, setCurrentPatient] = useState(null);

    // Effect to set the current patient when the component mounts or ID changes
    useEffect(() => {
        if (trimmedId && patientsData[trimmedId]) {
            setCurrentPatient(patientsData[trimmedId]);
        } else {
            // If no ID is provided or invalid ID, use the first patient in the data
            const firstPatientId = Object.keys(patientsData)[0];
            setCurrentPatient(patientsData[firstPatientId]);
        }
    }, [trimmedId, patientsData]);

    const handleEdit = () => {
        setEditedPatient({ ...currentPatient });
        setIsEditing(true);
    };

    const handleSave = () => {
        setPatientsData(prev => ({
            ...prev,
            [currentPatient.id]: editedPatient
        }));
        setCurrentPatient(editedPatient);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedPatient(null);
        setIsEditing(false);
    };
    if (!currentPatient) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <p className="text-lg text-gray-600">Loading patient data...</p>
                </div>
            </div>
        );
    }

    const handleInputChange = (field, value) => {
        setEditedPatient(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleEmergencyContactChange = (field, value) => {
        setEditedPatient(prev => ({
            ...prev,
            emergencyContact: {
                ...prev.emergencyContact,
                [field]: value
            }
        }));
    };

    const handleMedicalHistoryChange = (index, value) => {
        setEditedPatient(prev => ({
            ...prev,
            medicalHistory: prev.medicalHistory.map((item, i) => 
                i === index ? value : item
            )
        }));
    };

    const addMedicalHistory = () => {
        setEditedPatient(prev => ({
            ...prev,
            medicalHistory: [...prev.medicalHistory, ""]
        }));
    };

    const removeMedicalHistory = (index) => {
        setEditedPatient(prev => ({
            ...prev,
            medicalHistory: prev.medicalHistory.filter((_, i) => i !== index)
        }));
    };

    // ... (keep existing handler functions)

    const patient = isEditing ? editedPatient : currentPatient;
    
    if (!patient) {
        return <div>Patient not found</div>;
    }

    const containerClasses = isModal
        ? "bg-gray-100"
        : "min-h-screen bg-gray-100 py-8";

    const EditableField = ({ label, value, onChange, type = "text" }) => (
        <div className="mb-4">
            <label className="text-sm text-gray-500">{label}</label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full p-2 mt-1 border rounded focus:ring-2 focus:ring-green-500 outline-none"
            />
        </div>
    );


    return (
        <div>
            {/* Only show navigation when not in modal mode */}
            {!isModal && (
                <nav className="bg-white shadow-sm px-8 py-4 h-20 flex justify-between items-center">
                    <div className="font-bold text-gray-800">
                        <img src="/logo1.png" alt="logo" className='h-32 w-32' />
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleNotification}
                            className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                            <Bell className="w-6 h-6 text-gray-600" />
                        </button>
                        <button
                            onClick={handleSetting}
                            className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                            <Settings className="w-6 h-6 text-gray-600" />
                        </button>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            Logout
                        </button>
                    </div>
                </nav>
            )}
            <div className={containerClasses}>
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-lg shadow-xl">
                        <div className="bg-green-600 h-32 relative">
                            {!isEditing ? (
                                <button
                                    onClick={handleEdit}
                                    className="absolute top-4 right-4 bg-white p-2 rounded-full hover:bg-gray-100"
                                >
                                    <Edit2 className="w-5 h-5 text-green-600" />
                                </button>
                            ) : (
                                <div className="absolute top-4 right-4 flex gap-2">
                                    <button
                                        onClick={handleSave}
                                        className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600"
                                    >
                                        <Save className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        className="bg-white p-2 rounded-full hover:bg-gray-100"
                                    >
                                        <XCircle className="w-5 h-5 text-red-500" />
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="relative px-6 pb-6">
                            <div className="absolute -top-16">
                                <label htmlFor="profileImageInput" className="cursor-pointer">
                                    <img
                                        src={profileImage}
                                        alt="Patient profile"
                                        className="w-32 h-32 rounded-full border-4 border-white bg-gray-200"
                                    />
                                    <input
                                        type="file"
                                        id="profileImageInput"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                            <div className="pt-20">
                                {isEditing ? (
                                    <EditableField
                                        label="Name"
                                        value={patient.name}
                                        onChange={(value) => handleInputChange('name', value)}
                                    />
                                ) : (
                                    <h1 className="text-3xl font-bold text-gray-900">{patient.name}</h1>
                                )}
                                <p className="text-gray-600 flex items-center gap-2 mt-1">
                                    <User className="w-5 h-5" />
                                    Patient ID: {patient.id}
                                </p>
                            </div>
                        </div>

                        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="md:col-span-2 space-y-6">
                                <div className="bg-white rounded-lg shadow p-6">
                                    <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                                    {isEditing ? (
                                        <div className="grid grid-cols-2 gap-4">
                                            <EditableField
                                                label="Age"
                                                value={patient.age}
                                                onChange={(value) => handleInputChange('age', value)}
                                                type="number"
                                            />
                                            <EditableField
                                                label="Gender"
                                                value={patient.gender}
                                                onChange={(value) => handleInputChange('gender', value)}
                                            />
                                            <EditableField
                                                label="Blood Type"
                                                value={patient.bloodType}
                                                onChange={(value) => handleInputChange('bloodType', value)}
                                            />
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm text-gray-500">Age</p>
                                                <p className="text-gray-900">{patient.age} years</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Gender</p>
                                                <p className="text-gray-900">{patient.gender}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Blood Type</p>
                                                <p className="text-gray-900">{patient.bloodType}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="bg-white rounded-lg shadow p-6">
                                    <h2 className="text-xl font-semibold mb-4">Medical History</h2>
                                    {isEditing ? (
                                        <div className="space-y-2">
                                            {patient.medicalHistory.map((item, index) => (
                                                <div key={index} className="flex items-center gap-2">
                                                    <input
                                                        type="text"
                                                        value={item}
                                                        onChange={(e) => handleMedicalHistoryChange(index, e.target.value)}
                                                        className="flex-1 p-2 border rounded focus:ring-2 focus:ring-green-500 outline-none"
                                                    />
                                                    <button
                                                        onClick={() => removeMedicalHistory(index)}
                                                        className="p-2 text-red-500 hover:bg-red-50 rounded"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ))}
                                            <button
                                                onClick={addMedicalHistory}
                                                className="mt-2 text-green-600 hover:text-green-700"
                                            >
                                                + Add Medical History
                                            </button>
                                        </div>
                                    ) : (
                                        <ul className="space-y-2">
                                            {patient.medicalHistory.map((item, index) => (
                                                <li key={index} className="flex items-center gap-2">
                                                    <Activity className="w-4 h-4 text-green-600" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>

                                <div className="bg-white rounded-lg shadow p-6">
                                    <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
                                    {patient.upcomingAppointments.map((appointment, index) => (
                                        <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                                            <Calendar className="w-5 h-5 text-green-600" />
                                            <div>
                                                <p className="font-medium">{appointment.date} at {appointment.time}</p>
                                                <p className="text-gray-600">{appointment.doctor} - {appointment.department}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-white rounded-lg shadow p-6">
                                    <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                                    {isEditing ? (
                                        <div className="space-y-4">
                                            <EditableField
                                                label="Phone"
                                                value={patient.phone}
                                                onChange={(value) => handleInputChange('phone', value)}
                                            />
                                            <EditableField
                                                label="Email"
                                                value={patient.email}
                                                onChange={(value) => handleInputChange('email', value)}
                                                type="email"
                                            />
                                            <EditableField
                                                label="Address"
                                                value={patient.address}
                                                onChange={(value) => handleInputChange('address', value)}
                                            />
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3">
                                                <Phone className="w-5 h-5 text-green-600" />
                                                <span>{patient.phone}</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Mail className="w-5 h-5 text-green-600" />
                                                <span>{patient.email}</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <MapPin className="w-5 h-5 text-green-600" />
                                                <span>{patient.address}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="bg-white rounded-lg shadow p-6">
                                    <h2 className="text-xl font-semibold mb-4">Emergency Contact</h2>
                                    {isEditing ? (
                                        <div className="space-y-4">
                                            <EditableField
                                                label="Name"
                                                value={patient.emergencyContact.name}
                                                onChange={(value) => handleEmergencyContactChange('name', value)}
                                            />
                                            <EditableField
                                                label="Relation"
                                                value={patient.emergencyContact.relation}
                                                onChange={(value) => handleEmergencyContactChange('relation', value)}
                                            />
                                            <EditableField
                                                label="Phone"
                                                value={patient.emergencyContact.phone}
                                                onChange={(value) => handleEmergencyContactChange('phone', value)}
                                            />
                                        </div>
                                    ) : (
                                        <>
                                            <p className="font-medium">{patient.emergencyContact.name} - {patient.emergencyContact.relation}</p>
                                            <div className="flex items-center gap-3">
                                                <Phone className="w-5 h-5 text-green-600" />
                                                <span>{patient.emergencyContact.phone}</span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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

export default EditablePatient;