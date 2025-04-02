import React from 'react';
import {useState} from 'react';
import axios from 'axios';

function Signup(){

    const [formData,setFormData] = useState({
        username:"",
        email:"",
        password:""
    })

    const [error,setError] = useState("");

    const [loading,setLoading] = useState(false);

    const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const passwordRegEx = /(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

    const validateEmail = (email) => emailRegEx.test(email);
    const validatePassword = (password) => passwordRegEx.test(password);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        if(!validateEmail){
            return setError("invalid email format..")
        }

        if(!validatePassword){
            return setError("Password must be 8+ characters long and include numbers and letters..")
        }

        setLoading(true);

        try{
            const res = axios.post()
        }catch(err){

        }
    } 

}