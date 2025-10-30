import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import { customersApi } from '../../services/api';
import { Customer } from '../../types';

const CustomerFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const [customer, setCustomer] = useState<Partial<Customer>>({});
  
  useEffect(() => {
    if (isEditing && id) {
      customersApi.getById(Number(id)).then(data => {
        if (data) setCustomer(data);
      });
    }
  }, [id, isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCustomer(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving customer:', customer);
    navigate('/customers');
  };

  const breadcrumbs = [
    { name: 'Personnel', href: '/employees' },
    { name: 'Customers', href: '/customers' },
    { name: isEditing ? 'Edit Customer' : 'New Customer', href: isEditing ? `/customers/edit/${id}` : '/customers/new' },
  ];

  return (
    <div>
      <PageHeader title={isEditing ? `Edit: ${customer.name}` : 'Create New Customer'} breadcrumbs={breadcrumbs} />
      
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Customer Name</label>
              <input type="text" name="name" id="name" value={customer.name || ''} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Customer Type</label>
              <select id="type" name="type" value={customer.type || 'External'} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm">
                <option>Internal</option>
                <option>External</option>
              </select>
            </div>
            <div>
              <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Contact Person</label>
              <input type="text" name="contactPerson" id="contactPerson" value={customer.contactPerson || ''} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
            </div>
             <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
              <input type="tel" name="phone" id="phone" value={customer.phone || ''} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
            </div>
             <div className="md:col-span-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <input type="email" name="email" id="email" value={customer.email || ''} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button type="button" onClick={() => navigate('/customers')} className="bg-white dark:bg-gray-700 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              Cancel
            </button>
            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              Save Customer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerFormPage;