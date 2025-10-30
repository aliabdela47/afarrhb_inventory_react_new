import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import { vehicleGaragesApi } from '../../services/api';
import { VehicleGarage } from '../../types';

const VehicleGarageViewPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [garage, setGarage] = useState<VehicleGarage | null>(null);

    useEffect(() => {
        if (id) {
            vehicleGaragesApi.getById(Number(id)).then(setGarage);
        }
    }, [id]);

    if (!garage) {
        return <div className="p-6">Loading...</div>;
    }

    const breadcrumbs = [
        { name: 'Vehicles', href: '/vehicles' },
        { name: 'Garages', href: '/vehicles/garages' },
        { name: garage.name, href: `/vehicles/garages/view/${id}` },
    ];
    
    return (
        <div>
            <PageHeader
                title={garage.name}
                breadcrumbs={breadcrumbs}
                actionButtonText="Edit Garage"
                onActionButtonClick={() => navigate(`/vehicles/garages/edit/${id}`)}
            />
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <DetailItem label="Garage Name" value={garage.name} />
                    <DetailItem label="Location" value={garage.location} />
                    <DetailItem label="Contact Person" value={garage.contactPerson} />
                    <DetailItem label="Phone" value={garage.phone} />
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

export default VehicleGarageViewPage;
