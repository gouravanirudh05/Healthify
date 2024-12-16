import React from "react";
import { useNavigate } from "react-router-dom";
const Hero = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleGetStarted = () => {
    navigate("/login"); // Redirect to /login when clicked
  };
  return (
    <section className="bg-blue-50 py-16">
      <div className="container mx-auto text-center px-4 md:px-8">
        {/* Hero Section */}
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800">
          Welcome to Healthcare Simplified
        </h1>
        <p className="text-gray-600 mt-4 text-lg md:text-xl">
          Manage your health with ease. Access reports, schedule appointments, and find trusted healthcare resources.
        </p>
        <div className="mt-6">
          <button className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 mx-2"
            onClick={handleGetStarted}>
            Get Started
          </button>
          <button className="bg-gray-100 text-blue-500 px-6 py-3 rounded hover:bg-gray-200 mx-2">
            Learn More
          </button>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white shadow rounded p-6">
            <img
              src="https://via.placeholder.com/150"
              alt="Health Reports"
              className="w-16 h-16 mx-auto"
            />
            <h2 className="text-xl font-semibold text-gray-800 mt-4">Health Reports</h2>
            <p className="text-gray-600 mt-2">
              Access your health history and reports in one place.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white shadow rounded p-6">
            <img
              src="https://via.placeholder.com/150"
              alt="Appointment Management"
              className="w-16 h-16 mx-auto"
            />
            <h2 className="text-xl font-semibold text-gray-800 mt-4">Appointments</h2>
            <p className="text-gray-600 mt-2">
              Schedule and manage your appointments with ease.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white shadow rounded p-6">
            <img
              src="https://via.placeholder.com/150"
              alt="Trusted Doctors"
              className="w-16 h-16 mx-auto"
            />
            <h2 className="text-xl font-semibold text-gray-800 mt-4">Trusted Doctors</h2>
            <p className="text-gray-600 mt-2">
              Connect with experienced and trusted healthcare professionals.
            </p>
          </div>
        </div>
      <div className="container mx-auto text-center px-4 md:px-8">
        {/* Testimonials Section */}
        <div className="mt-16 overflow-hidden relative">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            What Our Users Say
          </h2>
          <div className="flex space-x-8 animate-scroll">
            {/* Testimonial 1 */}
            <div className="bg-white shadow rounded p-6 w-96 flex-shrink-0">
              <p className="text-gray-600">
                "Healthcare Simplified has made managing my health so much easier. I love the user-friendly interface!"
              </p>
              <p className="mt-4 text-gray-800 font-semibold">- John D.</p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white shadow rounded p-6 w-96 flex-shrink-0">
              <p className="text-gray-600">
                "Scheduling appointments has never been this seamless. Highly recommend this platform!"
              </p>
              <p className="mt-4 text-gray-800 font-semibold">- Sarah W.</p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white shadow rounded p-6 w-96 flex-shrink-0">
              <p className="text-gray-600">
                "The health reports feature is a lifesaver. Everything is organized and easy to access."
              </p>
              <p className="mt-4 text-gray-800 font-semibold">- Alex K.</p>
            </div>

            {/* Testimonial 4 */}
            <div className="bg-white shadow rounded p-6 w-96 flex-shrink-0">
              <p className="text-gray-600">
                "This platform is intuitive and has improved my healthcare experience significantly!"
              </p>
              <p className="mt-4 text-gray-800 font-semibold">- Emily R.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS */}
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
          }

          .animate-scroll {
            display: flex;
            animation: scroll 30s linear infinite;
          }
        `}
      </style>
  
        {/* Call to Action */}
        <div className="mt-16 bg-blue-500 text-white py-8 px-6 rounded shadow">
          <h2 className="text-3xl font-bold">Ready to Simplify Your Healthcare?</h2>
          <p className="mt-4 text-lg">
            Join thousands of users in taking control of your health today.
          </p>
          <button className="bg-white text-blue-500 px-6 py-3 mt-6 rounded hover:bg-gray-100">
            Sign Up Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
