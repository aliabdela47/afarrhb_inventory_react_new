import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import { employeesApi } from '../../services/api';
import { Employee } from '../../types';

const EmployeeViewPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState<Employee | null>(null);

    useEffect(() => {
        if (id) {
            employeesApi.getById(Number(id)).then(setEmployee);
        }
    }, [id]);

    if (!employee) {
        return <div className="p-6">Loading...</div>;
    }

    const breadcrumbs = [
        { name: 'Personnel', href: '/employees' },
        { name: 'Employees', href: '/employees' },
        { name: employee.name, href: `/employees/view/${id}` },
    ];
    
    const StatusBadge = ({ isActive }: { isActive: boolean }) => (
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}>
          {isActive ? 'Active' : 'Inactive'}
      </span>
    );

    return (
        <div>
            <PageHeader
                title="Employee Details"
                breadcrumbs={breadcrumbs}
                actionButtonText="Edit Employee"
                onActionButtonClick={() => navigate(`/employees/edit/${id}`)}
            />
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-1 flex flex-col items-center">
                        <img src={employee.photo || 'https://picsum.photos/200'} alt={employee.name} className="h-40 w-40 rounded-full object-cover mb-4 shadow-lg" />
                        <h2 className="text-2xl font-bold">{employee.name}</h2>
                        <p className="text-gray-500 dark:text-gray-400">{employee.position}</p>
                         <div className="mt-2">
                           <StatusBadge isActive={employee.is_active} />
                         </div>
                    </div>
                    <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                        <DetailItem label="Full Name (Amharic)" value={employee.name_am} />
                        <DetailItem label="Employee Code" value={employee.employee_code} />
                        <DetailItem label="Title (Taamagoli)" value={employee.taamagoli} />
                        <DetailItem label="Department" value={employee.department} />
                        <DetailItem label="Directorate" value={employee.directorate} />
                        <DetailItem label="Phone" value={employee.phone} />
                        <DetailItem label="Email" value={employee.email} />
                        <DetailItem label="Salary" value={employee.salary ? `$${employee.salary.toFixed(2)}` : 'N/A'} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const DetailItem = ({ label, value }: { label: string; value: string | null | undefined }) => (
    <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
        <p className="mt-1 text-md text-gray-900 dark:text-white">{value || 'Not specified'}</p>
    </div>
);


export default EmployeeViewPage;
