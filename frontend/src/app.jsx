import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import Chatbot from './pages/Chatbot';
import Dashboard from './pages/Dashboard';

const App = () => {
  const [username, setUsername] = useState(localStorage.getItem('username'));

  // When user logs in (and localStorage is updated), update state too
  useEffect(() => {
    const handleStorageChange = () => {
      setUsername(localStorage.getItem('username'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username');
    setUsername(null); // Trigger re-render
  };

  return (
    <Router>
      <nav className="bg-cyan-950 p-4 shadow mb-6 flex justify-between">
        <div className="text-cyan-600 font-extrabold text-lg">DataMind</div>
        <div className="space-x-4">
          <Link to="/" className="font-bold text-cyan-600 hover:underline">Home</Link>
          <Link to="/chatbot" className="font-bold text-cyan-600 hover:underline">ChatBot</Link>
          {username ? (
            <>
              <Link to="#" className="font-bold text-cyan-600 hover:underline">{username}</Link>
              <button
                onClick={handleLogout}
                className="bg-white text-cyan-900 px-3 py-1 rounded text-sm font-semibold hover:bg-gray-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="font-bold text-cyan-600 hover:underline">Login</Link>
              <Link to="/signup" className="font-bold text-cyan-600 hover:underline">Sign Up</Link>
            </>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
