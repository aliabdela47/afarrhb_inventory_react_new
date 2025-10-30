import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import { directoratesApi } from '../../services/api';
import { Directorate } from '../../types';

const DirectorateViewPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [directorate, setDirectorate] = useState<Directorate | null>(null);

    useEffect(() => {
        if (id) {
            directoratesApi.getById(Number(id)).then(setDirectorate);
        }
    }, [id]);

    if (!directorate) {
        return <div className="p-6">Loading...</div>;
    }

    const breadcrumbs = [
        { name: 'Personnel', href: '/employees' },
        { name: 'Directorates', href: '/directorates' },
        { name: directorate.name, href: `/directorates/view/${id}` },
    ];

    return (
        <div>
            <PageHeader
                title={directorate.name}
                breadcrumbs={breadcrumbs}
                actionButtonText="Edit Directorate"
                onActionButtonClick={() => navigate(`/directorates/edit/${id}`)}
            />
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <DetailItem label="Directorate Name" value={directorate.name} />
                    <DetailItem label="Manager" value={directorate.manager} />
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

export default DirectorateViewPage;
