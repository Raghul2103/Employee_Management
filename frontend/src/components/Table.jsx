import React from 'react';
import Loader from './Loader';

const Table = ({
  headers = [],
  loading = false,
  isEmpty = false,
  emptyMessage = 'No data found',
  children,
}) => {
  return (
    <div className="w-full overflow-x-auto border border-slate-100 rounded-2xl bg-white shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-100">
            {headers.map((header, idx) => (
              <th
                key={idx}
                className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={headers.length} className="px-6 py-4">
                <Loader />
              </td>
            </tr>
          ) : isEmpty ? (
            <tr>
              <td colSpan={headers.length} className="px-6 py-12 text-center">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <span className="text-slate-400 font-medium">{emptyMessage}</span>
                </div>
              </td>
            </tr>
          ) : (
            children
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
