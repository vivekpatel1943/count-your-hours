import { useState,useEffect } from "react";
import { useAuth } from "./Root"; // Importing useAuth hook
import { useNavigate } from "react-router-dom";

import backwardArrow from './assets/backward.png';

function Login() {
    const { login,user } = useAuth();
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await login(credentials);
            // navigate('/profile')
            
        } catch (err) {
            setError("Invalid email or password");
            setLoading(false);
        }
    };

    
    //redirect when 'user' becomes truthy
    useEffect(() => {
        if(user){
            navigate('/profile')
        }
    },[user,navigate])


    function navigateToLandingPage(){
        navigate('/page');
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="fixed top-4 right-4">
                  <button onClick={navigateToLandingPage} className=" bg-blue-500 text-white rounded px-2 py-1"><img src={backwardArrow} height="20px" width="30px"></img></button>
            </div>
            
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
                {error && <p className="text-red-500 text-center mt-2">{error}</p>}

                <form className="mt-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={credentials.email}
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
                            value={credentials.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-500 text-white py-2 px-4 mt-6 rounded-lg hover:bg-blue-600 transition duration-300 disabled:bg-gray-400"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="text-center text-gray-600 mt-4">
                    Don't have an account?{" "}
                    <a href="/signup" className="text-blue-500 hover:underline">
                        Sign Up
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Login;
