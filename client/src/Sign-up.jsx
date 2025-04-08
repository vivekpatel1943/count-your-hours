import { useState } from "react";
import { useAuth } from "./Root"; // Import useAuth hook
import { useNavigate } from "react-router-dom";
import axios from "axios";

import backwardArrow from './assets/backward.png';

function Signup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/api/auth/signup`,
                formData
            );
            console.log(response);
            // Assuming the response contains the token and user data
            localStorage.setItem("token", response.data.token);
            navigate("/profile"); // Redirect after successful signup
        } catch (err) {
            setError("Signup failed. Please try again.");
            setLoading(false);
        }
    };

    function navigateToLandingPage(){
        navigate('/page');
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
              <div className="fixed top-4 right-4">
                <button onClick={navigateToLandingPage} className=" bg-blue-500 text-white rounded px-2 py-1"><img src={backwardArrow} height="20px" width="30px"></img></button>
            </div>
            
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800">Sign Up</h2>
                {error && <p className="text-red-500 text-center mt-2">{error}</p>}

                <form className="mt-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-gray-700">Full Name</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
                        />
                    </div>

                    <div className="mt-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
                        />
                    </div>

                    <div className="mt-4">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-500 text-white py-2 px-4 mt-6 rounded-lg hover:bg-green-600 transition duration-300 disabled:bg-gray-400"
                    >
                        {loading ? "Signing up..." : "Sign Up"}
                    </button>
                </form>

                <p className="text-center text-gray-600 mt-4">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-500 hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Signup;
