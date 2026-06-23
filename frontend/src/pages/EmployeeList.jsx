import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import customFetch from '../api/customFetch';
import Table from '../components/Table';
import Pagination from '../components/Pagination';
import Modal from '../components/Modal';
import Button from '../components/Button';
import { Plus, Search, Edit2, Trash2 } from 'lucide-react';

const EmployeeList = () => {
  const navigate = useNavigate();

  // State parameters for API query
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [department, setDepartment] = useState('All');
  const [status, setStatus] = useState('All');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Delete modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Debounce search input (500ms delay)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // Reset page to 1 on search change
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  // Fetch employees whenever query parameters change
  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await customFetch.get('/employees', {
        params: {
          search: debouncedSearch,
          department,
          status,
          page,
          limit: 5,
        },
      });
      setEmployees(response.data.employees);
      setTotalPages(response.data.pages);
    } catch (error) {
      console.error('Error fetching employees:', error);
      toast.error('Failed to load employee list');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [debouncedSearch, department, status, page]);

  const handleDeleteClick = (employee) => {
    setEmployeeToDelete(employee);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!employeeToDelete) return;
    setDeleteLoading(true);
    try {
      await customFetch.delete(`/employees/${employeeToDelete._id}`);
      toast.success('Employee deleted successfully');
      setIsDeleteModalOpen(false);
      setEmployeeToDelete(null);
      // Automatically refresh list or reset page if empty
      if (employees.length === 1 && page > 1) {
        setPage(page - 1);
      } else {
        fetchEmployees();
      }
    } catch (error) {
      console.error('Delete error:', error);
      const message = error.response?.data?.message || 'Failed to delete employee';
      toast.error(message);
    } finally {
      setDeleteLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            Employee Directory
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Search, filter, and manage staff records.
          </p>
        </div>
        <Link to="/employees/create">
          <Button className="flex items-center space-x-1.5 py-2.5">
            <Plus size={18} />
            <span>Add Employee</span>
          </Button>
        </Link>
      </div>

      {/* Query Filters container */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        {/* Search Bar */}
        <div className="relative md:col-span-2">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search size={18} />
          </span>
          <input
            type="text"
            placeholder="Search name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all text-sm"
          />
        </div>

        {/* Department Filter */}
        <div>
          <select
            value={department}
            onChange={(e) => {
              setDepartment(e.target.value);
              setPage(1);
            }}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all text-sm text-slate-600 font-medium"
          >
            <option value="All">All Departments</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
            <option value="Finance">Finance</option>
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all text-sm text-slate-600 font-medium"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Table Container */}
      <Table
        headers={[
          'Name',
          'Email',
          'Department',
          'Designation',
          'Status',
          'Joining Date',
          'Actions',
        ]}
        loading={loading}
        isEmpty={employees.length === 0}
        emptyMessage="No employees found"
      >
        {employees.map((employee) => (
          <tr key={employee._id} className="hover:bg-slate-50/50 border-b border-slate-100 transition-colors">
            <td className="px-6 py-4 text-sm font-semibold text-slate-800">
              {employee.name}
            </td>
            <td className="px-6 py-4 text-sm text-slate-500">
              {employee.email}
            </td>
            <td className="px-6 py-4 text-sm">
              <span className="inline-flex px-2.5 py-1 text-xs font-semibold rounded-lg bg-indigo-50 text-indigo-700">
                {employee.department}
              </span>
            </td>
            <td className="px-6 py-4 text-sm text-slate-600 font-medium">
              {employee.designation}
            </td>
            <td className="px-6 py-4 text-sm">
              <span
                className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-lg ${
                  employee.status === 'Active'
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-rose-50 text-rose-700'
                }`}
              >
                {employee.status}
              </span>
            </td>
            <td className="px-6 py-4 text-sm text-slate-500">
              {formatDate(employee.joiningDate)}
            </td>
            <td className="px-6 py-4 text-sm flex space-x-3">
              <button
                onClick={() => navigate(`/employees/edit/${employee._id}`)}
                className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                title="Edit Employee"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={() => handleDeleteClick(employee)}
                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                title="Delete Employee"
              >
                <Trash2 size={16} />
              </button>
            </td>
          </tr>
        ))}
      </Table>

      {/* Pagination Controls */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(newPage) => setPage(newPage)}
      />

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setEmployeeToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Remove Employee Record"
        message={`Are you sure you want to delete ${employeeToDelete?.name}? This action will permanently remove their records from the directory.`}
        confirmText="Confirm Delete"
        loading={deleteLoading}
      />
    </div>
  );
};

export default EmployeeList;
