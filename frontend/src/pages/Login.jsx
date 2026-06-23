import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';
import customFetch from '../api/customFetch';
import Input from '../components/Input';
import Button from '../components/Button';
import { Users } from 'lucide-react';
import loginHero from '../assets/login_hero.png';

const Login = () => {
  const { login, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (token) {
      navigate('/dashboard');
    }
    // Show session expired notification if redirected
    if (searchParams.get('expired') === 'true') {
      toast.error('Session expired. Please log in again.');
    }
  }, [token, navigate, searchParams]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear validation error when typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: '',
      });
    }
  };

  const validate = () => {
    const tempErrors = {};
    if (!formData.email) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Please provide a valid email';
    }
    if (!formData.password) {
      tempErrors.password = 'Password is required';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await customFetch.post('/auth/login', formData);
      const { token: userToken, ...userData } = response.data;
      
      login(userData, userToken);
      toast.success('Logged in successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      const message = error.response?.data?.message || 'Login failed. Please check credentials.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-stretch">
      {/* Visual Split Screen Panel (Hidden on mobile/tablet) */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 text-white flex-col justify-between p-12 relative overflow-hidden border-r border-slate-800">
        {/* Subtle background glow */}
        <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none"></div>

        {/* Branding header */}
        <div className="flex items-center space-x-2 relative z-10">
          <div className="bg-indigo-600 p-2 rounded-xl text-white">
            <Users size={20} />
          </div>
          <span className="text-lg font-bold text-white tracking-tight">StaffPortal</span>
        </div>

        {/* Central Illustration and Description */}
        <div className="flex flex-col items-center justify-center space-y-8 relative z-10 flex-grow my-8">
          <div className="max-w-md w-full flex justify-center transform hover:scale-105 transition-transform duration-300">
            <img 
              src={loginHero} 
              alt="StaffPortal Collaboration" 
              className="max-h-[360px] object-contain rounded-2xl shadow-xl shadow-slate-950/20"
            />
          </div>
          <div className="text-center max-w-sm">
            <h3 className="text-2xl font-bold tracking-tight">Modern Employee Management</h3>
            <p className="text-slate-400 text-sm mt-3 leading-relaxed">
              Track personnel, analyze organization-wide departments, and manage listings on an interactive portal.
            </p>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-xs text-slate-500 relative z-10">
          © {new Date().getFullYear()} StaffPortal. All rights reserved.
        </div>
      </div>

      {/* Form Container (Full width on mobile, half on desktop) */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="mx-auto max-w-md w-full bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-6">
          <div className="text-center">
            {/* Show logo icon on mobile instead of desktop sidebar */}
            <div className="mx-auto bg-indigo-600 h-12 w-12 rounded-2xl text-white flex items-center justify-center mb-4 shadow-md shadow-indigo-100 lg:hidden">
              <Users size={24} />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
              Welcome Back
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Please enter your details to sign in
            </p>
          </div>

          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <Input
              label="Email Address"
              type="email"
              name="email"
              placeholder="example@portal.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
            />

            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              required
            />

            <Button
              type="submit"
              className="w-full py-2.5"
              loading={loading}
            >
              Sign In
            </Button>
          </form>

          <div className="text-center text-sm text-slate-500 mt-4">
            Don't have an account?{' '}
            <Link to="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Sign up for free
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
