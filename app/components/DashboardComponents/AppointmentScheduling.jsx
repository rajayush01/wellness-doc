import React, { useState } from 'react';
import { Calendar, Clock, FileText, Settings, Bell, Search, Plus, LogOut, X, Check, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AppointmentModal = ({ isOpen, onClose, onSubmit, appointment = null }) => {
  const [formData, setFormData] = useState({
    patient: appointment?.patient || '',
    date: appointment?.date || '',
    time: appointment?.time || '',
    type: appointment?.type || 'Check-up'
  });

  React.useEffect(() => {
    if (appointment) {
      setFormData({
        patient: appointment.patient,
        date: appointment.date,
        time: appointment.time,
        type: appointment.type
      });
    }
  }, [appointment]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {appointment ? 'Reschedule Appointment' : 'New Appointment'}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Patient Name</label>
            <input
              type="text"
              value={formData.patient}
              onChange={(e) => setFormData({ ...formData, patient: e.target.value })}
              className="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Time</label>
            <input
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option>Check-up</option>
              <option>Follow-up</option>
              <option>Consultation</option>
              <option>Treatment</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              {appointment ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AppointmentScheduling = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([
    { id: 1, patient: "John Doe", date: "2024-10-25", time: "10:00", type: "Check-up" },
    { id: 2, patient: "Jane Smith", date: "2024-10-25", time: "11:30", type: "Follow-up" }
  ]);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const handleNewAppointment = (formData) => {
    const newAppointment = {
      id: appointments.length + 1,
      ...formData
    };
    setAppointments([...appointments, newAppointment]);
  };

  const handleReschedule = (formData) => {
    const updatedAppointments = appointments.map(apt =>
      apt.id === selectedAppointment.id ? { ...apt, ...formData } : apt
    );
    setAppointments(updatedAppointments);
    setSelectedAppointment(null); 
  };

  const handleCancel = (id) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      setAppointments(appointments.filter(apt => apt.id !== id));
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const handleNotification = () => {
    navigate('/notification');
  };

  const handleSetting = () => {
    navigate('/setting');
  };

  return (
    <div>
      <nav className="bg-white shadow-sm px-8 py-4 h-20 flex justify-between items-center">
        <div className="font-bold text-gray-800">
          <img src="/logo1.png" alt="logo" className="h-32 w-32" />
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleNotification}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Bell className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={handleSetting}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Settings className="w-6 h-6 text-gray-600" />
          </button>
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
              <Calendar className="h-5 w-5" />
              Appointments
            </h2>
            <button
              onClick={() => setIsNewModalOpen(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-600"
            >
              <Plus className="h-4 w-4" />
              New Appointment
            </button>
          </div>
          <div className="space-y-4">
            {appointments.map((apt) => (
              <div key={apt.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{apt.patient}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    {apt.date} at {apt.time}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedAppointment(apt);
                      setIsRescheduleModalOpen(true);
                    }}
                    className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100"
                  >
                    Reschedule
                  </button>
                  <button
                    onClick={() => handleCancel(apt.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AppointmentModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        onSubmit={handleNewAppointment}
      />

      <AppointmentModal
        isOpen={isRescheduleModalOpen}
        onClose={() => setIsRescheduleModalOpen(false)}
        onSubmit={handleReschedule}
        appointment={selectedAppointment}
      />
    </div>
  );
};

export default AppointmentScheduling;
