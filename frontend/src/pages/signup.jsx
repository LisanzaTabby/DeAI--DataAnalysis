import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [message, setMessage] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [registeredUsername, setRegisteredUsername] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/signup', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });

      setMessage(response.data.message || 'Registration successful!');
      console.log(response.data);

      // Save to state (not localStorage yet)
      setRegisteredUsername(formData.username);
      setIsRegistered(true); // Triggers useEffect

    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.error || 'Registration failed');
    }
  };

  // ✅ Redirect and store after successful registration
  useEffect(() => {
    if (isRegistered && registeredUsername) {
      localStorage.setItem('username', registeredUsername);
      navigate('/');
    }
  }, [isRegistered, registeredUsername, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-teal-700 to-teal-900">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-teal-800 mb-6">Create Your Account</h2>

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Enter your username"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600"
            />
          </div>

          {/* Email */}
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

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Create a password"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600"
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Re-enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-teal-700 hover:bg-teal-800 text-white font-semibold py-2 rounded-xl transition duration-200"
          >
            Sign Up
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-red-600 font-medium">
            {message}
          </p>
        )}

        <p className="mt-6 text-sm text-gray-600 text-center">
          Already have an account?{' '}
          <a href="/login" className="text-teal-700 hover:underline font-medium">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
