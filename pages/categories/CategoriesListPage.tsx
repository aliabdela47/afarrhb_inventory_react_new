import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import { categoriesApi } from '../../services/api';
import { Category } from '../../types';
import { useConfirmation } from '../../contexts/ConfirmationContext';

const CategoriesListPage = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState<Category[]>([]);
    const { confirm } = useConfirmation();
    
    useEffect(() => {
        categoriesApi.getAll().then(setCategories);
    }, []);

    const columns = [
        { header: 'Name', accessor: 'name' as keyof Category, sortable: true },
        { header: 'Description', accessor: 'description' as keyof Category, sortable: false },
    ];

    const handleView = (category: Category) => navigate(`/categories/view/${category.id}`);
    const handleEdit = (category: Category) => navigate(`/categories/edit/${category.id}`);
    const handleDelete = async (category: Category) => {
        const confirmed = await confirm({
            title: 'Delete Category',
            message: <>Are you sure you want to delete <strong>{category.name}</strong>? This action cannot be undone.</>
        });
        if (confirmed) {
            console.log(`Deleting ${category.name}...`);
            setCategories(prev => prev.filter(c => c.id !== category.id));
        }
    };

    return (
        <div>
            <PageHeader
                title="Categories"
                breadcrumbs={[{ name: 'Inventory', href: '/items' }, { name: 'Categories', href: '/categories' }]}
                actionButtonText="Add New Category"
                actionButtonLink="/categories/new"
            />
            <DataTable columns={columns} data={categories} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    );
};

export default CategoriesListPage;
