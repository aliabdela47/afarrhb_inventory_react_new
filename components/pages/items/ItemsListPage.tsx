
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import { getItems } from '../../services/api';
import { Item } from '../../types';

const ItemsListPage = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState<Item[]>([]);
    
    useEffect(() => {
        getItems().then(setItems);
    }, []);

    const columns = [
        { header: 'Name', accessor: 'name' as keyof Item, sortable: true },
        { header: 'Code', accessor: 'code' as keyof Item, sortable: true },
        { header: 'Category', accessor: 'category' as keyof Item, sortable: true },
        { header: 'Stock', accessor: 'currentStock' as keyof Item, sortable: true },
        { header: 'Warehouse', accessor: 'warehouse' as keyof Item, sortable: true },
    ];

    const handleView = (item: Item) => navigate(`/items/view/${item.id}`);
    const handleEdit = (item: Item) => navigate(`/items/edit/${item.id}`);
    const handleDelete = (item: Item) => alert(`Delete ${item.name}?`);

    return (
        <div>
            <PageHeader
                title="Items"
                breadcrumbs={[{ name: 'Inventory', href: '/items' }, { name: 'Items', href: '/items' }]}
                actionButtonText="Add New Item"
                actionButtonLink="/items/new"
            />
            <DataTable columns={columns} data={items} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    );
};

export default ItemsListPage;
