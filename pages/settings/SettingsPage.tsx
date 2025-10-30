import React from 'react';
import PageHeader from '../../components/PageHeader';

const SettingsPage = () => {
    return (
        <div>
            <PageHeader
                title="Settings"
                breadcrumbs={[{ name: 'Administration', href: '/settings' }, { name: 'Settings', href: '/settings' }]}
            />
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Application Settings</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    This is where application-wide settings, such as theme, language, and API key management, will be configured.
                </p>
            </div>
        </div>
    );
};

export default SettingsPage;
