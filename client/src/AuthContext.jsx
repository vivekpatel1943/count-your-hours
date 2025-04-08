/* import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';
import Signup from './Signup';
import Login from './Login';
import Profile from './Profile';
import App from './App';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/profile`, {
                headers: { Authorization: `Bearer ${token}` }
            }).then(response => {
                setUser(response.data);
            }).catch(() => {
                localStorage.removeItem('token');
                setUser(null);
            }).finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (credentials) => {
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/login`, credentials);
        localStorage.setItem('token', response.data.token);
        setUser(response.data.user);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}

function ProtectedRoute({ children }) {
    const { user } = useAuth();
    return user ? children : <Navigate to='/login' />;
}

export default function Root() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path='/' element={<App />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}
 */