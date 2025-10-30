import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import { vehiclesApi } from '../../services/api';
import { Vehicle } from '../../types';

const VehicleFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const [vehicle, setVehicle] = useState<Partial<Vehicle>>({});
  
  useEffect(() => {
    if (isEditing && id) {
      vehiclesApi.getById(Number(id)).then(data => {
        if (data) {
          // Format dates for input type="date"
          const formattedData = {
            ...data,
            lastServiceDate: data.lastServiceDate ? new Date(data.lastServiceDate).toISOString().split('T')[0] : '',
            nextServiceDate: data.nextServiceDate ? new Date(data.nextServiceDate).toISOString().split('T')[0] : '',
          };
          setVehicle(formattedData);
        }
      });
    }
  }, [id, isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setVehicle(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving vehicle:', vehicle);
    navigate('/vehicles');
  };

  const breadcrumbs = [
    { name: 'Vehicles', href: '/vehicles' },
    { name: 'Fleet', href: '/vehicles' },
    { name: isEditing ? 'Edit Vehicle' : 'New Vehicle', href: isEditing ? `/vehicles/edit/${id}` : '/vehicles/new' },
  ];

  return (
    <div>
      <PageHeader title={isEditing ? `Edit: ${vehicle.plateNumber}` : 'Create New Vehicle'} breadcrumbs={breadcrumbs} />
      
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="plateNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Plate Number</label>
              <input type="text" name="plateNumber" id="plateNumber" value={vehicle.plateNumber || ''} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="model" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Model</label>
              <input type="text" name="model" id="model" value={vehicle.model || ''} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Vehicle Type</label>
              <input type="text" name="type" id="type" value={vehicle.type || ''} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" placeholder="e.g., Sedan, SUV, Truck" />
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
              <select id="status" name="status" value={vehicle.status || 'Available'} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm">
                <option>Available</option>
                <option>In-Use</option>
                <option>Maintenance</option>
              </select>
            </div>
            <div>
              <label htmlFor="lastServiceDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Last Service Date</label>
              <input type="date" name="lastServiceDate" id="lastServiceDate" value={vehicle.lastServiceDate || ''} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="nextServiceDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Next Service Date</label>
              <input type="date" name="nextServiceDate" id="nextServiceDate" value={vehicle.nextServiceDate || ''} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button type="button" onClick={() => navigate('/vehicles')} className="bg-white dark:bg-gray-700 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              Cancel
            </button>
            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              Save Vehicle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VehicleFormPage;