
import React, { useState } from 'react';
import PageHeader from '../../components/PageHeader';
import { CameraIcon, MapPinIcon } from '../../components/icons/Icons';

const VehicleCheckinPage = () => {
    const [location, setLocation] = useState<{ lat: number, lng: number } | null>(null);
    const [isFetchingLocation, setIsFetchingLocation] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGetLocation = () => {
        setIsFetchingLocation(true);
        setError(null);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
                setIsFetchingLocation(false);
            },
            (error) => {
                setError(`Error getting location: ${error.message}`);
                setIsFetchingLocation(false);
            },
            { enableHighAccuracy: true }
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Check-in submitted!');
        // API call to submit check-in data would go here
    };

    return (
        <div>
            <PageHeader
                title="Vehicle Check-in"
                breadcrumbs={[{ name: 'Tracking', href: '/tracking/map' }, { name: 'Check-in', href: '/tracking/checkin' }]}
            />
            <div className="max-w-xl mx-auto">
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="vehicle" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Vehicle</label>
                            <select id="vehicle" name="vehicle" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm">
                                <option>AA 12345</option>
                                <option>AB 54321</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                                <button
                                    type="button"
                                    onClick={handleGetLocation}
                                    disabled={isFetchingLocation}
                                    className="relative -ml-px inline-flex items-center space-x-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 disabled:opacity-50"
                                >
                                    <MapPinIcon className="h-5 w-5 text-gray-400" />
                                    <span>{isFetchingLocation ? 'Fetching...' : 'Get Current Location'}</span>
                                </button>
                                <input
                                    type="text"
                                    name="location"
                                    id="location"
                                    readOnly
                                    value={location ? `${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}` : 'No location set'}
                                    className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                                />
                            </div>
                            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                        </div>

                        <div>
                            <label htmlFor="note" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Note</label>
                            <textarea
                                id="note"
                                name="note"
                                rows={3}
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                                placeholder="e.g., Arrived at destination, fuel stop, etc."
                            ></textarea>
                        </div>
                        
                        <div>
                             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Attach Photo (Optional)</label>
                             <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 dark:border-gray-600 px-6 pt-5 pb-6">
                                <div className="space-y-1 text-center">
                                    <CameraIcon className="mx-auto h-12 w-12 text-gray-400" />
                                    <div className="flex text-sm text-gray-600 dark:text-gray-400">
                                        <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white dark:bg-gray-800 font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2">
                                            <span>Upload a file</span>
                                            <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF up to 10MB</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-2">
                             <button
                                type="submit"
                                className="w-full inline-flex justify-center py-3 px-4 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                            >
                                Submit Check-in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default VehicleCheckinPage;
