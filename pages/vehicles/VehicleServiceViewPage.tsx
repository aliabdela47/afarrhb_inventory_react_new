import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import { vehicleServicesApi } from '../../services/api';
import { VehicleService } from '../../types';

const VehicleServiceViewPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [service, setService] = useState<VehicleService | null>(null);

    useEffect(() => {
        if (id) {
            vehicleServicesApi.getById(Number(id)).then(setService);
        }
    }, [id]);

    if (!service) {
        return <div className="p-6">Loading...</div>;
    }

    const breadcrumbs = [
        { name: 'Vehicles', href: '/vehicles' },
        { name: 'Services', href: '/vehicles/services' },
        { name: `Service for ${service.vehiclePlate}`, href: `/vehicles/services/view/${id}` },
    ];
    
    return (
        <div>
            <PageHeader
                title={`Service for ${service.vehiclePlate}`}
                breadcrumbs={breadcrumbs}
                actionButtonText="Edit Service Record"
                onActionButtonClick={() => navigate(`/vehicles/services/edit/${id}`)}
            />
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <DetailItem label="Vehicle Plate" value={service.vehiclePlate} />
                    <DetailItem label="Garage" value={service.garage} />
                    <DetailItem label="Service Date" value={new Date(service.serviceDate).toLocaleDateString()} />
                    <DetailItem label="Cost" value={`$${service.cost.toFixed(2)}`} />
                    <DetailItem label="Next Service Date" value={new Date(service.nextServiceDate).toLocaleDateString()} />
                    <div className="md:col-span-2">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Description</p>
                        <p className="mt-1 text-lg text-gray-900 dark:text-white">{service.description}</p>
                    </div>
                </div>
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

export default VehicleServiceViewPage;
