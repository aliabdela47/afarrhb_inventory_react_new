import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import { issuancesApi } from '../../services/api';
import { Issuance } from '../../types';

const IssuanceViewPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [issuance, setIssuance] = useState<Issuance | null>(null);

    useEffect(() => {
        if (id) {
            issuancesApi.getById(Number(id)).then(setIssuance);
        }
    }, [id]);

    if (!issuance) {
        return <div className="p-6">Loading...</div>;
    }

    const breadcrumbs = [
        { name: 'Operations', href: '/requests' },
        { name: 'Issuances', href: '/issuances' },
        { name: `Issuance #${issuance.id}`, href: `/issuances/view/${id}` },
    ];
    
    return (
        <div>
            <PageHeader
                title={`Issuance #${issuance.id}`}
                breadcrumbs={breadcrumbs}
                actionButtonText="Edit Issuance"
                onActionButtonClick={() => navigate(`/issuances/edit/${id}`)}
            />
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <DetailItem label="Issued To" value={issuance.issuedTo} />
                    <DetailItem label="Related Request" value={issuance.requestId ? `#${issuance.requestId}` : 'N/A'} />
                    <DetailItem label="Status" value={issuance.status} />
                </div>
                
                <h3 className="text-lg font-medium text-gray-900 dark:text-white border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">Issued Items</h3>
                <ul className="mt-2 divide-y divide-gray-200 dark:divide-gray-700">
                    {issuance.items.map((item, index) => (
                        <li key={index} className="py-2 flex justify-between">
                            <span className="text-gray-700 dark:text-gray-300">{item.itemName}</span>
                            <span className="font-semibold">{item.quantityIssued} units</span>
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

export default IssuanceViewPage;
