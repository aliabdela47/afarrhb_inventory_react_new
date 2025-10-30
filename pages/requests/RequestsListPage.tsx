import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import { requestsApi } from '../../services/api';
import { Request } from '../../types';
import { useConfirmation } from '../../contexts/ConfirmationContext';

const RequestsListPage = () => {
    const navigate = useNavigate();
    const [requests, setRequests] = useState<Request[]>([]);
    const { confirm } = useConfirmation();
    
    useEffect(() => {
        requestsApi.getAll().then(setRequests);
    }, []);
    
    const statusColorMap = {
      Pending: 'bg-yellow-100 text-yellow-800',
      Approved: 'bg-green-100 text-green-800',
      Rejected: 'bg-red-100 text-red-800',
    }

    const columns = [
        { header: 'ID', accessor: 'id' as keyof Request, sortable: true },
        { header: 'Requester', accessor: 'requester' as keyof Request, sortable: true },
        { header: 'Directorate', accessor: 'directorate' as keyof Request, sortable: true },
        { header: 'Created At', accessor: (req: Request) => new Date(req.createdAt).toLocaleDateString(), sortable: true },
        {
            header: 'Status',
            accessor: (req: Request) => (
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColorMap[req.status]}`}>
                    {req.status}
                </span>
            ),
            sortable: true
        },
    ];

    const handleView = (r: Request) => navigate(`/requests/view/${r.id}`);
    const handleEdit = (r: Request) => navigate(`/requests/edit/${r.id}`);
    const handleDelete = async (r: Request) => {
        const confirmed = await confirm({
            title: 'Delete Request',
            message: <>Are you sure you want to delete <strong>Request #{r.id}</strong>? This action cannot be undone.</>
        });
        if (confirmed) {
            console.log(`Deleting Request #${r.id}...`);
            setRequests(prev => prev.filter(req => req.id !== r.id));
        }
    };

    return (
        <div>
            <PageHeader
                title="Requests"
                breadcrumbs={[{ name: 'Operations', href: '/requests' }, { name: 'Requests', href: '/requests' }]}
                actionButtonText="New Request"
                actionButtonLink="/requests/new"
            />
            <DataTable columns={columns} data={requests} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    );
};

export default RequestsListPage;
