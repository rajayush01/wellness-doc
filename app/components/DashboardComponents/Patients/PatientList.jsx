import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar,UserCog, Edit,MessageSquare,ClipboardList,Shield,User, Trash, Eye, X } from 'lucide-react';
import { Bell, Settings, LogOut } from 'lucide-react';

const PatientList = ({ searchTerm = '', onPatientSelect = () => { } }) => {
    const navigate = useNavigate();
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
    const [patients, setPatients] = useState([
        {
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
            lastVisit: "2024-03-20",
            upcomingAppointments: [
                {
                    date: "Oct 30, 2024",
                    time: "09:00 AM",
                    doctor: "Dr. Michael Brown",
                    department: "Internal Medicine"
                }
            ]
        },
        {
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
                "Allergic to Penicillin"
            ],
            lastVisit: "2024-03-15",
            upcomingAppointments: [
                {
                    date: "Oct 30, 2024",
                    time: "10:30 AM",
                    doctor: "Dr. Sarah Wilson",
                    department: "Pulmonology"
                }
            ]
        },
        {
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
            lastVisit: "2024-03-18",
            upcomingAppointments: [
                {
                    date: "Oct 30, 2024",
                    time: "02:00 PM",
                    doctor: "Dr. James Lee",
                    department: "Orthopedics"
                }
            ]
        },
        {
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
            lastVisit: "2024-03-20",
            upcomingAppointments: [
                {
                    date: "Oct 30, 2024",
                    time: "09:00 AM",
                    doctor: "Dr. Michael Brown",
                    department: "Internal Medicine"
                }
            ]
        },
        {
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
                "Allergic to Penicillin"
            ],
            lastVisit: "2024-03-15",
            upcomingAppointments: [
                {
                    date: "Oct 30, 2024",
                    time: "10:30 AM",
                    doctor: "Dr. Sarah Wilson",
                    department: "Pulmonology"
                }
            ]
        },
        {
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
            lastVisit: "2024-03-18",
            upcomingAppointments: [
                {
                    date: "Oct 30, 2024",
                    time: "02:00 PM",
                    doctor: "Dr. James Lee",
                    department: "Orthopedics"
                }
            ]
        }
    ]);

    const [selectedPatient, setSelectedPatient] = useState(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [isCommentOpen, setIsCommentOpen] = useState(false);
    const [selectedPatientId, setSelectedPatientId] = useState(null);
    const [comment, setComment] = useState('');
    
    const textareaRef = useRef(null);

    const filteredPatients = patients.filter(patient =>
        patient.name.toLowerCase().includes((searchTerm || '').toLowerCase())
    );

    const handleSubmit = (patientId) => {
        navigate(`/patpro/${patientId}`);
    };

    const toggleChat = () => {
        setIsChatOpen(prev => !prev);
    };

    const handleEdit = (patientId) => {
        setSelectedPatientId(patientId);
        setIsCommentOpen(true);
    };

    const handleCommentSubmit = () => {
        console.log(`Comment for patient ${selectedPatientId}:`, comment);
        setComment('');
        setIsCommentOpen(false);
        setSelectedPatientId(null);
    };

    const handleLogout = () => navigate('/login');
    const handleNotification = () => navigate('/notification');
    const handleSetting = () => navigate('/setting');

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this patient?')) {
            setPatients(patients.filter(patient => patient.id !== id));
        }
    };

    const handlePatientSelect = (patient) => {
        setSelectedPatient(patient);
        setIsDetailsOpen(true);
        if (typeof onPatientSelect === 'function') onPatientSelect(patient);
    };

    const CommentModal = ({ onClose }) => {
        useEffect(() => {
            if (textareaRef.current) {
                textareaRef.current.focus();
            }
        }, []);

        const handleTextAreaChange = (e) => {
            e.preventDefault();
            setComment(e.target.value);
        };

        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                handleCommentSubmit();
            }
            if (e.key === 'Escape') {
                onClose();
            }
        };

        return (
            <div 
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                onClick={(e) => {
                    if (e.target === e.currentTarget) {
                        onClose();
                    }
                }}
            >
                <div className="bg-white rounded-lg p-6 max-w-xl w-full mx-4 shadow-2xl">
                    <div className="flex justify-between items-start mb-4">
                        <h2 className="text-2xl font-semibold text-indigo-600">Add Comment</h2>
                        <button 
                            onClick={onClose} 
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    <textarea
                        ref={textareaRef}
                        value={comment}
                        onChange={handleTextAreaChange}
                        onKeyDown={handleKeyDown}
                        className="w-full h-32 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Write your comment here..."
                    />
                    <div className="flex justify-end mt-4 gap-2">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleCommentSubmit}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    const PatientDetails = ({ patient, onClose }) => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 shadow-2xl">
                <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-semibold text-indigo-600">Patient Details</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-sm text-gray-500">Name</h3>
                        <p className="text-lg font-semibold text-gray-800">{patient.name}</p>
                    </div>
                    <div>
                        <h3 className="text-sm text-gray-500">Age/Gender</h3>
                        <p className="text-lg font-semibold text-gray-800">{patient.age} / {patient.gender}</p>
                    </div>
                    <div>
                        <h3 className="text-sm text-gray-500">Blood Type</h3>
                        <p className="text-lg text-gray-800">{patient.bloodType}</p>
                    </div>
                    <div>
                        <h3 className="text-sm text-gray-500">Address</h3>
                        <p className="text-lg text-gray-800">{patient.address}</p>
                    </div>
                    <div>
                        <h3 className="text-sm text-gray-500">Contact</h3>
                        <p className="text-lg text-gray-800">{patient.phone}<br />{patient.email}</p>
                    </div>
                    <div>
                        <h3 className="text-sm text-gray-500">Last Visit</h3>
                        <p className="text-lg text-gray-800">{patient.lastVisit}</p>
                    </div>
                </div>
                <div className='flex justify-center items-center mt-6'>
                    <button 
                        onClick={() => {
                            onClose();
                            navigate(`/patpro/${patient.id}`);
                        }}
                        className='border-2 border-black p-2 rounded-xl hover:scale-95 transform duration-200 hover:bg-blue-500 hover:text-white'
                    >
                        See more Details
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <nav className="bg-white shadow-sm px-8 py-4 border-b-2 h-20 flex justify-between items-center">
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

            <div className="bg-white rounded-lg shadow-md overflow-hidden p-6 border border-gray-200 mt-6 mx-auto max-w-4xl">
                <table className="min-w-full divide-y divide-gray-200 text-gray-800">
                    <thead className="bg-indigo-50">
                        <tr>
                            {['Name', 'Age/Gender', 'Contact', 'Last Visit', 'Actions'].map((header) => (
                                <th key={header} className="px-6 py-3 text-left text-xs font-semibold text-indigo-600 uppercase tracking-wider">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredPatients.map((patient) => (
                            <tr key={patient.id} className="hover:bg-indigo-100 transition duration-150 ease-in-out">
                                <td className="px-6 py-4">
                                    <span className="text-sm font-medium text-gray-800">{patient.name}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-sm text-gray-600">{patient.age} / {patient.gender}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-sm text-gray-600">{patient.phone}<br />{patient.email}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-sm text-gray-600">{patient.lastVisit}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-3">
                                        <button onClick={() => handlePatientSelect(patient)} className="text-indigo-600 hover:text-indigo-800">
                                            <Eye className="w-5 h-5" />
                                        </button>
                                        <button 
                                            onClick={() => handleEdit(patient.id)}
                                            className="text-green-600 hover:text-green-800">
                                            <Edit className="w-5 h-5" />
                                        </button>
                                        <button onClick={() => handleDelete(patient.id)} className="text-red-600 hover:text-red-800">
                                            <Trash className="w-5 h-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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

            {isDetailsOpen && selectedPatient && (
                <PatientDetails patient={selectedPatient} onClose={() => setIsDetailsOpen(false)} />
            )}

            {isCommentOpen && (
                <CommentModal onClose={() => {
                    setIsCommentOpen(false);
                    setSelectedPatientId(null);
                    setComment('');
                }} />
            )}
        </>
    );
};

export default PatientList;