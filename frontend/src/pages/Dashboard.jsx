import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import customFetch from '../api/customFetch';
import Card from '../components/Card';
import Loader from '../components/Loader';
import {
  Users,
  UserCheck,
  UserX,
  Briefcase,
  Plus,
  ArrowRight,
  BarChart3,
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await customFetch.get('/analytics');
        setStats(response.data.stats);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        toast.error('Failed to load dashboard metrics');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return <Loader fullScreen={false} />;
  }

  return (
    <div className="space-y-8">
      {/* Welcome banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-xl shadow-indigo-100 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-indigo-100 mt-2 text-sm md:text-base">
            Here's what is happening with your organization's staff today.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Link
            to="/employees/create"
            className="bg-white/10 hover:bg-white/20 text-white font-semibold py-2.5 px-4 rounded-xl border border-white/20 transition-all flex items-center justify-center space-x-1.5 w-full sm:w-auto"
          >
            <Plus size={18} />
            <span>Add Employee</span>
          </Link>
          <Link
            to="/employees"
            className="bg-white text-indigo-600 font-semibold py-2.5 px-4 rounded-xl hover:bg-indigo-50 transition-all flex items-center justify-center space-x-1.5 shadow-md shadow-indigo-900/10 w-full sm:w-auto"
          >
            <span>Manage Staff</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      {/* Grid of stats cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card
          title="Total Employees"
          value={stats?.totalEmployees || 0}
          icon={Users}
          description="Registered staff members"
        />
        <Card
          title="Active Employees"
          value={stats?.activeEmployees || 0}
          icon={UserCheck}
          description="Currently active"
          trend="Active"
          trendType="up"
        />
        <Card
          title="Inactive Employees"
          value={stats?.inactiveEmployees || 0}
          icon={UserX}
          description="On leave / exited"
          trend="Inactive"
          trendType="down"
        />
        <Card
          title="Departments"
          value={stats?.departmentsCount || 0}
          icon={Briefcase}
          description="Operational units"
        />
      </div>

      {/* Quick shortcuts / helper panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Navigation Info */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Staff Records</h3>
            <p className="text-slate-400 text-sm mt-1">
              Add new records, search through active departments, filter by status, and update employee files.
            </p>
          </div>
          <div className="mt-6">
            <Link
              to="/employees"
              className="text-sm font-bold text-indigo-600 hover:text-indigo-500 flex items-center space-x-1"
            >
              <span>Go to Employee Listing</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Analytics Info */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Advanced Analytics</h3>
            <p className="text-slate-400 text-sm mt-1">
              View department ratios, status distributions, and monthly trends using modern visual charts.
            </p>
          </div>
          <div className="mt-6">
            <Link
              to="/analytics"
              className="text-sm font-bold text-indigo-600 hover:text-indigo-500 flex items-center space-x-1"
            >
              <span>View Interactive Charts</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
