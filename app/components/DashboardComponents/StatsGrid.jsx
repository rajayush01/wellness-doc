import React from 'react';
import { Users, Calendar, FileText, Activity } from 'lucide-react';

const StatsGrid = () => {
    const stats = [
        { title: "Total Patients", value: "128", icon: Users, color: "text-blue-600" },
        { title: "Today's Appointments", value: "8", icon: Calendar, color: "text-green-600" },
        { title: "Pending Reports", value: "5", icon: FileText, color: "text-yellow-600" },
        { title: "Average Daily Patients", value: "12", icon: Activity, color: "text-purple-600" },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6">
                    <div className="flex items-center">
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                            <p className="text-2xl font-bold mt-2">{stat.value}</p>
                        </div>
                        <stat.icon className={`w-8 h-8 ${stat.color}`} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StatsGrid;