
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import { vehicleAssignmentsApi } from '../../services/api';
import { VehicleAssignment, City } from '../../types';
import { ethiopianCities } from '../../data/cities';
import SearchableSelect from '../../components/SearchableSelect';

declare var L: any;

const VehicleAssignmentFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const [assignment, setAssignment] = useState<Partial<VehicleAssignment>>({});
  
  const [originCoords, setOriginCoords] = useState<City | null>(null);
  const [destCoords, setDestCoords] = useState<City | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const featureGroupRef = useRef<any>(null);

  const cityOptions = ethiopianCities.map(city => ({ value: city.name, label: city.name }));
  
  useEffect(() => {
    if (isEditing && id) {
      vehicleAssignmentsApi.getById(Number(id)).then(data => {
        if (data) {
           const formattedData = {
            ...data,
            startTime: data.startTime ? new Date(data.startTime).toISOString().slice(0, 16) : '',
            endTime: data.endTime ? new Date(data.endTime).toISOString().slice(0, 16) : '',
          };
          setAssignment(formattedData);
        }
      });
    }
  }, [id, isEditing]);
  
  useEffect(() => {
    const origin = ethiopianCities.find(c => c.name === assignment.origin);
    setOriginCoords(origin || null);
    
    const destination = ethiopianCities.find(c => c.name === assignment.destination);
    setDestCoords(destination || null);
  }, [assignment.origin, assignment.destination]);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;
    const map = L.map(mapContainerRef.current).setView([9.025, 38.7469], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    mapRef.current = map;
    featureGroupRef.current = L.featureGroup().addTo(map);
  }, []);

  useEffect(() => {
    if (!mapRef.current || !featureGroupRef.current) return;
    
    featureGroupRef.current.clearLayers();
    
    const markers = [];
    if (originCoords) {
        const marker = L.marker([originCoords.lat, originCoords.lng]).bindPopup(`<b>Origin:</b> ${originCoords.name}`);
        featureGroupRef.current.addLayer(marker);
        markers.push(marker);
    }
    if (destCoords) {
        const marker = L.marker([destCoords.lat, destCoords.lng]).bindPopup(`<b>Destination:</b> ${destCoords.name}`);
        featureGroupRef.current.addLayer(marker);
        markers.push(marker);
    }

    if (originCoords && destCoords) {
        const latLngs = [
            [originCoords.lat, originCoords.lng],
            [destCoords.lat, destCoords.lng]
        ];
        L.polyline(latLngs, { color: '#059669', weight: 4 }).addTo(featureGroupRef.current);
    }
    
    if (markers.length > 0) {
        const bounds = featureGroupRef.current.getBounds();
        mapRef.current.fitBounds(bounds.pad(0.5));
    } else {
        mapRef.current.setView([9.025, 38.7469], 6);
    }
  }, [originCoords, destCoords]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAssignment(prev => ({ ...prev, [name]: value }));
  };

  const handleCityChange = (fieldName: 'origin' | 'destination') => (value: string) => {
    setAssignment(prev => ({ ...prev, [fieldName]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving assignment:', assignment);
    navigate('/vehicles/assignments');
  };

  const breadcrumbs = [
    { name: 'Vehicles', href: '/vehicles' },
    { name: 'Assignments', href: '/vehicles/assignments' },
    { name: isEditing ? 'Edit Assignment' : 'New Assignment', href: isEditing ? `/vehicles/assignments/edit/${id}` : '/vehicles/assignments/new' },
  ];

  return (
    <div>
      <PageHeader title={isEditing ? `Edit Assignment #${id}` : 'New Assignment'} breadcrumbs={breadcrumbs} />
      
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="vehicleId" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Vehicle</label>
              <select id="vehicleId" name="vehicleId" value={assignment.vehicleId || ''} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm">
                <option value="1">AA 1000</option>
                <option value="2">AA 1001</option>
              </select>
            </div>
             <div>
              <label htmlFor="driverId" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Driver</label>
              <select id="driverId" name="driverId" value={assignment.driverId || ''} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm">
                <option value="1">Driver 1</option>
                <option value="2">Driver 2</option>
              </select>
            </div>
            <SearchableSelect
              id="origin"
              label="Origin"
              options={cityOptions}
              value={assignment.origin || ''}
              onChange={handleCityChange('origin')}
              placeholder="Type to search for a city..."
            />
            <SearchableSelect
              id="destination"
              label="Destination"
              options={cityOptions}
              value={assignment.destination || ''}
              onChange={handleCityChange('destination')}
              placeholder="Type to search for a city..."
            />
            <div>
              <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Start Time</label>
              <input type="datetime-local" name="startTime" id="startTime" value={assignment.startTime || ''} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300">End Time (Optional)</label>
              <input type="datetime-local" name="endTime" id="endTime" value={assignment.endTime || ''} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button type="button" onClick={() => navigate('/vehicles/assignments')} className="bg-white dark:bg-gray-700 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              Cancel
            </button>
            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              Save Assignment
            </button>
          </div>
        </form>
      </div>
      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Route Preview</h3>
        <div ref={mapContainerRef} className="h-80 w-full rounded-lg bg-gray-200 dark:bg-gray-700" />
      </div>
    </div>
  );
};

export default VehicleAssignmentFormPage;
