import React, { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const DashboardCalendar = ({ appointments = [] }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };

    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };

    // Check if a date has appointments
    const hasAppointments = (date) => {
        return appointments.some(appt => {
            const apptDate = new Date(appt.date);
            return isSameDay(date, apptDate);
        });
    };

    // Get appointments for a specific date
    const getAppointmentsForDate = (date) => {
        return appointments.filter(appt => {
            const apptDate = new Date(appt.date);
            return isSameDay(date, apptDate);
        });
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Date</h3>
                <div className="flex items-center space-x-2">
                    <button 
                        onClick={prevMonth}
                        className="p-1 hover:bg-gray-100 rounded transition"
                    >
                        <ChevronLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <button 
                        onClick={nextMonth}
                        className="p-1 hover:bg-gray-100 rounded transition"
                    >
                        <ChevronRight className="w-5 h-5 text-gray-600" />
                    </button>
                </div>
            </div>
        );
    };

    const renderDays = () => {
        const dateFormat = "EEE";
        const days = [];

        for (let i = 0; i < 7; i++) {
            days.push(
                <div
                    className="text-center text-sm text-gray-500 p-2"
                    key={i}
                >
                    {format(addDays(startOfWeek(currentMonth), i), dateFormat)}
                </div>
            );
        }

        return <div className="grid grid-cols-7 mb-2">{days}</div>;
    };

    const renderCells = () => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);
        const dateFormat = "d";
        const rows = [];

        let days = [];
        let day = startDate;

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                const formattedDate = format(day, dateFormat);
                const cloneDay = day;
                const isToday = isSameDay(day, new Date());
                const isSelected = isSameDay(day, selectedDate);
                const isCurrentMonth = isSameMonth(day, monthStart);
                const hasAppt = hasAppointments(day);

                days.push(
                    <button
                        key={day}
                        className={`relative p-2 w-full h-full rounded-lg transition-all duration-200 ${
                            !isCurrentMonth 
                                ? "text-gray-400" 
                                : isSelected
                                    ? "bg-blue-600 text-white"
                                    : isToday
                                        ? "bg-blue-50 text-blue-600"
                                        : "text-gray-700 hover:bg-gray-100"
                        }`}
                        onClick={() => setSelectedDate(cloneDay)}
                    >
                        {formattedDate}
                        {hasAppt && (
                            <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-blue-600"></span>
                        )}
                    </button>
                );
                day = addDays(day, 1);
            }
            rows.push(
                <div className="grid grid-cols-7 gap-1" key={day}>
                    {days}
                </div>
            );
            days = [];
        }
        return <div className="space-y-1">{rows}</div>;
    };

    const renderSelectedAppointment = () => {
        const appointments = getAppointmentsForDate(selectedDate);
        if (appointments.length === 0) return null;

        const appointment = appointments[0];
        return (
            <div className="mt-4 bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-blue-600 font-medium">
                            {format(selectedDate, 'EEE')}
                        </p>
                        <p className="text-xl font-bold text-blue-800">
                            {format(selectedDate, 'd')}
                        </p>
                    </div>
                    <div>
                        <p className="font-medium">Dr. {appointment.doctor}</p>
                        <p className="text-sm text-gray-600">{appointment.specialization}</p>
                        <p className="text-sm text-gray-600">{appointment.time}</p>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            {renderHeader()}
            <h4 className="font-medium mb-4 text-center">{format(currentMonth, 'MMMM yyyy')}</h4>
            {renderDays()}
            {renderCells()}
            {renderSelectedAppointment()}
        </div>
    );
};

export default DashboardCalendar;