import React, { useState } from 'react';
import { Calendar, Grid, FileText, Settings, LogOut, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FaBell, FaLock, FaShieldAlt, FaUser } from "react-icons/fa";

const ReportPage = () => {
    const navigate = useNavigate();
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null);
    const [activeSection, setActiveSection] = useState('reports');

    const reports = [
        { id: 1, doctor: 'Dr. Smith', date: '2024-10-15', summary: 'Blood Test', status: 'Complete', department: 'Hematology' },
        { id: 2, doctor: 'Dr. Johnson', date: '2024-09-20', summary: 'X-Ray', status: 'Pending', department: 'Radiology' },
        { id: 3, doctor: 'Dr. Allen', date: '2024-08-05', summary: 'MRI Scan', status: 'Complete', department: 'Neurology' },
    ];

    const handlePreview = (report) => setSelectedReport(report);
    const handleDownload = () => alert('Downloading report...');
    const handlePrint = () => window.print();
    const handleCloseModal = () => setSelectedReport(null);
    
    const handleNavigate = (section, customAction) => {
        setActiveSection(section);
        if (customAction) {
            customAction();
        }
    };

    const toggleChat = () => {
        setIsChatOpen(prev => !prev);
    };

    const handleOverview = () => {
        navigate('/dashboard?userType=patient');
    };

    const handleAppointment = () => {
        navigate('/appointment')
    }
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

    const navItems = [
        { 
            icon: Grid, 
            label: 'Overview', 
            id: 'overview', 
            action: handleOverview 
        },
        { 
            icon: Calendar, 
            label: 'Appointments', 
            id: 'appointments', 
            action: handleAppointment
        },
        { 
            icon: FileText, 
            label: 'Reports', 
            id: 'reports', 
            action: null 
        },
        { 
            icon: Settings, 
            label: 'Settings', 
            id: 'settings', 
            action: toggleSettingsDropdown 
        },
    ];

    

    return (
        <div className="flex min-h-screen bg-gray-50 text-gray-800">
            <aside className="w-72 bg-white shadow-lg border-r border-gray-200 p-6 flex flex-col">
                <div className="flex items-center mb-12">
                    <img src="/logo1.png" alt="logo" className="h-42 -mt-20 -mb-20 -ml-5" />
                </div>
                <nav className="space-y-2">
                    {navItems.map(({ icon: Icon, label, id, action }) => (
                        <button
                            key={id}
                            onClick={() => handleNavigate(id, action)}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                                activeSection === id
                                    ? 'bg-blue-500 text-white shadow-md'
                                    : 'text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            <Icon className="w-5 h-5" />
                            <span className="font-medium">{label}</span>
                        </button>
                    ))}
                </nav>
                <div className="mt-auto">
                    <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-red-50 transition-colors duration-200">
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Log out</span>
                    </button>
                </div>
            </aside>

            {/* Main content - enhanced with better visual hierarchy */}
            <main className="flex-1 p-10 space-y-8">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Patient Reports</h1>
                    <p className="text-gray-500 mb-8">View and manage your medical reports</p>
                    
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-100">
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 bg-gray-300">Doctor</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 bg-gray-300">Department</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 bg-gray-300">Date</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 bg-gray-300">Summary</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 bg-gray-300">Status</th>
                                        <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900 bg-gray-300">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {reports.map((report) => (
                                        <tr key={report.id} className="hover:bg-gray-100 transition-colors duration-200">
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-gray-900">{report.doctor}</div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-700">{report.department}</td>
                                            <td className="px-6 py-4 text-gray-700">{report.date}</td>
                                            <td className="px-6 py-4 text-gray-700">{report.summary}</td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                                    ${report.status === 'Complete' 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                    {report.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                {report.status === 'Complete' ? (
                                                    <button
                                                        onClick={() => handlePreview(report)}
                                                        className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 transition-colors duration-200"
                                                    >
                                                        Preview
                                                    </button>
                                                ) : (
                                                    <span className="text-gray-400 text-sm mx-5">Pending...</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Enhanced Modal */}
                {selectedReport && (
                    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50 p-4">
                        <div className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-xl relative animate-fade-in">
                            <button
                                onClick={handleCloseModal}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                            >
                                <span className="text-2xl">×</span>
                            </button>
                            
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Report Details</h2>
                                <p className="text-gray-500 text-sm">Review your medical report information</p>
                            </div>

                            <div className="space-y-4 mb-8">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">Doctor</label>
                                        <p className="text-gray-900">{selectedReport.doctor}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">Department</label>
                                        <p className="text-gray-900">{selectedReport.department}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">Date</label>
                                        <p className="text-gray-900">{selectedReport.date}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">Summary</label>
                                        <p className="text-gray-900">{selectedReport.summary}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end space-x-4">
                                <button
                                    onClick={handleDownload}
                                    className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-green-500 hover:bg-green-600 transition-colors duration-200"
                                >
                                    Download Report
                                </button>
                                <button
                                    onClick={handlePrint}
                                    className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 transition-colors duration-200"
                                >
                                    Print Report
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
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

export default ReportPage;