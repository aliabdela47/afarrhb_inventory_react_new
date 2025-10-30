import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import { getItems } from '../../services/api';
import { Item } from '../../types';
import { MagnifyingGlassIcon } from '../../components/icons/Icons';
import { useConfirmation } from '../../contexts/ConfirmationContext';

const ItemsListPage = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState<Item[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [filterWarehouse, setFilterWarehouse] = useState('');
    const { confirm } = useConfirmation();
    
    useEffect(() => {
        getItems().then(setItems);
    }, []);

    const uniqueCategories = useMemo(() => {
        const categories = new Set(items.map(item => item.category));
        return Array.from(categories);
    }, [items]);

    const uniqueWarehouses = useMemo(() => {
        const warehouses = new Set(items.map(item => item.warehouse));
        return Array.from(warehouses);
    }, [items]);

    const filteredItems = useMemo(() => {
        return items.filter(item => {
            const searchMatch = searchTerm.toLowerCase() === '' ||
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.code.toLowerCase().includes(searchTerm.toLowerCase());
            
            const categoryMatch = filterCategory === '' || item.category === filterCategory;
            const warehouseMatch = filterWarehouse === '' || item.warehouse === filterWarehouse;

            return searchMatch && categoryMatch && warehouseMatch;
        });
    }, [items, searchTerm, filterCategory, filterWarehouse]);

    const handleClearFilters = () => {
        setSearchTerm('');
        setFilterCategory('');
        setFilterWarehouse('');
    };

    const columns = [
        { header: 'Name', accessor: 'name' as keyof Item, sortable: true },
        { header: 'Code', accessor: 'code' as keyof Item, sortable: true },
        { header: 'Category', accessor: 'category' as keyof Item, sortable: true },
        { header: 'Stock', accessor: 'currentStock' as keyof Item, sortable: true },
        { header: 'Warehouse', accessor: 'warehouse' as keyof Item, sortable: true },
    ];

    const handleView = (item: Item) => navigate(`/items/view/${item.id}`);
    const handleEdit = (item: Item) => navigate(`/items/edit/${item.id}`);
    const handleDelete = async (item: Item) => {
        const confirmed = await confirm({
            title: 'Delete Item',
            message: <>Are you sure you want to delete <strong>{item.name}</strong>? This action cannot be undone.</>
        });
        if (confirmed) {
            console.log(`Deleting ${item.name}...`);
            // Here you would call the API to delete the item
            // e.g., itemsApi.delete(item.id).then(() => { ... });
            setItems(prevItems => prevItems.filter(i => i.id !== item.id));
        }
    };

    return (
        <div>
            <PageHeader
                title="Items"
                breadcrumbs={[{ name: 'Inventory', href: '/items' }, { name: 'Items', href: '/items' }]}
                actionButtonText="Add New Item"
                actionButtonLink="/items/new"
            />

            {/* Filter Section */}
            <div className="mb-4 p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-2">
                        <label htmlFor="search" className="sr-only">Search</label>
                        <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="search"
                                name="search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="block w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:text-gray-900 dark:focus:text-white focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                                placeholder="Search by name or code..."
                                type="search"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="category" className="sr-only">Category</label>
                        <select 
                            id="category" 
                            name="category"
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm">
                            <option value="">All Categories</option>
                            {uniqueCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="warehouse" className="sr-only">Warehouse</label>
                        <select 
                            id="warehouse" 
                            name="warehouse"
                            value={filterWarehouse}
                            onChange={(e) => setFilterWarehouse(e.target.value)}
                            className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm">
                            <option value="">All Warehouses</option>
                            {uniqueWarehouses.map(wh => <option key={wh} value={wh}>{wh}</option>)}
                        </select>
                    </div>
                     <div className="md:col-start-4 flex justify-end">
                        <button
                            onClick={handleClearFilters}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                            Clear Filters
                        </button>
                    </div>
                </div>
            </div>

            <DataTable columns={columns} data={filteredItems} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    );
};

export default ItemsListPage;
