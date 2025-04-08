import React from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage(){

    const navigate = useNavigate();

    const navigateToLoginPage = () => {
        navigate('/login');
    }

    const navigateToSignupPage = () => {
        navigate('/signup')
    }

    return (
        <div className='h-screen flex flex-row'>
            <h1><strong>Track what you spend your hours on..</strong></h1>
            <div className='fixed top-4 right-4 flex gap-2 flex-wrap'>
                <button onClick={navigateToSignupPage} className='border-2 border-white text-white rounded px-2 py-1 mr-2 bg-blue-500'>Signup</button>
                <button onClick={navigateToLoginPage} className='border-2 border-white text-white rounded px-2 py-1 mr-5 bg-blue-500'>login</button>
            </div>
        </div>
    )
}

export default LandingPage;