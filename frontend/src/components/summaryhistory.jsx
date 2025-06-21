import React, { useEffect, useState } from 'react';
import { backend } from 'declarations/backend';

const SummaryHistory = () => {
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    const fetchSummaries = async () => {
      try {
        const all = await backend.getSummaries();
        setSaved(all);
      } catch (error) {
        console.error("Failed to fetch summaries:", error);
      }
    };
    fetchSummaries();
  }, []);

  return (
    <div className="bg-white p-4 mt-4 rounded shadow">
      <h2 className="text-md font-bold mb-2">🕘 Past AI Summaries</h2>
      <ul className="list-disc list-inside text-sm text-gray-700">
        {saved.map((summary, i) => (
          <li key={i}>{summary.slice(0, 100)}...</li>
        ))}
      </ul>
    </div>
  );
};

export default SummaryHistory;
