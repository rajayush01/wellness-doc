import React, { useState } from 'react';
import { Calendar, Clock, FileText, Settings, Bell, Search, Plus, X, Check, User } from 'lucide-react';

const NotificationSystem = () => {
    const [notifications, setNotifications] = useState([
      { id: 1, message: "Appointment reminder: Dr. Smith tomorrow at 10:00 AM", type: "reminder", isRead: false },
      { id: 2, message: "New test results available", type: "alert", isRead: false },
      { id: 3, message: "Prescription refill needed", type: "warning", isRead: true }
    ]);
  
    return (
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </h2>
          <button className="text-blue-500 hover:text-blue-600">
            Mark all as read
          </button>
        </div>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`p-4 rounded-lg flex items-start justify-between ${
                notification.isRead ? 'bg-gray-50' : 'bg-blue-50'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`mt-1 w-2 h-2 rounded-full ${
                  notification.type === 'reminder' ? 'bg-blue-500' :
                  notification.type === 'alert' ? 'bg-yellow-500' : 'bg-red-500'
                }`} />
                <p className={`${notification.isRead ? 'text-gray-600' : 'text-gray-900'}`}>
                  {notification.message}
                </p>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  export default NotificationSystem;