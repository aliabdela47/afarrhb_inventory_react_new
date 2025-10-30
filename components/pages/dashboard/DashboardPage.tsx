
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CubeIcon, DocumentTextIcon, TruckIcon, UsersIcon } from '../../components/icons/Icons';

const DashboardCard = ({ title, value, icon: Icon, color }: { title: string, value: string, icon: React.FC<any>, color: string }) => (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 flex items-center">
        <div className={`p-3 rounded-full mr-4 ${color}`}>
            <Icon className="h-6 w-6 text-white" />
        </div>
        <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{title}</p>
            <p className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">{value}</p>
        </div>
    </div>
);

const vehicleStatusData = [
  { name: 'Available', count: 12, fill: '#34d399' },
  { name: 'In-Use', count: 8, fill: '#facc15' },
  { name: 'Maintenance', count: 3, fill: '#f87171' },
];

const recentActivity = [
    { id: 1, user: 'Admin', action: 'Issued 5 Laptops', time: '10 mins ago'},
    { id: 2, user: 'Driver A', action: 'Checked-in at Adama', time: '15 mins ago'},
    { id: 3, user: 'Manager B', action: 'Approved request #102', time: '1 hour ago'},
    { id: 4, user: 'Admin', action: 'Added new vehicle', time: '3 hours ago'},
];

const DashboardPage = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Dashboard</h1>
            
            {/* Metric Cards */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <DashboardCard title="Total Items" value="1,234" icon={CubeIcon} color="bg-blue-500" />
                <DashboardCard title="Pending Requests" value="16" icon={DocumentTextIcon} color="bg-yellow-500" />
                <DashboardCard title="Vehicles On-road" value="8" icon={TruckIcon} color="bg-green-500" />
                <DashboardCard title="Active Employees" value="312" icon={UsersIcon} color="bg-indigo-500" />
            </div>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Vehicle Status Chart */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Vehicle Status</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={vehicleStatusData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(156, 163, 175, 0.3)" />
                            <XAxis dataKey="name" tick={{ fill: '#6b7280' }} />
                            <YAxis tick={{ fill: '#6b7280' }} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#1f2937',
                                    borderColor: '#374151'
                                }}
                                labelStyle={{ color: '#d1d5db' }}
                            />
                            <Bar dataKey="count" barSize={40} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Recent Activity */}
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                        {recentActivity.map(activity => (
                             <li key={activity.id} className="py-3">
                                 <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.action}</p>
                                 <p className="text-sm text-gray-500 dark:text-gray-400">by {activity.user} - {activity.time}</p>
                             </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
