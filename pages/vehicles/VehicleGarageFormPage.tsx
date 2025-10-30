import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import { vehicleGaragesApi } from '../../services/api';
import { VehicleGarage } from '../../types';

const VehicleGarageFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const [garage, setGarage] = useState<Partial<VehicleGarage>>({});
  
  useEffect(() => {
    if (isEditing && id) {
      vehicleGaragesApi.getById(Number(id)).then(data => {
        if (data) setGarage(data);
      });
    }
  }, [id, isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGarage(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving garage:', garage);
    navigate('/vehicles/garages');
  };

  const breadcrumbs = [
    { name: 'Vehicles', href: '/vehicles' },
    { name: 'Garages', href: '/vehicles/garages' },
    { name: isEditing ? 'Edit Garage' : 'New Garage', href: isEditing ? `/vehicles/garages/edit/${id}` : '/vehicles/garages/new' },
  ];

  return (
    <div>
      <PageHeader title={isEditing ? `Edit: ${garage.name}` : 'New Garage'} breadcrumbs={breadcrumbs} />
      
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Garage Name</label>
              <input type="text" name="name" id="name" value={garage.name || ''} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
            </div>
             <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
              <input type="text" name="location" id="location" value={garage.location || ''} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Contact Person</label>
              <input type="text" name="contactPerson" id="contactPerson" value={garage.contactPerson || ''} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
              <input type="tel" name="phone" id="phone" value={garage.phone || ''} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button type="button" onClick={() => navigate('/vehicles/garages')} className="bg-white dark:bg-gray-700 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              Cancel
            </button>
            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              Save Garage
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VehicleGarageFormPage;