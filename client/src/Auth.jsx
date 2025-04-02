import {BrowserRouter as Router, Route,Routes,Navigate} from 'react-router-dom';
import {useState, useEffect,createContext,useContext} from 'react';
import axios from 'axios';
import Signup from './Sign-up';
import Login from './Log-in';
import Profile from './Profile';
import App from './App';


const AuthContext = createContext();

function AuthProvider({children}){
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
    })

    
}