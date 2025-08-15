import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://host.docker.internal:5000'
});



    try {
      const response = await api.post('/api/login', formData);
      setMessage(response.data.message || 'Login successful!');

      // Check if the backend sent back the username
      if (response.data.username) {
        setUsername(response.data.username); // set to state
        setIsLoggedIn(true);                 // trigger effect
      } else {
        setMessage('Login succeeded, but no username returned.');
      }
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.error || 'Login failed');
    }
  };

  // ✅ useEffect to store username and redirect after login
  useEffect(() => {
    if (isLoggedIn && username) {
      localStorage.setItem('username', username);
      navigate('/'); // Redirect to home
    }
  }, [isLoggedIn, username, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-teal-700 to-teal-900">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-teal-800 mb-6">Login to DataMind</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-700 hover:bg-teal-800 text-white font-semibold py-2 rounded-xl transition duration-200"
          >
            Login
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-red-600 font-medium">
            {message}
          </p>
        )}

        <p className="mt-6 text-sm text-gray-600 text-center">
          Don't have an account?{' '}
          <a href="/signup" className="text-teal-700 hover:underline font-medium">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
