import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // adjust path if needed

const Signup = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [employeeid, setEmployeeID] = useState("");
  const [department, setDepartment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;

  const handleSignup = async () => {
    setErrorMessage("");
    try {
      const response = await fetch(`${BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ employeeid, name, email, password, department }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error || "Signup failed!");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("name", data.name);
      localStorage.setItem("department", data.department);
      localStorage.setItem("employeeid", data.employeeId || data.employeeid || "");

      alert("Signup successful!");
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage("Network error. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 via-purple-400 to-purple-300 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl flex flex-col md:flex-row overflow-hidden animate-fadeIn">
        
        {/* Left Side: Illustration / Logo */}
        <div className="hidden md:flex md:w-1/2 bg-purple-600 items-center justify-center p-10">
          <img src="/logo/Logo.png" alt="Jcare Logo" className="w-64" />
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-1/2 p-10 flex flex-col items-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
          <p className="text-gray-500 mb-6 text-center">Sign up to get started</p>

          {errorMessage && (
            <div className="bg-red-100 text-red-700 p-2 mb-3 rounded w-full text-center">{errorMessage}</div>
          )}

          <input
            type="text"
            value={employeeid}
            onChange={(e) => setEmployeeID(e.target.value)}
            placeholder="Employee ID"
            className="w-full p-3 border border-gray-300 rounded-xl mb-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="w-full p-3 border border-gray-300 rounded-xl mb-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-xl mb-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-xl mb-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            placeholder="Department"
            className="w-full p-3 border border-gray-300 rounded-xl mb-6 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />

          <button
            onClick={handleSignup}
            className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition mb-4"
          >
            Signup
          </button>

          <div className="flex justify-between w-full mb-6">
            <Link
              to="/login"
              className="w-1/2 text-center mr-2 py-2 border border-purple-600 text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition"
            >
              Login
            </Link>
            <Link
              to="/"
              className="w-1/2 text-center ml-2 py-2 border border-gray-400 text-gray-600 rounded-xl font-semibold hover:bg-gray-100 transition"
            >
              Home
            </Link>
          </div>

          <div className="text-gray-500 text-sm text-center">
            &copy; 2025 Jcare. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
