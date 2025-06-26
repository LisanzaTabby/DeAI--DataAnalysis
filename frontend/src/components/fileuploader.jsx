import React from 'react';
import Papa from 'papaparse';

const FileUploader = ({ onDataLoaded }) => {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true, // ✅ Optional: prevents blank rows
      complete: (results) => {
        console.log("✅ CSV Parsed Result:", results.data); // ✅ Debug: Show parsed output
        onDataLoaded(results.data); // ✅ Send to Chatbot.jsx
      },
      error: (error) => {
        console.error("❌ Error parsing CSV:", error);
      }
    });
  };

  return (
    <div className="mb-4">
      <label className="text-white block mb-2 text-sm font-medium">
        Upload CSV File
      </label>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                   file:rounded-full file:border-0 file:text-sm file:font-semibold
                   file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
    </div>
  );
};

export default FileUploader;
