// frontend/src/components/SummaryDisplay.jsx

import React from 'react';

const SummaryDisplay = ({ summary }) => {
  if (!summary) return null;

  const isLoading = summary.includes('⏳'); // Detects if it's still loading

  return (
    <div className="bg-gray-100 p-4 rounded mt-4">
      <h2 className="text-md font-semibold mb-2">📋 Summary</h2>
      {isLoading ? (
        <div className="animate-pulse text-gray-600">{summary}</div>
      ) : (
        <pre className="text-sm whitespace-pre-wrap">{summary}</pre>
      )}
    </div>
  );
};

export default SummaryDisplay;
