import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import { requestsApi } from '../../services/api';
import { Request } from '../../types';

const RequestViewPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [request, setRequest] = useState<Request | null>(null);

    useEffect(() => {
        if (id) {
            requestsApi.getById(Number(id)).then(setRequest);
        }
    }, [id]);

    if (!request) {
        return <div className="p-6">Loading...</div>;
    }

    const breadcrumbs = [
        { name: 'Operations', href: '/requests' },
        { name: 'Requests', href: '/requests' },
        { name: `Request #${request.id}`, href: `/requests/view/${id}` },
    ];
    
    const statusColorMap = {
      Pending: 'bg-yellow-100 text-yellow-800',
      Approved: 'bg-green-100 text-green-800',
      Rejected: 'bg-red-100 text-red-800',
    };

    return (
        <div>
            <PageHeader
                title={`Request #${request.id}`}
                breadcrumbs={breadcrumbs}
                actionButtonText="Edit Request"
                onActionButtonClick={() => navigate(`/requests/edit/${id}`)}
            />
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <DetailItem label="Requester" value={request.requester} />
                    <DetailItem label="Directorate" value={request.directorate} />
                    <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</p>
                        <span className={`mt-1 px-2 inline-flex text-md leading-5 font-semibold rounded-full ${statusColorMap[request.status]}`}>
                            {request.status}
                        </span>
                    </div>
                </div>
                
                <h3 className="text-lg font-medium text-gray-900 dark:text-white border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">Requested Items</h3>
                <ul className="mt-2 divide-y divide-gray-200 dark:divide-gray-700">
                    {request.items.map((item, index) => (
                        <li key={index} className="py-2 flex justify-between">
                            <span className="text-gray-700 dark:text-gray-300">{item.itemName}</span>
                            <span className="font-semibold">{item.quantity} units</span>
                        </li>
                    ))}
                </ul>
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

export default RequestViewPage;
