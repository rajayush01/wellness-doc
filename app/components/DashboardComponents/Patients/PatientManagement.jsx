import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import PatientList from './PatientList';
import AddPatientModal from './AddPatientModal';
import PatientDetails from './PatientDetails';

const PatientManagement = () => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPatient, setSelectedPatient] = useState(null);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Patient Management</h1>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    <Plus className="w-4 h-4" />
                    Add New Patient
                </button>
            </div>

            <div className="mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search patients..."
                        className="w-full pl-10 pr-4 py-2 border rounded-lg"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
            </div>

            <PatientList 
                searchTerm={searchTerm}
                onPatientSelect={setSelectedPatient}
            />

            {showAddModal && (
                <AddPatientModal onClose={() => setShowAddModal(false)} />
            )}

            {selectedPatient && (
                <PatientDetails 
                    patient={selectedPatient}
                    onClose={() => setSelectedPatient(null)}
                />
            )}
        </div>
    );
};

export default PatientManagement;