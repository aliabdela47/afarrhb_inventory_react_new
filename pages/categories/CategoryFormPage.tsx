import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import { categoriesApi } from '../../services/api';
import { Category } from '../../types';

const CategoryFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const [category, setCategory] = useState<Partial<Category>>({});
  
  useEffect(() => {
    if (isEditing && id) {
      categoriesApi.getById(Number(id)).then(data => {
        if (data) setCategory(data);
      });
    }
  }, [id, isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCategory(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving category:', category);
    navigate('/categories');
  };

  const breadcrumbs = [
    { name: 'Inventory', href: '/items' },
    { name: 'Categories', href: '/categories' },
    { name: isEditing ? 'Edit Category' : 'New Category', href: isEditing ? `/categories/edit/${id}` : '/categories/new' },
  ];

  return (
    <div>
      <PageHeader title={isEditing ? `Edit: ${category.name}` : 'Create New Category'} breadcrumbs={breadcrumbs} />
      
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category Name</label>
              <input type="text" name="name" id="name" value={category.name || ''} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
              <textarea id="description" name="description" rows={3} value={category.description || ''} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"></textarea>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button type="button" onClick={() => navigate('/categories')} className="bg-white dark:bg-gray-700 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              Cancel
            </button>
            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              Save Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryFormPage;