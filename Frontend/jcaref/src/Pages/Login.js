import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [isOpen, setIsOpen] = useState(true); // Control modal visibility
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch("http://localhost:8081/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, password }),
            });

            if (!response.ok) throw new Error("Login failed!");

            const data = await response.json();
            localStorage.setItem("token", data.token);
            alert("Login successful!");
            navigate("/dashboard");
            setIsOpen(false); // Close modal on success
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">

            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-80 transform transition-all scale-100">
                        <button 
                            onClick={() => setIsOpen(false)}
                            className="absolute top-2 right-3 text-gray-500 hover:text-gray-800"
                        >
                            ✖
                        </button>
                        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                            className="w-full p-2 border rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="w-full p-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <button
                            onClick={handleLogin}
                            className="w-full bg-blue-500 text-white p-2 rounded-md shadow-md hover:bg-blue-600 transition"
                        >
                            Login
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
