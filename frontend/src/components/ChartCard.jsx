import React from 'react';

const ChartCard = ({ title, children }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col space-y-4">
      <h4 className="text-lg font-bold text-slate-800 tracking-tight">{title}</h4>
      <div className="w-full h-80 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default ChartCard;
