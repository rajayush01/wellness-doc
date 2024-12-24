import React from 'react';
import { useNavigate } from 'react-router-dom';

const AppointmentDetailsModal = ({ appointment, onClose, onDownloadReport }) => {
  const navigate = useNavigate();

  const handleDoctorClick = () => {
    onClose();
    navigate(`/docpro/${appointment.id}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm transition-opacity duration-300">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8 transform transition-transform duration-300 scale-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Appointment Details</h3>
          <button
            className="text-gray-400 hover:text-red-500 focus:outline-none transition-colors duration-200"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <img
              src={appointment.image}
              alt={appointment.doctor}
              className="w-14 h-14 rounded-full shadow-md"
            />
            <div>
              <button
                onClick={handleDoctorClick}
                className="font-semibold text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200 focus:outline-none"
              >
                {appointment.doctor}
              </button>
              <p className="text-gray-500">{appointment.specialization}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-6">
            <div>
              <p className="text-gray-500">Date</p>
              <p className="font-medium text-gray-900">{appointment.date}</p>
            </div>
            <div>
              <p className="text-gray-500">Time</p>
              <p className="font-medium text-gray-900">{appointment.time}</p>
            </div>
          </div>
          <div>
            <p className="text-gray-500">Status</p>
            <span
              className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${getStatusColor(
                appointment.status
              )}`}
            >
              {appointment.status}
            </span>
          </div>
          {appointment.status !== 'Upcoming' && (
            <div>
              <p className="text-gray-500">Report</p>
              {appointment.report ? (
                <button
                  className="text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200 focus:outline-none"
                  onClick={() => onDownloadReport(appointment.report)}
                >
                  Download
                </button>
              ) : (
                <p className="text-gray-400 italic">No report available</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'active':
      return 'bg-green-200 text-green-800';
    case 'upcoming':
      return 'bg-blue-200 text-blue-800';
    case 'completed':
      return 'bg-gray-200 text-gray-700';
    default:
      return 'bg-gray-200 text-gray-700';
  }
};

export default AppointmentDetailsModal;
