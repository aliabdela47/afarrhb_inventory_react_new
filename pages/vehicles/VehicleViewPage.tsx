import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import { vehiclesApi } from '../../services/api';
import { Vehicle } from '../../types';

const VehicleViewPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [vehicle, setVehicle] = useState<Vehicle | null>(null);

    useEffect(() => {
        if (id) {
            vehiclesApi.getById(Number(id)).then(setVehicle);
        }
    }, [id]);

    if (!vehicle) {
        return <div className="p-6">Loading...</div>;
    }

    const breadcrumbs = [
        { name: 'Vehicles', href: '/vehicles' },
        { name: 'Fleet', href: '/vehicles' },
        { name: vehicle.plateNumber, href: `/vehicles/view/${id}` },
    ];

    const statusColorMap = {
      Available: 'bg-green-100 text-green-800',
      'In-Use': 'bg-yellow-100 text-yellow-800',
      Maintenance: 'bg-red-100 text-red-800',
    };

    return (
        <div>
            <PageHeader
                title={vehicle.plateNumber}
                breadcrumbs={breadcrumbs}
                actionButtonText="Edit Vehicle"
                onActionButtonClick={() => navigate(`/vehicles/edit/${id}`)}
            />
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <DetailItem label="Model" value={vehicle.model} />
                    <DetailItem label="Type" value={vehicle.type} />
                    <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</p>
                        <span className={`mt-1 px-2 inline-flex text-md leading-5 font-semibold rounded-full ${statusColorMap[vehicle.status]}`}>
                            {vehicle.status}
                        </span>
                    </div>
                    <DetailItem label="Current Driver" value={vehicle.currentDriver || 'N/A'} />
                    <DetailItem label="Last Service" value={new Date(vehicle.lastServiceDate).toLocaleDateString()} />
                    <DetailItem label="Next Service" value={new Date(vehicle.nextServiceDate).toLocaleDateString()} />
                </div>
            </div>
            {/* TODO: Add sections for assignment history and service logs */}
        </div>
    );
};

const DetailItem = ({ label, value }: { label: string; value: string }) => (
    <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
        <p className="mt-1 text-lg text-gray-900 dark:text-white">{value}</p>
    </div>
);

export default VehicleViewPage;
