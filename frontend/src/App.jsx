import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppointmentForm from './components/AppointmentForm';
import Hero from "./pages/Hero";
import LoginForm from "./pages/Login";
import PatientDashboard from "./pages/PatientDashboard";
import Profile from "./pages/Profile";
import Reports from "./pages/Reports"; // Added import for Reports
import { ToastContainer } from "react-toastify";
import HealthBlog from "./pages/HealthBlog";
import Blog from "./pages/Blog";
import Chatbot from "./components/Chatbot";
import ScheduleAppointment from "./pages/Appointment";
import DoctorDashboard from "./pages/DoctorDashboard";
import AdminDashboard from "./pages/Admindashboard";
import RegisterPatient from "./pages/RegisterPatient";
import RegisterDoctor from "./pages/RegisterDoctor"; // New import for RegisterDoctor
import About from "./pages/About";
import LandingPage from "./pages/LandingPage";
const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <div className="flex-grow">
          <Routes>       
            <Route path="/" element={<LandingPage />} />     
            <Route path="/news" element={<HealthBlog />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/hero" element={<Hero />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/patient-dashboard" element={<PatientDashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/scheduleappointment" element={<ScheduleAppointment />} />
            <Route path="/schedule-appointment" element={<AppointmentForm />} /> {/* New route */}
            <Route path="/register-patient" element={<RegisterPatient />} />
            <Route path="/register-doctor" element={<RegisterDoctor />} /> {/* New route */}
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
