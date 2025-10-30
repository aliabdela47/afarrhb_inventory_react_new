
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import { vehicleAssignmentsApi } from '../../services/api';
import { VehicleAssignment } from '../../types';
import { ethiopianCities } from '../../data/cities';

declare var L: any;

const VehicleAssignmentViewPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [assignment, setAssignment] = useState<VehicleAssignment | null>(null);
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<any>(null);

    useEffect(() => {
        if (id) {
            vehicleAssignmentsApi.getById(Number(id)).then(setAssignment);
        }
    }, [id]);

    useEffect(() => {
        if (!assignment || !mapContainerRef.current || mapRef.current) return;

        const originCity = ethiopianCities.find(c => c.name === assignment.origin);
        const destinationCity = ethiopianCities.find(c => c.name === assignment.destination);

        if (!originCity || !destinationCity) return;

        const map = L.map(mapContainerRef.current).setView([originCity.lat, originCity.lng], 7);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([originCity.lat, originCity.lng]).addTo(map).bindPopup(`<b>Origin:</b> ${originCity.name}`);
        L.marker([destinationCity.lat, destinationCity.lng]).addTo(map).bindPopup(`<b>Destination:</b> ${destinationCity.name}`);

        const latLngs = [
            [originCity.lat, originCity.lng],
            [destinationCity.lat, destinationCity.lng]
        ];
        L.polyline(latLngs, { color: '#059669', weight: 4 }).addTo(map);

        const bounds = L.latLngBounds(latLngs);
        map.fitBounds(bounds.pad(0.5));

        mapRef.current = map;

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [assignment]);

    if (!assignment) {
        return <div className="p-6">Loading...</div>;
    }

    const breadcrumbs = [
        { name: 'Vehicles', href: '/vehicles' },
        { name: 'Assignments', href: '/vehicles/assignments' },
        { name: `Assignment #${assignment.id}`, href: `/vehicles/assignments/view/${id}` },
    ];
    
    return (
        <div>
            <PageHeader
                title={`Assignment for ${assignment.vehiclePlate}`}
                breadcrumbs={breadcrumbs}
                actionButtonText="Edit Assignment"
                onActionButtonClick={() => navigate(`/vehicles/assignments/edit/${id}`)}
            />
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <DetailItem label="Vehicle Plate" value={assignment.vehiclePlate} />
                    <DetailItem label="Driver" value={assignment.driverName} />
                    <DetailItem label="Origin" value={assignment.origin} />
                    <DetailItem label="Destination" value={assignment.destination} />
                    <DetailItem label="Start Time" value={new Date(assignment.startTime).toLocaleString()} />
                    <DetailItem label="End Time" value={assignment.endTime ? new Date(assignment.endTime).toLocaleString() : 'N/A'} />
                    <DetailItem label="Status" value={assignment.status} />
                </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mt-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Trip Route</h3>
                <div ref={mapContainerRef} className="h-80 w-full rounded-lg bg-gray-200 dark:bg-gray-700" />
            </div>
        </div>
    );
};

const DetailItem = ({ label, value }: { label: string; value: string }) => (
    <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
        <p className="mt-1 text-lg text-gray-900 dark:text-white">{value}</p>
    </div>
);

export default VehicleAssignmentViewPage;
