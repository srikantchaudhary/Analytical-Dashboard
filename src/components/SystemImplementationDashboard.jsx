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
    { name: "e-Voucher", yes: 9, partial: 13, no: 6 }
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

  const getInitials = (name) => name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();

  const calculateCoverage = (yes) => ((yes / TOTAL_STATES) * 100).toFixed(1) + '%';
  const getCoverageColor = (yes) => ((yes / TOTAL_STATES) * 100) >= 70 ? "#3B6D11" : "#854F0B";

  const sysChartData = {
    labels: systemsData.map(system => system.name),
    datasets: [
      { label: 'Implemented / Yes', data: systemsData.map(s => s.yes), backgroundColor: '#639922', borderRadius: 4 },
      { label: 'Partial / Trial / Mixed', data: systemsData.map(s => s.partial), backgroundColor: '#EF9F27', borderRadius: 4 },
      { label: 'Not implemented / No access', data: systemsData.map(s => s.no), backgroundColor: '#E24B4A', borderRadius: 4 },
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
      y: { stacked: true, grid: { display: false }, ticks: { font: { size: 12 } } }
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f4f0] py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">GA Wing Survey 2026-27</h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">Analytics Dashboard</p>
        </div>

        <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-8">

          {/* Card 1: System Implementation */}
          <div className="bg-white border border-gray-200 rounded-3xl p-5 sm:p-8 shadow-sm">
            <p className="text-lg sm:text-xl font-semibold mb-1">System Implementation Comparison</p>
            <p className="text-xs sm:text-sm text-gray-600 mb-6">
              Number of states with Yes / Partial / No status across all 4 IT systems
            </p>

            {/* Legend - Responsive */}
            <div className="flex flex-wrap gap-4 sm:gap-6 text-xs sm:text-sm text-gray-600 mb-6">
              <div className="flex items-center gap-2"><div className="w-3.5 h-3.5 rounded" style={{background: '#639922'}}></div>Implemented / Yes</div>
              <div className="flex items-center gap-2"><div className="w-3.5 h-3.5 rounded" style={{background: '#EF9F27'}}></div>Partial / Trial / Mixed</div>
              <div className="flex items-center gap-2"><div className="w-3.5 h-3.5 rounded" style={{background: '#E24B4A'}}></div>Not implemented / No access</div>
            </div>

            <div className="h-[240px] sm:h-[280px] mb-8">
              <Bar data={sysChartData} options={sysChartOptions} />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 font-medium text-gray-600">System</th>
                    <th className="text-center py-4 font-medium text-gray-600">Yes</th>
                    <th className="text-center py-4 font-medium text-gray-600">Partial</th>
                    <th className="text-center py-4 font-medium text-gray-600">No</th>
                    <th className="text-center py-4 font-medium text-gray-600">Coverage</th>
                  </tr>
                </thead>
                <tbody>
                  {systemsData.map((row, i) => {
                    const coverage = calculateCoverage(row.yes);
                    const color = getCoverageColor(row.yes);
                    return (
                      <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 last:border-none">
                        <td className="py-4 font-semibold">{row.name}</td>
                        <td className="text-center">
                          <span className="inline-block bg-[#EAF3DE] text-[#3B6D11] px-3 sm:px-5 py-1 rounded-full text-xs font-medium">
                            {row.yes}
                          </span>
                        </td>
                        <td className="text-center">
                          {row.partial > 0 ? (
                            <span className="inline-block bg-[#FAEEDA] text-[#854F0B] px-3 sm:px-5 py-1 rounded-full text-xs font-medium">
                              {row.partial}
                            </span>
                          ) : <span className="text-gray-400">0</span>}
                        </td>
                        <td className="text-center">
                          <span className="inline-block bg-[#FCEBEB] text-[#A32D2D] px-3 sm:px-5 py-1 rounded-full text-xs font-medium">
                            {row.no}
                          </span>
                        </td>
                        <td className="text-center font-semibold" style={{ color }}>
                          {coverage}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Card 2: Pending States */}
          <div className="bg-white border border-gray-200 rounded-3xl p-5 sm:p-8 shadow-sm">
            <p className="text-lg sm:text-xl font-semibold mb-1">Pending Submissions</p>
            <p className="text-xs sm:text-sm text-gray-600 mb-6">States / Users who have not filled the form</p>

            {/* Summary Metrics - Responsive Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Total States", value: TOTAL_STATES, color: "text-gray-800" },
                { label: "Submitted", value: 18, color: "text-[#3B6D11]" },
                { label: "Pending", value: 10, color: "text-[#A32D2D]" },
                { label: "Response Rate", value: "64%", color: "text-[#854F0B]" },
              ].map((item, i) => (
                <div key={i} className="bg-[#f5f4f0] p-4 sm:p-6 rounded-2xl text-center">
                  <div className={`text-3xl sm:text-4xl font-semibold ${item.color}`}>{item.value}</div>
                  <div className="text-xs sm:text-sm text-gray-500 mt-2">{item.label}</div>
                </div>
              ))}
            </div>

            <div className="h-16 mb-8">
              <Bar 
                data={{
                  labels: ['Progress'],
                  datasets: [
                    { label: 'Submitted', data: [18], backgroundColor: '#639922', borderRadius: 8 },
                    { label: 'Pending', data: [10], backgroundColor: '#E24B4A', borderRadius: 8 },
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

            <p className="font-semibold mb-4 text-gray-700">Pending States</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pendingStates.map((state, index) => (
                <div key={index} className="flex gap-4 p-4 border border-gray-100 rounded-2xl hover:shadow transition-all">
                  <div className="w-10 h-10 bg-red-100 text-red-700 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {getInitials(state.name)}
                  </div>
                  <div className="min-w-0">
                    <div className="font-medium text-sm leading-tight break-words">{state.name}</div>
                    <div className="text-xs text-gray-500 mt-1 line-clamp-2">{state.reason}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SystemImplementationDashboard;