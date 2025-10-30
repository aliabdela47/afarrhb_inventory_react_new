
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import { getItemById } from '../../services/api';
import { Item } from '../../types';

const ItemViewPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState<Item | null>(null);

    useEffect(() => {
        if (id) {
            getItemById(Number(id)).then(setItem);
        }
    }, [id]);

    if (!item) {
        return <div>Loading...</div>;
    }

    const breadcrumbs = [
        { name: 'Inventory', href: '/items' },
        { name: 'Items', href: '/items' },
        { name: item.name, href: `/items/view/${id}` },
    ];

    return (
        <div>
            <PageHeader
                title={item.name}
                breadcrumbs={breadcrumbs}
                actionButtonText="Edit Item"
                onActionButtonClick={() => navigate(`/items/edit/${id}`)}
            />
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><strong className="text-gray-500 dark:text-gray-400">Item Code:</strong> {item.code}</div>
                    <div><strong className="text-gray-500 dark:text-gray-400">Category:</strong> {item.category}</div>
                    <div><strong className="text-gray-500 dark:text-gray-400">Current Stock:</strong> {item.currentStock} {item.unit}</div>
                    <div><strong className="text-gray-500 dark:text-gray-400">Warehouse:</strong> {item.warehouse}</div>
                    <div><strong className="text-gray-500 dark:text-gray-400">Low Stock Threshold:</strong> {item.lowStockThreshold}</div>
                    <div className="md:col-span-2"><strong className="text-gray-500 dark:text-gray-400">Description:</strong> {item.description}</div>
                </div>
            </div>
            {/* TODO: Add item history/logs section */}
        </div>
    );
};

export default ItemViewPage;
