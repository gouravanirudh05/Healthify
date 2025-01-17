import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppointmentForm from './components/AppointmentForm';
import Hero from "./pages/Hero";
import LoginForm from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Reports from "./pages/Reports"; // Added import for Reports
import { ToastContainer } from "react-toastify";
import HealthBlog from "./pages/HealthBlog";
import Blog from "./pages/Blog";
import Chatbot from "./components/Chatbot";
import ScheduleAppointment from "./pages/Appointment";
import DoctorDashboard from "./pages/DoctorDashboard";
import About from "./pages/About";
const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <div className="flex-grow">
          <Routes>
            
            <Route path="/news" element={<HealthBlog />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/" element={<Hero />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
            <Route path="/scheduleappointment" element={<ScheduleAppointment />} />
            <Route path="/schedule-appointment" element={<AppointmentForm />} /> {/* New route */}
            <Route path="/reports" element={<Reports />} /> {/* Added route for Reports */}
          </Routes>
        </div>
        <Chatbot />
        {/* Footer */}
        <ToastContainer />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
