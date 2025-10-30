import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import { ArrowUpTrayIcon } from '../../components/icons/Icons';
import { employeesApi } from '../../services/api';
import { Employee } from '../../types';

const EmployeeFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const [employee, setEmployee] = useState<Partial<Employee>>({ is_active: true });

  useEffect(() => {
    if (isEditing && id) {
      employeesApi.getById(Number(id)).then(data => {
        if (data) setEmployee(data);
      });
    }
  }, [id, isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
        const { checked } = e.target as HTMLInputElement;
        setEmployee(prev => ({ ...prev, [name]: checked }));
    } else {
        setEmployee(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving employee:', employee);
    navigate('/employees');
  };

  const breadcrumbs = [
    { name: 'Personnel', href: '/employees' },
    { name: 'Employees', href: '/employees' },
    { name: isEditing ? 'Edit Employee' : 'New Employee', href: isEditing ? `/employees/edit/${id}` : '/employees/new' },
  ];

  return (
    <div>
      <PageHeader title={isEditing ? `Edit: ${employee.name}` : 'Create New Employee'} breadcrumbs={breadcrumbs} />
      
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 flex flex-col items-center">
                <img src={employee.photo || "https://picsum.photos/200"} alt="Employee" className="h-40 w-40 rounded-full object-cover mb-4" />
                <button type="button" className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <ArrowUpTrayIcon className="h-5 w-5 mr-2" />
                    Upload Photo
                </button>
            </div>

            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name (English)</label>
                  <input type="text" name="name" id="name" value={employee.name || ''} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
                </div>
                <div>
                  <label htmlFor="name_am" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name (Amharic)</label>
                  <input type="text" name="name_am" id="name_am" value={employee.name_am || ''} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
                </div>
                 <div>
                  <label htmlFor="employee_code" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Employee Code</label>
                  <input type="text" name="employee_code" id="employee_code" value={employee.employee_code || ''} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
                </div>
                <div>
                  <label htmlFor="position" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Position</label>
                  <input type="text" name="position" id="position" value={employee.position || ''} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
                </div>
                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Department</label>
                  <input type="text" name="department" id="department" value={employee.department || ''} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
                </div>
                <div>
                  <label htmlFor="directorate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Directorate</label>
                   <select id="directorate" name="directorate" value={employee.directorate || ''} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm">
                        <option>HR</option>
                        <option>IT</option>
                   </select>
                </div>
                 <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
                  <input type="tel" name="phone" id="phone" value={employee.phone || ''} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
                </div>
                 <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                  <input type="email" name="email" id="email" value={employee.email || ''} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
                </div>
                 <div>
                  <label htmlFor="salary" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Salary</label>
                  <input type="number" name="salary" id="salary" value={employee.salary || ''} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
                </div>
                 <div>
                  <label htmlFor="taamagoli" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Taamagoli / Title</label>
                  <input type="text" name="taamagoli" id="taamagoli" value={employee.taamagoli || ''} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
                </div>
                 <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                    <div className="mt-2 flex items-center">
                        <input id="is_active" name="is_active" type="checkbox" checked={employee.is_active || false} onChange={handleChange} className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"/>
                        <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900 dark:text-gray-200">Is Active</label>
                    </div>
                </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button type="button" onClick={() => navigate('/employees')} className="bg-white dark:bg-gray-700 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              Cancel
            </button>
            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              Save Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeFormPage;