import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import { itemsApi } from '../../services/api';
import { Item } from '../../types';

const ItemFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const [item, setItem] = useState<Partial<Item>>({
    name: '',
    code: '',
    category: 'Electronics',
    warehouse: 'Main Warehouse',
    currentStock: 0,
    lowStockThreshold: 5,
    description: ''
  });

  useEffect(() => {
    if (isEditing && id) {
      itemsApi.getById(Number(id)).then(data => {
        if (data) setItem(data);
      });
    }
  }, [id, isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setItem(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd have different logic for create vs. update
    console.log('Saving item:', item);
    navigate('/items');
  };

  const breadcrumbs = [
    { name: 'Inventory', href: '/items' },
    { name: 'Items', href: '/items' },
    { name: isEditing ? 'Edit Item' : 'New Item', href: isEditing ? `/items/edit/${id}` : '/items/new' },
  ];

  return (
    <div>
      <PageHeader title={isEditing ? `Edit Item: ${item.name}` : 'Create New Item'} breadcrumbs={breadcrumbs} />
      
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Item Name</label>
              <input type="text" name="name" id="name" value={item.name || ''} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
            </div>

            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Item Code</label>
              <input type="text" name="code" id="code" value={item.code || ''} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
              <select id="category" name="category" value={item.category || ''} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm">
                <option>Electronics</option>
                <option>Furniture</option>
                <option>Office Supplies</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="warehouse" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Warehouse</label>
              <select id="warehouse" name="warehouse" value={item.warehouse || ''} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm">
                <option>Main Warehouse</option>
                <option>Warehouse B</option>
              </select>
            </div>

            <div>
              <label htmlFor="currentStock" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Current Stock</label>
              <input type="number" name="currentStock" id="currentStock" value={item.currentStock || 0} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
            </div>

            <div>
              <label htmlFor="lowStockThreshold" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Low Stock Threshold</label>
              <input type="number" name="lowStockThreshold" id="lowStockThreshold" value={item.lowStockThreshold || 0} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
              <textarea id="description" name="description" rows={3} value={item.description || ''} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"></textarea>
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