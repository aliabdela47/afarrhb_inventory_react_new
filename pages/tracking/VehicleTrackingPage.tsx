import React, { useState, useEffect, useRef } from 'react';
import PageHeader from '../../components/PageHeader';
import { vehiclesApi, vehicleCheckinsApi } from '../../services/api';
import { Vehicle, VehicleCheckin } from '../../types';

// Let TypeScript know that Leaflet is available on the window
declare var L: any;

const VehicleTrackingPage = () => {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
    const [checkins, setCheckins] = useState<VehicleCheckin[]>([]);
    const mapRef = useRef<any>(null);
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const featureGroupRef = useRef<any>(null);

    // Effect 1: Fetch all vehicles on mount and set an initial selection
    useEffect(() => {
        vehiclesApi.getAll().then(vehicles => {
            const inUseVehicles = vehicles.filter(v => v.status === 'In-Use');
            setVehicles(vehicles);
            // Default select the first "In-Use" vehicle, or the first vehicle otherwise
            if (inUseVehicles.length > 0) {
                setSelectedVehicle(inUseVehicles[0]);
            } else if (vehicles.length > 0) {
                setSelectedVehicle(vehicles[0]);
            }
        });
    }, []);

    // Effect 2: Initialize map on mount (runs once)
    useEffect(() => {
        if (!mapContainerRef.current || mapRef.current) return;

        const map = L.map(mapContainerRef.current).setView([9.02497, 38.74689], 7); // Start with a broader view of Ethiopia
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        mapRef.current = map;
        featureGroupRef.current = L.featureGroup().addTo(map);
    }, []);

    // Effect 3: Fetch historical data when a vehicle is selected
    useEffect(() => {
        if (selectedVehicle) {
            setCheckins([]); // Clear old checkins immediately for better UX
            vehicleCheckinsApi.getByVehicleId(selectedVehicle.id).then(setCheckins);
        }
    }, [selectedVehicle]);

    // Effect 4: Draw on map whenever checkins data changes for the selected vehicle
    useEffect(() => {
        if (!mapRef.current || !featureGroupRef.current) return;
        
        featureGroupRef.current.clearLayers();

        if (checkins.length > 0) {
            const latLngs = checkins.map(c => [c.latitude, c.longitude]);
            
            // Add markers for each check-in point
            checkins.forEach(c => {
                L.marker([c.latitude, c.longitude])
                    .addTo(featureGroupRef.current)
                    .bindPopup(`<b>${c.vehiclePlate}</b><br>${new Date(c.timestamp).toLocaleString()}<br><em>${c.note || 'No note.'}</em>`);
            });

            // Add a polyline to show the route
            L.polyline(latLngs, { color: '#059669', weight: 5, opacity: 0.8 }).addTo(featureGroupRef.current);
            
            // Zoom and center the map to show the entire route
            mapRef.current.fitBounds(featureGroupRef.current.getBounds().pad(0.1));
        }
    }, [checkins]);

    // Effect 5: Live update simulation
    useEffect(() => {
        const intervalId = setInterval(async () => {
            const newPoint = await vehicleCheckinsApi.getLiveUpdate();
            
            // Check if the update is for the currently selected vehicle
            if (newPoint && selectedVehicle && newPoint.vehicleId === selectedVehicle.id) {
                // Add the new point to the list, triggering a redraw
                setCheckins(prev => [...prev, newPoint]);
                // Pan the map smoothly to the new location
                if (mapRef.current) {
                    mapRef.current.panTo([newPoint.latitude, newPoint.longitude]);
                }
            }
        }, 5000); // Check for new updates every 5 seconds

        return () => clearInterval(intervalId); // Cleanup on component unmount or when selectedVehicle changes
    }, [selectedVehicle]); // Restart the interval if the selected vehicle changes


    return (
        <div className="flex flex-col h-full">
            <PageHeader
                title="Vehicle Live Map"
                breadcrumbs={[{ name: 'Tracking', href: '/tracking/map' }, { name: 'Live Map', href: '/tracking/map' }]}
            />
            <div className="flex-grow grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3 bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
                    <div ref={mapContainerRef} className="h-full w-full" style={{minHeight: '500px'}}>
                        {/* Leaflet Map is rendered here */}
                    </div>
                </div>
                <div className="lg:col-span-1 bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 flex flex-col">
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex-shrink-0">Vehicle List</h3>
                    <div className="overflow-y-auto">
                        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                            {vehicles.map(v => (
                                <li 
                                    key={v.id} 
                                    onClick={() => setSelectedVehicle(v)}
                                    className={`py-3 px-2 rounded-md cursor-pointer transition-colors duration-150 ${selectedVehicle?.id === v.id ? 'bg-primary-100 dark:bg-primary-900' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                                >
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">{v.plateNumber}</p>
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            v.status === 'In-Use' ? 'bg-yellow-100 text-yellow-800' :
                                            v.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                            {v.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{v.currentDriver || 'No driver assigned'}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VehicleTrackingPage;