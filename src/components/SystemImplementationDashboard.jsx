import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SystemImplementationDashboard = () => {
  const TOTAL_STATES = 28;

  const systemsData = [
    { name: "IFMIS",  yes: 24, partial: 0,  no: 4 },
    { name: "e-HRMS", yes: 21, partial: 2,  no: 5 },
    { name: "WAMIS",  yes: 8,  partial: 8,  no: 12 },
    { name: "e-Voucher", yes: 13, partial: 9, no: 6 }
  ];

  const pendingStates = [
    { name: 'Arunachal Pradesh', reason: 'No submission received' },
    { name: 'Assam', reason: 'Draft saved, not submitted' },
    { name: 'Gujarat', reason: 'No submission received' },
    { name: 'Jharkhand', reason: 'Partial data only' },
    { name: 'Manipur', reason: 'No submission received' },
    { name: 'Meghalaya', reason: 'Draft saved, not submitted' },
    { name: 'Mizoram', reason: 'No submission received' },
    { name: 'Nagaland', reason: 'No submission received' },
    { name: 'Sikkim', reason: 'No submission received' },
    { name: 'Uttar Pradesh', reason: 'Draft saved, not submitted' },
  ];

  const getInitials = (name) => {
    return name.split(' ').map(word => word[0]).slice(0, 2).join('').toUpperCase();
  };

  // Calculate coverage percentage
  const calculateCoverage = (yes) => {
    return ((yes / TOTAL_STATES) * 100).toFixed(1) + '%';
  };

  // Get color based on coverage
  const getCoverageColor = (yes) => {
    const percentage = (yes / TOTAL_STATES) * 100;
    return percentage >= 70 ? "#3B6D11" : "#854F0B";
  };

  // Prepare data for Chart
  const sysChartData = {
    labels: systemsData.map(system => system.name),
    datasets: [
      { label: 'Implemented / Yes', data: systemsData.map(s => s.yes), backgroundColor: '#639922', borderRadius: 3 },
      { label: 'Partial / Trial / Mixed', data: systemsData.map(s => s.partial), backgroundColor: '#EF9F27', borderRadius: 3 },
      { label: 'Not implemented / No access', data: systemsData.map(s => s.no), backgroundColor: '#E24B4A', borderRadius: 3 },
    ]
  };

  const sysChartOptions = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { 
        stacked: true, 
        max: TOTAL_STATES, 
        ticks: { stepSize: 4, font: { size: 11 } },
        title: { display: true, text: `Number of states (total = ${TOTAL_STATES})`, font: { size: 11 } }
      },
      y: { stacked: true, grid: { display: false } }
    }
  };

  return (
    <div className="max-w-[720px] mx-auto p-4 font-sans" style={{ background: '#f5f4f0', minHeight: '100vh' }}>
      
      {/* Card 1 */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8 shadow-sm">
        <p className="text-sm font-medium">System implementation comparison</p>
        <p className="text-xs text-gray-600 mt-1">Number of states with Yes / Partial / No status across all 4 IT systems — GA Wing Survey 2026-27</p>

        <div className="flex gap-6 text-xs text-gray-600 mt-4 mb-4">
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded" style={{background: '#639922'}}></div>Implemented / Yes</div>
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded" style={{background: '#EF9F27'}}></div>Partial / Trial / Mixed</div>
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded" style={{background: '#E24B4A'}}></div>Not implemented / No access</div>
        </div>

        <div className="h-[220px] mb-6">
          <Bar data={sysChartData} options={sysChartOptions} />
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 text-xs font-medium text-gray-500">System</th>
              <th className="text-center py-3 text-xs font-medium text-gray-500">Implemented / Yes</th>
              <th className="text-center py-3 text-xs font-medium text-gray-500">Partial / Mixed</th>
              <th className="text-center py-3 text-xs font-medium text-gray-500">No / Physical</th>
              <th className="text-center py-3 text-xs font-medium text-gray-500">Coverage</th>
            </tr>
          </thead>
          <tbody>
            {systemsData.map((row, i) => {
              const coverage = calculateCoverage(row.yes);
              const color = getCoverageColor(row.yes);
              return (
                <tr key={i} className="border-b last:border-none hover:bg-gray-50">
                  <td className="py-4 font-medium">{row.name}</td>
                  <td className="text-center">
                    <span className="inline-block bg-[#EAF3DE] text-[#3B6D11] px-4 py-1 rounded-full text-xs font-medium">
                      {row.yes} states
                    </span>
                  </td>
                  <td className="text-center">
                    {row.partial > 0 ? (
                      <span className="inline-block bg-[#FAEEDA] text-[#854F0B] px-4 py-1 rounded-full text-xs font-medium">
                        {row.partial} states
                      </span>
                    ) : (
                      <span className="text-gray-400">0</span>
                    )}
                  </td>
                  <td className="text-center">
                    <span className="inline-block bg-[#FCEBEB] text-[#A32D2D] px-4 py-1 rounded-full text-xs font-medium">
                      {row.no} states
                    </span>
                  </td>
                  <td className="text-center font-medium" style={{ color }}>
                    {coverage}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Card 2 - Pending States (Same as before) */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <p className="text-sm font-medium">States / users who have not filled the form</p>
        <p className="text-xs text-gray-600 mt-1">Respondents pending submission — GA Wing Survey 2026-27</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 mb-6">
          <div className="bg-[#f5f4f0] p-4 rounded-xl text-center">
            <div className="text-3xl font-medium">{TOTAL_STATES}</div>
            <div className="text-xs text-gray-500 mt-1">Total states</div>
          </div>
          <div className="bg-[#f5f4f0] p-4 rounded-xl text-center">
            <div className="text-3xl font-medium text-[#3B6D11]">18</div>
            <div className="text-xs text-gray-500 mt-1">Submitted</div>
          </div>
          <div className="bg-[#f5f4f0] p-4 rounded-xl text-center">
            <div className="text-3xl font-medium text-[#A32D2D]">10</div>
            <div className="text-xs text-gray-500 mt-1">Pending</div>
          </div>
          <div className="bg-[#f5f4f0] p-4 rounded-xl text-center">
            <div className="text-3xl font-medium text-[#854F0B]">64%</div>
            <div className="text-xs text-gray-500 mt-1">Response rate</div>
          </div>
        </div>

        <div className="h-12 mb-6">
          <Bar 
            data={{
              labels: ['Progress'],
              datasets: [
                { label: 'Submitted', data: [18], backgroundColor: '#639922', borderRadius: 6 },
                { label: 'Pending', data: [10], backgroundColor: '#E24B4A', borderRadius: 6 },
              ]
            }} 
            options={{
              indexAxis: 'y',
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { display: false } },
              scales: { x: { stacked: true, max: TOTAL_STATES, display: false }, y: { stacked: true, display: false } }
            }} 
          />
        </div>

        <p className="font-medium text-sm mb-3">Pending states</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {pendingStates.map((state, index) => (
            <div key={index} className="flex gap-3 bg-white border border-gray-100 p-3 rounded-xl">
              <div className="w-9 h-9 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                {getInitials(state.name)}
              </div>
              <div>
                <div className="font-medium text-sm">{state.name}</div>
                <div className="text-xs text-gray-500">{state.reason}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SystemImplementationDashboard;