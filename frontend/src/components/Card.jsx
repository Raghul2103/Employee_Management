import React from 'react';

const Card = ({ title, value, icon: Icon, description, trend, trendType = 'up' }) => {
  return (
    <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between h-full min-w-0">
      <div className="flex justify-between items-start min-w-0 w-full">
        <div className="flex-1 min-w-0 mr-3">
          <p className="text-xs sm:text-sm font-semibold text-slate-400 uppercase tracking-wider break-words line-clamp-2" title={title}>
            {title}
          </p>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 mt-2 truncate">
            {value}
          </h3>
        </div>
        {Icon && (
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl flex-shrink-0">
            <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
        )}
      </div>
      {description && (
        <div className="text-xs sm:text-sm text-slate-500 mt-4 leading-relaxed break-words">
          {trend && (
            <span className={`font-semibold mr-1.5 inline-block ${trendType === 'up' ? 'text-emerald-500' : 'text-red-500'}`}>
              {trend}
            </span>
          )}
          <span className="inline">{description}</span>
        </div>
      )}
    </div>
  );
};

export default Card;
