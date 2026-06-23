import React, { useContext, useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import {
  LayoutDashboard,
  Users,
  BarChart3,
  LogOut,
  Menu,
  X,
  User as UserIcon,
} from 'lucide-react';

const DashboardLayout = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Employees', href: '/employees', icon: Users },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => {
    if (path === '/employees') {
      return location.pathname.startsWith('/employees');
    }
    return location.pathname === path;
  };

  // Generate User Initials for Avatar
  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-slate-900 border-r border-slate-800 z-20">
        <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
          {/* Logo / Title */}
          <div className="flex items-center flex-shrink-0 px-6 space-x-2">
            <div className="bg-indigo-600 p-2 rounded-xl text-white">
              <Users size={20} />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">
              StaffPortal
            </span>
          </div>
          {/* Nav links */}
          <nav className="mt-8 flex-1 px-4 space-y-1">
            {navigation.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                    active
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon
                    className={`mr-3 h-5 w-5 ${
                      active ? 'text-white' : 'text-slate-400 group-hover:text-slate-300'
                    }`}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          {/* Footer / Logout */}
          <div className="flex-shrink-0 flex border-t border-slate-800 p-4">
            <button
              onClick={handleLogout}
              className="w-full group flex items-center px-4 py-3 text-sm font-medium text-red-400 hover:bg-red-950/20 rounded-xl transition-all"
            >
              <LogOut className="mr-3 h-5 w-5 text-red-400" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Drawer (Overlay Sidebar) */}
      {isSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          ></div>

          <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-slate-900 border-r border-slate-800">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                type="button"
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setIsSidebarOpen(false)}
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>

            <div className="flex items-center flex-shrink-0 px-6 space-x-2">
              <div className="bg-indigo-600 p-2 rounded-xl text-white">
                <Users size={20} />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                StaffPortal
              </span>
            </div>

            <nav className="mt-8 flex-1 px-4 space-y-1">
              {navigation.map((item) => {
                const active = isActive(item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                      active
                        ? 'bg-indigo-600 text-white'
                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <Icon
                      className={`mr-3 h-5 w-5 ${
                        active ? 'text-white' : 'text-slate-400'
                      }`}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            <div className="flex-shrink-0 flex border-t border-slate-800 p-4">
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-400 hover:bg-red-950/20 rounded-xl transition-all"
              >
                <LogOut className="mr-3 h-5 w-5 text-red-400" />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Layout Area */}
      <div className="flex flex-col flex-1 md:pl-64 min-w-0">
        {/* Top Navbar */}
        <header className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white border-b border-slate-100">
          <button
            type="button"
            className="px-4 border-r border-slate-100 text-slate-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
            onClick={() => setIsSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="flex-1 px-4 flex justify-between items-center sm:px-6 lg:px-8">
            <div className="flex-1 flex">
              <h2 className="text-xl font-bold text-slate-800 leading-7 hidden sm:block">
                Employee Management System
              </h2>
            </div>
            
            {/* User credentials */}
            <div className="ml-4 flex items-center md:ml-6 space-x-4">
              <div className="flex items-center space-x-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-slate-700">{user?.name}</p>
                  <p className="text-xs text-slate-400">{user?.email}</p>
                </div>
                <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-indigo-100">
                  {getInitials(user?.name)}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Child Routes Content Area */}
        <main className="flex-grow p-6 sm:p-8 lg:p-10 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
