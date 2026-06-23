import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { AlertCircle } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm max-w-md w-full flex flex-col items-center space-y-6">
        <div className="bg-red-50 text-red-500 p-4 rounded-full">
          <AlertCircle size={48} />
        </div>
        
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800">Page Not Found</h1>
          <p className="text-slate-400 text-sm mt-2">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>

        <Link to="/dashboard" className="w-full">
          <Button className="w-full py-2.5">
            Return to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
