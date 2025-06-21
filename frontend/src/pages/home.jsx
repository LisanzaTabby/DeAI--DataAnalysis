import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-700 to-teal-900 text-white">
      {/* Hero Section */}
      <section className="text-center py-20 px-4">
        <h1 className="text-5xl font-extrabold mb-6">Welcome to DataMind 📊</h1>
        <p className="text-lg text-gray-200 max-w-2xl mx-auto">
          Upload your CSVs, get AI-generated summaries, and visualize data with ease. 
        </p>
        <Link to="/chatbot" className="mt-8 inline-block bg-white text-teal-700 font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-gray-100 transition">
          Get Started
        </Link>
      </section>

      {/* Features Section */}
      <section className="bg-white text-gray-800 py-16 px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-center">
          <div className="p-6 bg-gray-100 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">📁 Easy File Upload</h3>
            <p>Upload your CSV or Excel files in one click and get started instantly.</p>
          </div>
          <div className="p-6 bg-gray-100 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">🤖 AI Summarization</h3>
            <p>Receive automatic summaries and key insights from your data.</p>
          </div>
          <div className="p-6 bg-gray-100 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">📈 Visual Analytics</h3>
            <p>View your data as stunning charts and graphs for deeper analysis.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-16 px-4 bg-teal-800">
        <h2 className="text-3xl font-bold mb-4">Start exploring your data now</h2>
        <p className="text-gray-200 mb-6">No technical skills required. Just upload and see the magic!</p>
        <Link to="/chatbot" className="bg-white text-teal-800 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
          Upload Now
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-teal-900 text-center py-6 text-sm text-gray-300">
        &copy; {new Date().getFullYear()} DataMind. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
