// src/components/ChartComponent.jsx

import React from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  LineElement,
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(
  BarElement,
  ArcElement,
  LineElement,
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const ChartComponent = ({ data }) => {
  if (!data || data.length === 0) return null;

  const keys = Object.keys(data[0]);
  const numericKeys = keys.filter(k => typeof data[0][k] === 'number');
  const stringKeys = keys.filter(k => typeof data[0][k] === 'string');
  const dateKeys = keys.filter(k =>
    /date|time/i.test(k) && !isNaN(new Date(data[0][k]))
  );

  const charts = [];

  // 📊 1. Bar Chart: Category (string) vs Numeric
  if (numericKeys.length > 0 && stringKeys.length > 0) {
    const labelKey = stringKeys[0];
    const valueKey = numericKeys[0];

    const grouped = {};
    data.forEach(row => {
      const label = row[labelKey] || 'Unknown';
      grouped[label] = (grouped[label] || 0) + (row[valueKey] || 0);
    });

    const barData = {
      labels: Object.keys(grouped),
      datasets: [{
        label: `${valueKey} by ${labelKey}`,
        data: Object.values(grouped),
        backgroundColor: 'rgba(75,192,192,0.6)'
      }]
    };

    charts.push(<Bar key="bar" data={barData} options={{ responsive: true }} />);
  }

  // 🥧 2. Pie Chart: Category count
  if (stringKeys.length > 0) {
    const pieKey = stringKeys[0];
    const counts = {};

    data.forEach(row => {
      const label = row[pieKey] || 'Unknown';
      counts[label] = (counts[label] || 0) + 1;
    });

    const pieData = {
      labels: Object.keys(counts),
      datasets: [{
        data: Object.values(counts),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#9CCC65', '#FFA726']
      }]
    };

    charts.push(<Pie key="pie" data={pieData} options={{ responsive: true }} />);
  }

  // 📈 3. Line Chart: Time-based trends
  if (dateKeys.length > 0 && numericKeys.length > 0) {
    const timeKey = dateKeys[0];
    const valueKey = numericKeys[0];

    const timeData = data
      .filter(row => row[timeKey] && !isNaN(new Date(row[timeKey])))
      .map(row => ({
        x: new Date(row[timeKey]),
        y: row[valueKey]
      }))
      .sort((a, b) => new Date(a.x) - new Date(b.x));

    const lineData = {
      datasets: [{
        label: `${valueKey} over time`,
        data: timeData,
        borderColor: 'rgba(255,99,132,1)',
        fill: false
      }]
    };

    charts.push(<Line key="line" data={lineData} options={{ responsive: true }} />);
  }

  return (
    <div className="bg-white p-4 mt-4 rounded shadow">
      <h2 className="text-md font-bold mb-2 text-gray-800">📊 Auto-Generated Charts</h2>
      <div className="space-y-6">
        {charts.length > 0 ? charts : <p>No suitable chart data found.</p>}
      </div>
    </div>
  );
};

export default ChartComponent;
