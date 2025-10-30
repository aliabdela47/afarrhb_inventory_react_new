import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import { PlusIcon, TrashIcon } from '../../components/icons/Icons';
import { requestsApi } from '../../services/api';
import { Request } from '../../types';

const RequestFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const [request, setRequest] = useState<Partial<Request>>({ items: [{ itemId: 0, itemName: '', quantity: 1 }] });

  useEffect(() => {
    if (isEditing && id) {
      requestsApi.getById(Number(id)).then(data => {
        if (data) setRequest(data);
      });
    }
  }, [id, isEditing]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving request:', request);
    navigate('/requests');
  };

  const breadcrumbs = [
    { name: 'Operations', href: '/requests' },
    { name: 'Requests', href: '/requests' },
    { name: isEditing ? `Edit Request #${id}` : 'New Request', href: isEditing ? `/requests/edit/${id}` : '/requests/new' },
  ];

  return (
    <div>
      <PageHeader title={isEditing ? `Edit Request #${id}` : 'Create New Request'} breadcrumbs={breadcrumbs} />
      
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="requester" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Requester (Employee)</label>
              <select id="requester" name="requester" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                value={request.requester || ''}
                onChange={e => setRequest(prev => ({...prev, requester: e.target.value}))}>
                <option>Employee 1</option>
                <option>Employee 2</option>
              </select>
            </div>
            <div>
              <label htmlFor="directorate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Directorate</label>
              <select id="directorate" name="directorate" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                value={request.directorate || ''}
                onChange={e => setRequest(prev => ({...prev, directorate: e.target.value}))}>
                <option>IT</option>
                <option>HR</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Requested Items</h3>
              {/* Item repeater - simplified for this example */}
              <div className="mt-4 space-y-4">
                  {request.items?.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                        <select className="flex-grow rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 shadow-sm sm:text-sm" value={item.itemName}><option>Laptop Model 1</option></select>
                        <input type="number" placeholder="Qty" className="w-24 rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm sm:text-sm" value={item.quantity} />
                        <button type="button" className="text-red-500 hover:text-red-700"><TrashIcon className="h-5 w-5"/></button>
                    </div>
                  ))}
              </div>
              <button type="button" className="mt-4 inline-flex items-center px-3 py-2 border border-dashed border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-transparent">
                  <PlusIcon className="h-5 w-5 mr-2" /> Add Item
              </button>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button type="button" onClick={() => navigate('/requests')} className="bg-white dark:bg-gray-700 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              Cancel
            </button>
            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              Save Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestFormPage;