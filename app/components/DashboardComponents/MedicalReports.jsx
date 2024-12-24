import React, { useState } from 'react';
import { Calendar, Clock, UserCog, MessageSquare, ClipboardList, FileText, Settings,Shield, LogOut, Bell, Search, Plus, X, Check, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MedicalReports = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState([
    { id: 1, title: "Blood Test Results", date: "2024-10-20", status: "final", file: null },
    { id: 2, title: "X-Ray Report", date: "2024-10-18", status: "pending", file: null }
  ]);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [viewingReport, setViewingReport] = useState(null);
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

  const handleNotification = () => {
    navigate('/notification');
  };

  const handleSetting = () => {
    navigate('/setting');
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setUploadStatus('');
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      setUploadStatus('Please select a file first');
      return;
    }

    const newReport = {
      id: reports.length + 1,
      title: selectedFile.name,
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
      file: URL.createObjectURL(selectedFile)
    };

    setReports([...reports, newReport]);
    setSelectedFile(null);
    setUploadStatus('File uploaded successfully!');
    setTimeout(() => {
      setIsUploadOpen(false);
      setUploadStatus('');
    }, 1500);
  };

  const handleViewReport = (report) => {
    setViewingReport(report);
  };

  const toggleChat = () => {
    setIsChatOpen(prev => !prev);
};

  return (
    <div>
      <nav className="bg-white shadow-sm px-8 py-4 h-20 flex justify-between items-center">
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
      <div className="flex justify-center items-center mt-6">
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-2xl border-t">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Medical Reports
            </h2>
            <button 
              onClick={() => setIsUploadOpen(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-600"
            >
              <Plus className="h-4 w-4" />
              Upload Report
            </button>
          </div>
          <div className="space-y-4">
            {reports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{report.title}</p>
                  <p className="text-sm text-gray-600">{report.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 text-xs rounded ${
                    report.status === 'final' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {report.status.toUpperCase()}
                  </span>
                  <button 
                    onClick={() => handleViewReport(report)} 
                    className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100"
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isUploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsUploadOpen(false)}
          ></div>
          
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4 z-50">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Upload Medical Report</h3>
              <button 
                onClick={() => setIsUploadOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              <div 
                className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files[0];
                  if (file) {
                    setSelectedFile(file);
                    setUploadStatus('');
                  }
                }}
              >
                <input
                  type="file"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center space-y-2"
                >
                  <div className="p-3 bg-blue-50 rounded-full">
                    <FileText className="h-6 w-6 text-blue-500" />
                  </div>
                  <span className="text-sm font-medium text-center">
                    {selectedFile ? selectedFile.name : 'Click to upload or drag and drop'}
                  </span>
                  <span className="text-xs text-gray-500 text-center">
                    PDF, DOC, DOCX, JPG, JPEG, PNG (max. 10MB)
                  </span>
                </label>
              </div>
              
              {uploadStatus && (
                <p className={`text-sm text-center ${
                  uploadStatus.includes('success') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {uploadStatus}
                </p>
              )}
            </div>
            
            <div className="flex justify-end gap-2 p-4 border-t bg-gray-50">
              <button
                onClick={() => setIsUploadOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                disabled={!selectedFile}
                className={`px-4 py-2 text-sm font-medium text-white rounded-md ${
                  selectedFile 
                    ? 'bg-blue-500 hover:bg-blue-600' 
                    : 'bg-blue-300 cursor-not-allowed'
                }`}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}

      {viewingReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setViewingReport(null)}
          ></div>
          
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4 z-50 p-6">
            <h3 className="text-lg font-semibold mb-4">Viewing: {viewingReport.title}</h3>
            {viewingReport.file && (
              <iframe 
                src={viewingReport.file} 
                className="w-full h-96 border rounded-md" 
                title="Report Viewer"
              ></iframe>
            )}
            <button 
              onClick={() => setViewingReport(null)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

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

export default MedicalReports;
