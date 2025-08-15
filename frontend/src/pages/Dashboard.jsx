import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-700 to-teal-900 text-white">
      
      {/* Hero Section */}
      <section className="text-center py-20 px-4">
        <h1 className="text-5xl font-extrabold mb-6">Welcome {username} to DataMind 📊</h1>
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
            <img src="https://cdn-icons-png.flaticon.com/512/159/159604.png" alt="Upload Icon" className="w-16 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">📁 Easy File Upload</h3>
            <p>Upload your CSV or Excel files in one click and get started instantly.</p>
          </div>
          <div className="p-6 bg-gray-100 rounded-xl shadow-md hover:shadow-lg transition">
            <img src="https://cdn-icons-png.flaticon.com/512/4712/4712106.png" alt="AI Icon" className="w-16 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">🤖 AI Summarization</h3>
            <p>Receive automatic summaries and key insights from your data.</p>
          </div>
          <div className="p-6 bg-gray-100 rounded-xl shadow-md hover:shadow-lg transition">
            <img src="https://cdn-icons-png.flaticon.com/512/1828/1828919.png" alt="Chart Icon" className="w-16 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">📈 Visual Analytics</h3>
            <p>View your data as stunning charts and graphs for deeper analysis.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-8 bg-teal-800 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">About DataMind</h2>
          <p className="text-gray-200 mb-6">
            DataMind was built to simplify the process of understanding complex datasets. Whether you’re a student, researcher, or business analyst, our platform helps you gain insights quickly and intuitively — no coding required.
          </p>
          <img
            src="https://www.datocms-assets.com/48294/1663775012-dashboard-illustration.png"
            alt="Dashboard Illustration"
            className="mx-auto rounded-xl shadow-lg w-full max-w-md"
          />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white text-gray-800 py-16 px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="p-6">
              <img src="https://cdn-icons-png.flaticon.com/512/3062/3062634.png" alt="Step 1" className="w-16 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Step 1: Upload</h4>
              <p>Choose your file and upload it securely.</p>
            </div>
            <div className="p-6">
              <img src="https://cdn-icons-png.flaticon.com/512/4204/4204600.png" alt="Step 2" className="w-16 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Step 2: Analyze</h4>
              <p>Let our AI summarize and process your data.</p>
            </div>
            <div className="p-6">
              <img src="https://cdn-icons-png.flaticon.com/512/9297/9297465.png" alt="Step 3" className="w-16 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Step 3: Visualize</h4>
              <p>View charts and dashboards that bring your data to life.</p>
            </div>
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

export default Dashboard;
