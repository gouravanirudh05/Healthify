import React from "react";

const Hero = () => {
  return (
    <section className="bg-blue-50 py-16">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to Healthcare Simplified</h1>
        <p className="text-gray-600 mt-4">Access your health data anytime, anywhere.</p>
        <button className="bg-blue-500 text-white px-6 py-3 mt-6 rounded hover:bg-blue-600">
          Get Started
        </button>
      </div>
    </section>
  );
};

export default Hero;
