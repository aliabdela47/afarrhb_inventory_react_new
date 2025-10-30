import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import { vehicleAssignmentsApi } from '../../services/api';
import { VehicleAssignment } from '../../types';
import { useConfirmation } from '../../contexts/ConfirmationContext';

const VehicleAssignmentsListPage = () => {
    const navigate = useNavigate();
    const [assignments, setAssignments] = useState<VehicleAssignment[]>([]);
    const { confirm } = useConfirmation();
    
    useEffect(() => {
        vehicleAssignmentsApi.getAll().then(setAssignments);
    }, []);

    const columns = [
        { header: 'Vehicle Plate', accessor: 'vehiclePlate' as keyof VehicleAssignment, sortable: true },
        { header: 'Driver', accessor: 'driverName' as keyof VehicleAssignment, sortable: true },
        { header: 'Destination', accessor: 'destination' as keyof VehicleAssignment, sortable: true },
        { header: 'Start Time', accessor: (a: VehicleAssignment) => new Date(a.startTime).toLocaleString(), sortable: true },
        { header: 'Status', accessor: 'status' as keyof VehicleAssignment, sortable: true },
    ];

    const handleView = (a: VehicleAssignment) => navigate(`/vehicles/assignments/view/${a.id}`);
    const handleEdit = (a: VehicleAssignment) => navigate(`/vehicles/assignments/edit/${a.id}`);
    const handleDelete = async (a: VehicleAssignment) => {
        const confirmed = await confirm({
            title: 'Delete Assignment',
            message: <>Are you sure you want to delete the assignment for <strong>{a.vehiclePlate}</strong> to <strong>{a.destination}</strong>? This action cannot be undone.</>
        });
        if (confirmed) {
            console.log(`Deleting assignment for ${a.vehiclePlate}...`);
            setAssignments(prev => prev.filter(ass => ass.id !== a.id));
        }
    };

    return (
        <div>
            <PageHeader
                title="Vehicle Assignments"
                breadcrumbs={[{ name: 'Vehicles', href: '/vehicles' }, { name: 'Assignments', href: '/vehicles/assignments' }]}
                actionButtonText="New Assignment"
                actionButtonLink="/vehicles/assignments/new"
            />
            <DataTable columns={columns} data={assignments} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    );
};

export default VehicleAssignmentsListPage;
