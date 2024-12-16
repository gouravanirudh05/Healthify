import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-600">HealthCare App</h1>
      <div className="space-x-4">
        <a href="/" className="text-gray-600 hover:text-blue-600">Home</a>
        <a href="/dashboard" className="text-gray-600 hover:text-blue-600">Dashboard</a>
        <a href="/profile" className="text-gray-600 hover:text-blue-600">Profile</a>
        <a href="/login" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Login</a>
      </div>
    </nav>
  );
};

export default Navbar;
