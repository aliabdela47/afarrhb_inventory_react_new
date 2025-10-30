import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import { directoratesApi } from '../../services/api';
import { Directorate } from '../../types';
import { useConfirmation } from '../../contexts/ConfirmationContext';

const DirectoratesListPage = () => {
    const navigate = useNavigate();
    const [directorates, setDirectorates] = useState<Directorate[]>([]);
    const { confirm } = useConfirmation();
    
    useEffect(() => {
        directoratesApi.getAll().then(setDirectorates);
    }, []);

    const columns = [
        { header: 'Name', accessor: 'name' as keyof Directorate, sortable: true },
        { header: 'Manager', accessor: 'manager' as keyof Directorate, sortable: true },
    ];

    const handleView = (d: Directorate) => navigate(`/directorates/view/${d.id}`);
    const handleEdit = (d: Directorate) => navigate(`/directorates/edit/${d.id}`);
    const handleDelete = async (d: Directorate) => {
        const confirmed = await confirm({
            title: 'Delete Directorate',
            message: <>Are you sure you want to delete <strong>{d.name}</strong>? This action cannot be undone.</>
        });
        if (confirmed) {
            console.log(`Deleting ${d.name}...`);
            setDirectorates(prev => prev.filter(dir => dir.id !== d.id));
        }
    };

    return (
        <div>
            <PageHeader
                title="Directorates"
                breadcrumbs={[{ name: 'Personnel', href: '/employees' }, { name: 'Directorates', href: '/directorates' }]}
                actionButtonText="Add New Directorate"
                actionButtonLink="/directorates/new"
            />
            <DataTable columns={columns} data={directorates} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    );
};

export default DirectoratesListPage;
