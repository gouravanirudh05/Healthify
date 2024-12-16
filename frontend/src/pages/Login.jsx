import React, { useState } from "react";
import { login, signup } from "../firebase";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [signState, setSignState] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // For programmatic navigation

  const user_auth = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (signState === "Sign In") {
        await login(email, password);
        alert("Logged in successfully!");
        navigate("/dashboard"); // Redirect to the dashboard after successful login
      } else {
        await signup(name, email, password);
        alert("Signed up successfully!");
        navigate("/dashboard"); // Redirect to the dashboard after successful signup
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded p-8 mt-10">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">{signState}</h2>
      <form onSubmit={user_auth}>
        {signState === "Sign Up" && (
          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your name"
              required
            />
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your password"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-500 text-white px-6 py-2 rounded w-full ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
        >
          {loading ? "Processing..." : signState}
        </button>
      </form>
      <div className="mt-4 text-center">
        <p>
          {signState === "Sign In" ? "Don't have an account?" : "Already have an account?"}
          <button
            type="button"
            onClick={() =>
              setSignState(signState === "Sign In" ? "Sign Up" : "Sign In")
            }
            className="text-blue-500 hover:underline ml-2"
          >
            {signState === "Sign In" ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
