import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow p-4">
        <h1 className="text-2xl font-bold text-gray-700">About Us</h1>
      </header>
      <main className="p-8">
        <section className="bg-white shadow rounded p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800">Our Mission</h2>
          <p className="text-gray-600 mt-2">
            Our mission is to bridge the gap between healthcare providers and
            patients by offering a user-friendly platform for easy navigation to
            nearby hospitals and convenient doctor appointments.
          </p>
        </section>

        <section className="bg-white shadow rounded p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800">What We Offer</h2>
          <ul className="list-disc list-inside text-gray-600 mt-2">
            <li>Locate nearby hospitals with map-based navigation.</li>
            <li>Book appointments with your preferred doctors online.</li>
            <li>Track your health metrics with features like BMI calculators.</li>
            <li>Access health reports and manage appointments effortlessly.</li>
          </ul>
        </section>

        <section className="bg-white shadow rounded p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800">Why Choose Us?</h2>
          <p className="text-gray-600 mt-2">
            Our platform is designed with simplicity and accessibility in mind.
            Whether you're looking for emergency services or planning your next
            health checkup, we make the process seamless and efficient.
          </p>
        </section>

        <section className="bg-white shadow rounded p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800">Contact Us</h2>
          <p className="text-gray-600 mt-2">
            Have any questions or need support? Feel free to reach out to us!
          </p>
          <div className="mt-4">
            <p className="text-gray-700">
              <strong>Email:</strong> support@healthnavigator.com
            </p>
            <p className="text-gray-700">
              <strong>Phone:</strong> +1-800-HEALTH
            </p>
          </div>
        </section>

        <div className="flex justify-center mt-8">
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            onClick={() => navigate("/dashboard")}
          >
            Go to Dashboard
          </button>
        </div>
      </main>
    </div>
  );
};

export default About;
