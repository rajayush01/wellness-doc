import React, { useState } from 'react';
import { Calendar, Clock, FileText, Settings, Bell, Search, Plus, X, Check, User } from 'lucide-react';

const PatientDetails = () => {
    const patientInfo = {
      name: "John Doe",
      age: 45,
      gender: "Male",
      bloodType: "O+",
      allergies: ["Penicillin", "Peanuts"],
      conditions: ["Hypertension", "Diabetes Type 2"]
    };
  
    return (
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <User className="h-5 w-5" />
            Patient Details
          </h2>
          <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100">
            Edit
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Name</p>
            <p className="font-medium">{patientInfo.name}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Age</p>
            <p className="font-medium">{patientInfo.age}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Gender</p>
            <p className="font-medium">{patientInfo.gender}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Blood Type</p>
            <p className="font-medium">{patientInfo.bloodType}</p>
          </div>
          <div className="col-span-2 space-y-2">
            <p className="text-sm text-gray-600">Allergies</p>
            <div className="flex gap-2 flex-wrap">
              {patientInfo.allergies.map((allergy) => (
                <span key={allergy} className="px-2 py-1 bg-red-100 text-red-800 rounded text-sm">
                  {allergy}
                </span>
              ))}
            </div>
          </div>
          <div className="col-span-2 space-y-2">
            <p className="text-sm text-gray-600">Medical Conditions</p>
            <div className="flex gap-2 flex-wrap">
              {patientInfo.conditions.map((condition) => (
                <span key={condition} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                  {condition}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default PatientDetails;