import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';
import Signup from './Sign-up';
import Login from './Log-in';
import Profile from './Profile';
import LandingPage from './landingPage';
import App from './App';
import LandingRedirect from './LandingRedirect';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

// we will be passing react-components as arguments in place of children parameter
export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        // console.log(token)
        if (token) {
            axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/profile`, {
                headers: { Authorization: `${token}` }
            }).then(response => {
                console.log(response.data)
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
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, credentials);
        console.log(response.data)
        console.log(response.data.token)
        localStorage.setItem('token', response.data.token);
        const profileRes = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/profile`, {
            headers : {Authorization: response.data.token}
        })
        setUser(profileRes.data);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    }

   
    return (
        <AuthContext.Provider value={{ user, login, logout,loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}

function ProtectedRoute({ children }) {
    const { user,loading } = useAuth();

    if(loading) {
        return <div>loading...</div>
    }
    return user && children;
}

export default function Root() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path='/' element={<LandingRedirect/>}/>
                    <Route path='/page' element={<LandingPage/>}/>
                    <Route path='/home' element={<ProtectedRoute><App /></ProtectedRoute>} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}
