
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';

const ItemFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to save item
    navigate('/items');
  };

  const breadcrumbs = [
    { name: 'Inventory', href: '/items' },
    { name: 'Items', href: '/items' },
    { name: isEditing ? 'Edit Item' : 'New Item', href: isEditing ? `/items/edit/${id}` : '/items/new' },
  ];

  return (
    <div>
      <PageHeader title={isEditing ? 'Edit Item' : 'Create New Item'} breadcrumbs={breadcrumbs} />
      
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Form Fields */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Item Name</label>
              <input type="text" name="name" id="name" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
            </div>

            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Item Code</label>
              <input type="text" name="code" id="code" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
              <select id="category" name="category" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm">
                <option>Electronics</option>
                <option>Furniture</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="warehouse" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Warehouse</label>
              <select id="warehouse" name="warehouse" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm">
                <option>Main Warehouse</option>
                <option>Warehouse B</option>
              </select>
            </div>

            <div>
              <label htmlFor="currentStock" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Current Stock</label>
              <input type="number" name="currentStock" id="currentStock" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
            </div>

            <div>
              <label htmlFor="lowStockThreshold" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Low Stock Threshold</label>
              <input type="number" name="lowStockThreshold" id="lowStockThreshold" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
              <textarea id="description" name="description" rows={3} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"></textarea>
            </div>

          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button type="button" onClick={() => navigate('/items')} className="bg-white dark:bg-gray-700 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              Cancel
            </button>
            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItemFormPage;
