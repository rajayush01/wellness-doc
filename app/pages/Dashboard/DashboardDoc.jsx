import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, UserCog, MessageSquare, ClipboardList, Bell, Settings, LogOut, X, Shield, User } from 'lucide-react';
import StatsGrid from '@/app/components/DashboardComponents/StatsGrid';
import AppointmentList from '@/app/components/DashboardComponents/AppointmentList';
import QuickActions from '@/app/components/DashboardComponents/QuickActions';

const DashboardDoc = () => {
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


    const handleLogout = () => {
        navigate('/login');
    };


    const toggleChat = () => {
        setIsChatOpen(prev => !prev);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top Navigation Bar */}
            <nav className="bg-white shadow-sm px-8 py-4 h-20 flex justify-between items-center">
                <div className="font-bold text-gray-800">
                    <img src="/logo1.png" alt="logo" className='h-32 w-32' />
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

            {/* Main Content */}
            <div className="p-8">
                <StatsGrid />
                <AppointmentList />
                <QuickActions />
            </div>

            {/* Chat Interface */}
            <div
                className={`fixed bottom-24 right-5 transform transition-all duration-300 ease-in-out ${isChatOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 pointer-events-none'
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
                <div className={`absolute -top-12 right-0 transform transition-all duration-300 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
                    }`}>
                    <div className="bg-black text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap">
                        Chat with Medical Assistant
                    </div>
                </div>
                <button
                    onClick={toggleChat}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className={`group relative bg-transparent border-2 border-black p-2 rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 ${isChatOpen ? 'rotate-0' : 'hover:scale-110'
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

export default DashboardDoc;