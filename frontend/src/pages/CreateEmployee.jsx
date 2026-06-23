import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import customFetch from '../api/customFetch';
import Input from '../components/Input';
import Button from '../components/Button';
import { ArrowLeft } from 'lucide-react';

const CreateEmployee = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: 'IT', // default
    designation: '',
    status: 'Active', // default
    joiningDate: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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
    if (!formData.name.trim()) tempErrors.name = 'Name is required';
    if (!formData.email) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Please provide a valid email';
    }
    if (!formData.designation.trim()) tempErrors.designation = 'Designation is required';
    if (!formData.joiningDate) tempErrors.joiningDate = 'Joining Date is required';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await customFetch.post('/employees', formData);
      toast.success('Employee created successfully!');
      navigate('/employees');
    } catch (error) {
      console.error('Create employee error:', error);
      const message = error.response?.data?.message || 'Failed to create employee record';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Back navigation */}
      <div>
        <Link
          to="/employees"
          className="text-sm font-semibold text-slate-500 hover:text-slate-800 flex items-center space-x-1.5 transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to List</span>
        </Link>
      </div>

      {/* Main card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">
            Add New Employee
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Fill in the profile details below to register a new staff member.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Employee Name"
            name="name"
            placeholder="Jane Smith"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            required
          />

          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="jane.smith@portal.com"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Department */}
            <div className="mb-4">
              <label htmlFor="department" className="block text-sm font-semibold text-slate-700 mb-1">
                Department <span className="text-red-500">*</span>
              </label>
              <select
                name="department"
                id="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg outline-none transition-all focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 text-slate-800"
              >
                <option value="IT">IT</option>
                <option value="HR">HR</option>
                <option value="Sales">Sales</option>
                <option value="Marketing">Marketing</option>
                <option value="Finance">Finance</option>
              </select>
            </div>

            {/* Status */}
            <div className="mb-4">
              <label htmlFor="status" className="block text-sm font-semibold text-slate-700 mb-1">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                name="status"
                id="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg outline-none transition-all focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 text-slate-800"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Designation"
              name="designation"
              placeholder="Software Engineer"
              value={formData.designation}
              onChange={handleChange}
              error={errors.designation}
              required
            />

            <Input
              label="Joining Date"
              type="date"
              name="joiningDate"
              value={formData.joiningDate}
              onChange={handleChange}
              error={errors.joiningDate}
              required
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
            <Link to="/employees">
              <Button variant="secondary" type="button" disabled={loading}>
                Cancel
              </Button>
            </Link>
            <Button type="submit" loading={loading}>
              Save Profile
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEmployee;
