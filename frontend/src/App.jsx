import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./pages/Hero";
import LoginForm from "./pages/Login";
import Dashboard from "./pages/Dashboard";
//import AppointmentScheduler from "./components/AppointmentScheduler";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>

        {/* Footer */}
        <ToastContainer />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
