import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import { vehicleGaragesApi } from '../../services/api';
import { VehicleGarage } from '../../types';
import { useConfirmation } from '../../contexts/ConfirmationContext';

const VehicleGaragesListPage = () => {
    const navigate = useNavigate();
    const [garages, setGarages] = useState<VehicleGarage[]>([]);
    const { confirm } = useConfirmation();
    
    useEffect(() => {
        vehicleGaragesApi.getAll().then(setGarages);
    }, []);

    const columns = [
        { header: 'Name', accessor: 'name' as keyof VehicleGarage, sortable: true },
        { header: 'Location', accessor: 'location' as keyof VehicleGarage, sortable: true },
        { header: 'Contact Person', accessor: 'contactPerson' as keyof VehicleGarage, sortable: true },
        { header: 'Phone', accessor: 'phone' as keyof VehicleGarage, sortable: false },
    ];

    const handleView = (g: VehicleGarage) => navigate(`/vehicles/garages/view/${g.id}`);
    const handleEdit = (g: VehicleGarage) => navigate(`/vehicles/garages/edit/${g.id}`);
    const handleDelete = async (g: VehicleGarage) => {
        const confirmed = await confirm({
            title: 'Delete Garage',
            message: <>Are you sure you want to delete <strong>{g.name}</strong>? This action cannot be undone.</>
        });
        if (confirmed) {
            console.log(`Deleting ${g.name}...`);
            setGarages(prev => prev.filter(grg => grg.id !== g.id));
        }
    };

    return (
        <div>
            <PageHeader
                title="Vehicle Garages"
                breadcrumbs={[{ name: 'Vehicles', href: '/vehicles' }, { name: 'Garages', href: '/vehicles/garages' }]}
                actionButtonText="Add New Garage"
                actionButtonLink="/vehicles/garages/new"
            />
            <DataTable columns={columns} data={garages} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    );
};

export default VehicleGaragesListPage;
