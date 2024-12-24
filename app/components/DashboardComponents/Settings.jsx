import React, { useState } from 'react';
import { Calendar, Clock, FileText, Settings, Bell, Search, Plus, X, Check, User } from 'lucide-react';

const SettingsComponent = () => {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-2xl">
        <h2 className="text-xl font-semibold flex items-center gap-2 mb-6">
          <Settings className="h-5 w-5" />
          Settings
        </h2>
        <div className="space-y-6">
          <div className="space-y-3">
            <h3 className="font-medium text-lg">Notifications</h3>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span>Email Notifications</span>
              <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100">
                Configure
              </button>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span>SMS Alerts</span>
              <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100">
                Configure
              </button>
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="font-medium text-lg">Privacy</h3>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span>Data Sharing Preferences</span>
              <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100">
                Manage
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default SettingsComponent;