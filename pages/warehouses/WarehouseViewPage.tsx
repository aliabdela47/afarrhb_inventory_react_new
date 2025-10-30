import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import { warehousesApi } from '../../services/api';
import { Warehouse } from '../../types';

const WarehouseViewPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [warehouse, setWarehouse] = useState<Warehouse | null>(null);

    useEffect(() => {
        if (id) {
            warehousesApi.getById(Number(id)).then(setWarehouse);
        }
    }, [id]);

    if (!warehouse) {
        return <div className="p-6">Loading...</div>;
    }

    const breadcrumbs = [
        { name: 'Inventory', href: '/items' },
        { name: 'Warehouses', href: '/warehouses' },
        { name: warehouse.name, href: `/warehouses/view/${id}` },
    ];

    return (
        <div>
            <PageHeader
                title={warehouse.name}
                breadcrumbs={breadcrumbs}
                actionButtonText="Edit Warehouse"
                onActionButtonClick={() => navigate(`/warehouses/edit/${id}`)}
            />
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <DetailItem label="Warehouse Name" value={warehouse.name} />
                    <DetailItem label="Location" value={warehouse.location} />
                    <DetailItem label="Manager" value={warehouse.manager} />
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

export default WarehouseViewPage;
