import React from "react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow p-4">
        <h1 className="text-2xl font-bold text-gray-700">Dashboard</h1>
      </header>
      <main className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded p-6">
          <h2 className="text-xl font-semibold text-gray-800">Health Reports</h2>
          <p className="text-gray-600 mt-2">View your detailed health history.</p>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            View Reports
          </button>
        </div>
        <div className="bg-white shadow rounded p-6">
          <h2 className="text-xl font-semibold text-gray-800">Appointments</h2>
          <p className="text-gray-600 mt-2">Manage your upcoming appointments.</p>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Schedule Now
          </button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
