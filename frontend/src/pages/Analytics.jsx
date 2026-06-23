import React, { useState, useEffect } from 'react';
import customFetch from '../api/customFetch';
import ChartCard from '../components/ChartCard';
import Loader from '../components/Loader';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import { toast } from 'react-hot-toast';

const Analytics = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await customFetch.get('/analytics');
        setChartData(response.data.charts);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
        toast.error('Failed to load chart analytics');
      } finally {
        setLoading(false);
      }
    };
    fetchChartData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  // Colors for Pie Chart status slices
  const COLORS = ['#10b981', '#ef4444']; // Active (emerald), Inactive (red)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
          Visual Analytics
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Interactive graphs displaying organization-wide trends and metrics.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Department Distribution (Bar Chart) */}
        <div className="min-w-0">
          <ChartCard title="Employees by Department">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData?.departmentData || []}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="department" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #f1f5f9' }}
                  cursor={{ fill: '#f8fafc' }}
                />
                <Bar dataKey="count" name="Employees" fill="#2563eb" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Status Breakdown (Pie Chart) */}
        <div className="min-w-0">
          <ChartCard title="Employee Status Distribution">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData?.statusData || []}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                  {(chartData?.statusData || []).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #f1f5f9' }}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Monthly Joining Trend (Line Chart) */}
        <div className="lg:col-span-2 min-w-0">
          <ChartCard title="Monthly Joining Trend (Onboarded Count)">
            {chartData?.joiningTrend && chartData.joiningTrend.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData.joiningTrend}
                  margin={{ top: 10, right: 20, left: -10, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #f1f5f9' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="Employees"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    activeDot={{ r: 8 }}
                    dot={{ strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-slate-400 text-sm font-medium">
                No joining history available to display.
              </div>
            )}
          </ChartCard>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
