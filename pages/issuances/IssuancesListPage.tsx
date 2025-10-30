import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import { issuancesApi } from '../../services/api';
import { Issuance } from '../../types';
import { useConfirmation } from '../../contexts/ConfirmationContext';

const IssuancesListPage = () => {
    const navigate = useNavigate();
    const [issuances, setIssuances] = useState<Issuance[]>([]);
    const { confirm } = useConfirmation();
    
    useEffect(() => {
        issuancesApi.getAll().then(setIssuances);
    }, []);

    const columns = [
        { header: 'ID', accessor: 'id' as keyof Issuance, sortable: true },
        { header: 'Request ID', accessor: (iss: Issuance) => (iss.requestId ? `#${iss.requestId}`: 'N/A'), sortable: true },
        { header: 'Issued To', accessor: 'issuedTo' as keyof Issuance, sortable: true },
        { header: 'Issued At', accessor: (iss: Issuance) => new Date(iss.issuedAt).toLocaleDateString(), sortable: true },
        { header: 'Status', accessor: 'status' as keyof Issuance, sortable: true },
    ];

    const handleView = (i: Issuance) => navigate(`/issuances/view/${i.id}`);
    const handleEdit = (i: Issuance) => navigate(`/issuances/edit/${i.id}`);
    const handleDelete = async (i: Issuance) => {
         const confirmed = await confirm({
            title: 'Delete Issuance',
            message: <>Are you sure you want to delete <strong>Issuance #{i.id}</strong>? This action cannot be undone.</>
        });
        if (confirmed) {
            console.log(`Deleting Issuance #${i.id}...`);
            setIssuances(prev => prev.filter(iss => iss.id !== i.id));
        }
    };

    return (
        <div>
            <PageHeader
                title="Issuances"
                breadcrumbs={[{ name: 'Operations', href: '/requests' }, { name: 'Issuances', href: '/issuances' }]}
                actionButtonText="New Issuance"
                actionButtonLink="/issuances/new"
            />
            <DataTable columns={columns} data={issuances} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    );
};

export default IssuancesListPage;
