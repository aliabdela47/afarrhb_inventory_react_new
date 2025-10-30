
import React from 'react';
import PageHeader from '../../components/PageHeader';
import { TruckIcon } from '../../components/icons/Icons';

const mockVehicles = [
    { id: 1, plate: 'AA 12345', status: 'In-Use', driver: 'John Doe' },
    { id: 2, plate: 'AB 54321', status: 'Available', driver: null },
    { id: 3, plate: 'AC 98765', status: 'Maintenance', driver: null },
    { id: 4, plate: 'AD 13579', status: 'In-Use', driver: 'Jane Smith' },
];

const VehicleTrackingPage = () => {
    return (
        <div className="flex flex-col h-full">
            <PageHeader
                title="Vehicle Live Map"
                breadcrumbs={[{ name: 'Tracking', href: '/tracking/map' }, { name: 'Live Map', href: '/tracking/map' }]}
            />
            <div className="flex-grow grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3 bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
                    {/* Map Placeholder */}
                    <div className="h-full w-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <p className="text-gray-500">Map Area - Leaflet.js would be integrated here.</p>
                        {/* Example marker */}
                        <div className="absolute" style={{top: '40%', left: '50%'}}>
                            <TruckIcon className="h-8 w-8 text-primary-500" />
                        </div>
                         <div className="absolute" style={{top: '60%', left: '65%'}}>
                            <TruckIcon className="h-8 w-8 text-yellow-500" />
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-1 bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 flex flex-col">
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Vehicle List</h3>
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700 overflow-y-auto">
                        {mockVehicles.map(v => (
                            <li key={v.id} className="py-3 px-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md cursor-pointer">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">{v.plate}</p>
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        v.status === 'In-Use' ? 'bg-yellow-100 text-yellow-800' :
                                        v.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                        {v.status}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{v.driver || 'No driver assigned'}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default VehicleTrackingPage;
