import React, { useState } from 'react';
import { Clock, X } from 'lucide-react';
import PatientProfile from '../../pages/Profile/PatientProfile';
import { useNavigate } from 'react-router-dom';

const AppointmentList = () => {
    const navigate = useNavigate();
    const [appointments] = useState([
        { id: 1, patientId: 'P-12345', patient: "John Doe", time: "09:00 AM", type: "Check-up" },
        { id: 2, patientId: 'P-12346', patient: "Jane Smith", time: "10:30 AM", type: "Follow-up" },
        { id: 3, patientId: 'P-12347', patient: "Mike Johnson", time: "02:00 PM", type: "Consultation" }
    ]);
    const [showDiagnoseModal, setShowDiagnoseModal] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [selectedPatientId, setSelectedPatientId] = useState(null);

    const handleViewDetails = (patientId) => {
        setSelectedPatientId(patientId);
        setShowProfileModal(true);
    };

    const handleVideo = () =>{
        navigate('/video');
         alert('Starting Video Call...');

    }

    const handleDiagnoseClick = () => {
        setShowDiagnoseModal(true);
    };

    const closeDiagnoseModal = () => {
        setShowDiagnoseModal(false);
    };

    const closeProfileModal = () => {
        setShowProfileModal(false);
        setSelectedPatientId(null);
    };

    return (
        <>
            <div className="bg-white rounded-lg shadow mb-8">
                <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <Clock className="w-5 h-5 text-gray-600" />
                        Today&apos;s Schedule
                    </h2>
                </div>
                <div className="p-6">
                    <div className="divide-y">
                        {appointments.map((appointment) => (
                            <div key={appointment.id} className="py-4 flex justify-between items-center">
                                <div>
                                    <p className="font-medium">{appointment.patient}</p>
                                    <p className="text-sm text-gray-600">{appointment.type}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-sm text-gray-600">{appointment.time}</span>
                                    <button
                                        onClick={() => handleViewDetails(appointment.patientId)}
                                        className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200"
                                    >
                                        View Details
                                    </button>
                                    <button
                                        onClick={handleDiagnoseClick}
                                        className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200"
                                    >
                                        Online Diagnose
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Patient Profile Modal */}
            {showProfileModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative">
                        <button
                            onClick={closeProfileModal}
                            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full z-10"
                        >
                            <X className="w-6 h-6 text-white-500 hover:text-gray-500" />
                        </button>
                        <div className="modal-content">
                            <PatientProfile id={selectedPatientId} isModal={true} />
                        </div>
                    </div>
                </div>
            )}

            {/* Diagnose Modal */}
            {showDiagnoseModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-xl shadow-lg w-80 flex flex-col justify-center items-center text-center">
                        <h3 className="text-xl font-semibold mb-6 text-gray-800">Select Diagnose Option</h3>

                        <div className="flex gap-4 w-full">
                            <button
                                className="w-full px-4 py-2 border-2 border-blue-500 text-blue-500 rounded-lg font-medium transition duration-300 ease-in-out transform hover:bg-blue-500 hover:text-white hover:scale-105"
                                onClick={handleVideo}
                            >
                                Video Call
                            </button>
                            <button
                                className="w-full px-4 py-2 border-2 border-green-500 text-green-500 rounded-lg font-medium transition duration-300 ease-in-out transform hover:bg-green-500 hover:text-white hover:scale-105"
                                onClick={() => alert('Starting Online Chat...')}
                            >
                                Online Chat
                            </button>
                        </div>

                        <button
                            className="w-full mt-6 px-4 py-2 text-sm border-2 border-black text-gray-500 hover:text-gray-700 transition duration-200"
                            onClick={closeDiagnoseModal}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default AppointmentList;