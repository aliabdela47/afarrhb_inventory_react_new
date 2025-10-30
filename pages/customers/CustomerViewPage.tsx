import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import { customersApi } from '../../services/api';
import { Customer } from '../../types';

const CustomerViewPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [customer, setCustomer] = useState<Customer | null>(null);

    useEffect(() => {
        if (id) {
            customersApi.getById(Number(id)).then(setCustomer);
        }
    }, [id]);

    if (!customer) {
        return <div className="p-6">Loading...</div>;
    }

    const breadcrumbs = [
        { name: 'Personnel', href: '/employees' },
        { name: 'Customers', href: '/customers' },
        { name: customer.name, href: `/customers/view/${id}` },
    ];

    return (
        <div>
            <PageHeader
                title={customer.name}
                breadcrumbs={breadcrumbs}
                actionButtonText="Edit Customer"
                onActionButtonClick={() => navigate(`/customers/edit/${id}`)}
            />
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <DetailItem label="Customer Name" value={customer.name} />
                    <DetailItem label="Type" value={customer.type} />
                    <DetailItem label="Contact Person" value={customer.contactPerson} />
                    <DetailItem label="Phone" value={customer.phone} />
                    <DetailItem label="Email" value={customer.email} />
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

export default CustomerViewPage;
