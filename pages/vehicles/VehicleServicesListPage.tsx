import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import { vehicleServicesApi } from '../../services/api';
import { VehicleService } from '../../types';
import { useConfirmation } from '../../contexts/ConfirmationContext';

const VehicleServicesListPage = () => {
    const navigate = useNavigate();
    const [services, setServices] = useState<VehicleService[]>([]);
    const { confirm } = useConfirmation();
    
    useEffect(() => {
        vehicleServicesApi.getAll().then(setServices);
    }, []);

    const columns = [
        { header: 'Vehicle Plate', accessor: 'vehiclePlate' as keyof VehicleService, sortable: true },
        { header: 'Garage', accessor: 'garage' as keyof VehicleService, sortable: true },
        { header: 'Service Date', accessor: (s: VehicleService) => new Date(s.serviceDate).toLocaleDateString(), sortable: true },
        { header: 'Cost', accessor: (s: VehicleService) => `$${s.cost.toFixed(2)}`, sortable: true },
        { header: 'Next Service', accessor: (s: VehicleService) => new Date(s.nextServiceDate).toLocaleDateString(), sortable: true },
    ];

    const handleView = (s: VehicleService) => navigate(`/vehicles/services/view/${s.id}`);
    const handleEdit = (s: VehicleService) => navigate(`/vehicles/services/edit/${s.id}`);
    const handleDelete = async (s: VehicleService) => {
        const confirmed = await confirm({
            title: 'Delete Service Record',
            message: <>Are you sure you want to delete the service record for <strong>{s.vehiclePlate}</strong> on {new Date(s.serviceDate).toLocaleDateString()}? This action cannot be undone.</>
        });
        if (confirmed) {
            console.log(`Deleting service record for ${s.vehiclePlate}...`);
            setServices(prev => prev.filter(srv => srv.id !== s.id));
        }
    };

    return (
        <div>
            <PageHeader
                title="Vehicle Services"
                breadcrumbs={[{ name: 'Vehicles', href: '/vehicles' }, { name: 'Services', href: '/vehicles/services' }]}
                actionButtonText="New Service Record"
                actionButtonLink="/vehicles/services/new"
            />
            <DataTable columns={columns} data={services} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    );
};

export default VehicleServicesListPage;
