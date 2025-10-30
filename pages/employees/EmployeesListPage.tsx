import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import { getEmployees } from '../../services/api';
import { Employee } from '../../types';
import { useConfirmation } from '../../contexts/ConfirmationContext';

const EmployeesListPage = () => {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState<Employee[]>([]);
    const { confirm } = useConfirmation();
    
    useEffect(() => {
        getEmployees().then(setEmployees);
    }, []);

    const columns = [
        { header: 'Name', accessor: 'name' as keyof Employee, sortable: true },
        { header: 'Employee Code', accessor: 'employee_code' as keyof Employee, sortable: true },
        { header: 'Position', accessor: 'position' as keyof Employee, sortable: true },
        { header: 'Department', accessor: 'department' as keyof Employee, sortable: true },
        { header: 'Phone', accessor: 'phone' as keyof Employee, sortable: false },
        {
            header: 'Status',
            accessor: (employee: Employee) => (
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    employee.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                    {employee.is_active ? 'Active' : 'Inactive'}
                </span>
            ),
            sortable: false
        },
    ];

    const handleEdit = (employee: Employee) => navigate(`/employees/edit/${employee.id}`);
    const handleDelete = async (employee: Employee) => {
        const confirmed = await confirm({
            title: 'Delete Employee',
            message: <>Are you sure you want to delete <strong>{employee.name}</strong>? This action cannot be undone.</>
        });
        if (confirmed) {
            console.log(`Deleting ${employee.name}...`);
            setEmployees(prev => prev.filter(e => e.id !== employee.id));
        }
    };

    return (
        <div>
            <PageHeader
                title="Employees"
                breadcrumbs={[{ name: 'Personnel', href: '/employees' }, { name: 'Employees', href: '/employees' }]}
                actionButtonText="Add New Employee"
                actionButtonLink="/employees/new"
            />
            <DataTable columns={columns} data={employees} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    );
};

export default EmployeesListPage;
