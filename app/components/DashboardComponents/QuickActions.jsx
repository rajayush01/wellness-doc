import React from 'react';
import { Users, Calendar, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QuickActions = () => {
    const navigate = useNavigate();

    const handleAction = (action) => {
        switch(action) {
            case 'patients':
                navigate('/patients');
                break;
            case 'schedule':
                navigate('/schedule');
                break;
            case 'reports':
                navigate('/reports');
                break;
            default:
                break;
        }
    };

    return (
        <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
                <h2 className="text-xl font-semibold">Quick Actions</h2>
            </div>
            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button 
                        onClick={() => handleAction('patients')}
                        className="p-4 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 flex items-center gap-2"
                    >
                        <Users className="w-5 h-5" />
                        View All Patients
                    </button>
                    <button 
                        onClick={() => handleAction('schedule')}
                        className="p-4 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 flex items-center gap-2"
                    >
                        <Calendar className="w-5 h-5" />
                        Schedule Appointment
                    </button>
                    <button 
                        onClick={() => handleAction('reports')}
                        className="p-4 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 flex items-center gap-2"
                    >
                        <FileText className="w-5 h-5" />
                        Create Report
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QuickActions;