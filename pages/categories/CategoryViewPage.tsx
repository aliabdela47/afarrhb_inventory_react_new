import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import { categoriesApi } from '../../services/api';
import { Category } from '../../types';

const CategoryViewPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [category, setCategory] = useState<Category | null>(null);

    useEffect(() => {
        if (id) {
            categoriesApi.getById(Number(id)).then(setCategory);
        }
    }, [id]);

    if (!category) {
        return <div className="p-6">Loading...</div>;
    }

    const breadcrumbs = [
        { name: 'Inventory', href: '/items' },
        { name: 'Categories', href: '/categories' },
        { name: category.name, href: `/categories/view/${id}` },
    ];

    return (
        <div>
            <PageHeader
                title={category.name}
                breadcrumbs={breadcrumbs}
                actionButtonText="Edit Category"
                onActionButtonClick={() => navigate(`/categories/edit/${id}`)}
            />
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <strong className="text-gray-500 dark:text-gray-400">Category Name:</strong>
                        <p className="text-lg">{category.name}</p>
                    </div>
                    <div>
                        <strong className="text-gray-500 dark:text-gray-400">Description:</strong>
                        <p>{category.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryViewPage;
