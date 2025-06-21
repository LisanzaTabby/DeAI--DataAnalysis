import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import Chatbot from './pages/Chatbot';


const App = () => {
  return (
    <Router>
      <nav className="bg-cyan-950 p-4 shadow mb-6 flex justify-between">
        <div className="text-cyan-600 font-extrabold text-lg">DataMind</div>
        <div className="space-x-4">
          <Link to="/" className="font-bold text-cyan-600 hover:underline">Home</Link>
          <Link to="/chatbot" className="font-bold text-cyan-600 hover:underline">ChatBot</Link>
          <Link to="/login" className="font-bold text-cyan-600 hover:underline">Login</Link>
          <Link to="/signup" className="font-bold text-cyan-600 hover:underline">Sign Up</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;
