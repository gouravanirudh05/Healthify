import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import { FaRobot } from "react-icons/fa"; // Import Chatbot Icon
import axios from "axios";
import healthReports from "../assets/healthreports.png";
import appointments from "../assets/appointments.png";
import trusteddoctors from "../assets/trusteddoctors.png";

const Hero = () => {
  const navigate = useNavigate(); // Initialize the navigate function
  const testimonialsRef = useRef(null);
  const typedTextRef = useRef(null); // Reference to the typing text

  // State for chatbot
  const [isChatOpen, setIsChatOpen] = useState(false); // Toggle Chat
  const [chatInput, setChatInput] = useState(""); // User Input
  const [chatResponse, setChatResponse] = useState("");

  const toggleChat = () => setIsChatOpen((prev) => !prev);

  const handleSendMessage = async () => {
    if (!chatInput) return;
    try {
      const API_KEY = "AIzaSyB5mBucZhMRfvey20rBXH_vKFAdKAKNjVw"; // Replace with Gemini API key
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
        {
          contents: [{ parts: [{ text: chatInput }] }],
        }
      );
      setChatResponse(
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
          "Sorry, I couldn't understand."
      );
    } catch (error) {
      console.error("Error fetching Gemini API:", error);
      setChatResponse("An error occurred. Please try again later.");
    }
  };

  const handleGetStarted = () => {
    navigate("/login"); // Redirect to /login when clicked
  };

  const handleLearnMore = () => {
    testimonialsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Initialize Typed.js on mount
    const typed = new Typed(typedTextRef.current, {
      strings: ["Welcome to Healthcare Simplified"], // Text to type
      typeSpeed: 50, // Slower typing speed
      backSpeed: 40, // Slower backspacing speed
      startDelay: 500, // Delay before typing starts
      loop: false, // Disable looping
      onComplete: () => {
        const cursor = typedTextRef.current.querySelector(".typed-cursor");
        if (cursor) cursor.style.display = "none";
      },
    });

    return () => typed.destroy(); // Cleanup on component unmount
  }, []);

  return (
    <section className="bg-blue-50 py-16">
      <div className="container mx-auto text-center px-4 md:px-8">
        {/* Hero Section */}
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800">
          <span ref={typedTextRef}></span> {/* Typed effect target */}
        </h1>
        <p className="text-gray-600 mt-4 text-lg md:text-xl">
          Manage your health with ease. Access reports, schedule appointments,
          and find trusted healthcare resources.
        </p>
        <div className="mt-6">
          <button
            className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 mx-2"
            onClick={handleGetStarted}
          >
            Get Started
          </button>
          <button
            className="bg-gray-100 text-blue-500 px-6 py-3 rounded hover:bg-gray-200 mx-2"
            onClick={handleLearnMore}
          >
            Learn More
          </button>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white shadow rounded p-6">
            <img
              src={healthReports}
              alt="Health Reports"
              className="w-16 h-16 mx-auto"
            />
            <h2 className="text-xl font-semibold text-gray-800 mt-4">
              Health Reports
            </h2>
            <p className="text-gray-600 mt-2">
              Access your health history and reports in one place.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white shadow rounded p-6">
            <img
              src={appointments}
              alt="Appointment Management"
              className="w-16 h-16 mx-auto"
            />
            <h2 className="text-xl font-semibold text-gray-800 mt-4">
              Appointments
            </h2>
            <p className="text-gray-600 mt-2">
              Schedule and manage your appointments with ease.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white shadow rounded p-6">
            <img
              src={trusteddoctors}
              alt="Trusted Doctors"
              className="w-16 h-16 mx-auto"
            />
            <h2 className="text-xl font-semibold text-gray-800 mt-4">
              Trusted Doctors
            </h2>
            <p className="text-gray-600 mt-2">
              Connect with experienced and trusted healthcare professionals.
            </p>
          </div>
        </div>

        {/* Testimonials Section */}
        <div
          ref={testimonialsRef}
          className="mt-16 bg-gray-50 py-12 rounded-lg"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white shadow-md p-6 rounded-lg">
              <p className="text-gray-600 italic">
                "This platform has transformed the way I manage my health. It's
                so easy and efficient!"
              </p>
              <h4 className="text-gray-800 font-semibold mt-4">- John Doe</h4>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white shadow-md p-6 rounded-lg">
              <p className="text-gray-600 italic">
                "I love the appointment scheduling feature! It saves me so much
                time."
              </p>
              <h4 className="text-gray-800 font-semibold mt-4">- Jane Smith</h4>
            </div>
          </div>
        </div>

        {/* Chatbot Icon */}
        <div
          onClick={toggleChat}
          className="fixed bottom-8 right-8 bg-blue-500 text-white p-4 rounded-full cursor-pointer shadow-lg hover:bg-blue-600 transition"
        >
          <FaRobot size={24} />
        </div>

        {/* Chatbot Popup */}
        {isChatOpen && (
          <div className="fixed bottom-20 right-8 w-80 bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Healthcare Assistant
            </h2>
            <div className="h-32 overflow-y-auto border p-2 rounded text-sm text-gray-600">
              {chatResponse ||
                "Hi! How can I assist you with your health-related questions?"}
            </div>
            <div className="mt-4 flex">
              <input
                type="text"
                className="flex-grow border rounded-l p-2 focus:outline-none"
                placeholder="Ask me anything..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-500 text-white px-4 rounded-r hover:bg-blue-600 transition"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
