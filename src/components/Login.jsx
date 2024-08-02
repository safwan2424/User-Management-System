import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/bg.png.jpg';

const Login = ({ onLogin }) => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const navigate = useNavigate();

useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin();
        navigate('/app');
    };

    return (
        <div 
            className="flex items-center justify-center min-h-screen w-full"
            style={{ 
                backgroundImage: `url(${backgroundImage})`, 
                backgroundSize: 'cover',
                backgroundAttachment: 'fixed',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                minHeight: '100vh',
                width: '100vw',
                overflow: 'hidden',
            }}
        >
            <form 
                onSubmit={handleSubmit} 
                className="bg-white bg-opacity-70 p-8 rounded-lg shadow-lg max-w-sm w-full"
                style={{ 
                    background: 'rgba(255, 255, 255, 0.7)', 
                    padding: '2rem', 
                    borderRadius: '1rem', 
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' 
                }}
            >
                <h2 className="text-3xl font-sans font-bold text-center text-gray-700 mb-6">Welcome to Login</h2>
                <p className="text-center font-bold text-gray-600 text-xl mb-6">Please enter your credentials</p>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        required
        placeholder='abc@gmail.com'
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-orange-500 text-white py-2 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 rounded-md"
                >
                    Login
                </button>
                <p className="mt-4 text-center">
                    Don't have an account? <a href="/register" className="text-blue-500 hover:underline">Register here</a>
                </p>
            </form>
        </div>
    );
};

export default Login;

