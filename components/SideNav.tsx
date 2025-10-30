import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../constants';
import { ChevronDownIcon, XMarkIcon } from './icons/Icons';

interface SideNavProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
}

const SideNav: React.FC<SideNavProps> = ({ sidebarOpen, setSidebarOpen }) => {
    const location = useLocation();
    const [openSections, setOpenSections] = useState<string[]>([]);

    const toggleSection = (sectionName: string) => {
        setOpenSections(prev => 
            prev.includes(sectionName) 
                ? prev.filter(name => name !== sectionName)
                : [...prev, sectionName]
        );
    };

    const renderLink = (link: { name: string; href: string; icon: React.FC<any> }, isSubLink = false) => {
        const isActive = location.pathname === link.href || (link.href !== '/dashboard' && location.pathname.startsWith(link.href));
        const Icon = link.icon;
        return (
            <NavLink
                to={link.href}
                key={link.name}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center p-2 rounded-lg transition-colors duration-200 ${
                    isSubLink ? 'pl-10' : 'px-4'
                } ${
                    isActive
                        ? 'bg-primary-500 text-white'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
            >
                <Icon className="h-5 w-5 mr-3" />
                <span className="text-sm font-medium">{link.name}</span>
            </NavLink>
        );
    };

    const navContent = (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                <img src="/assets/logo.png" alt="AfarRHB Logo" className="h-14 w-auto" />
                <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                    <XMarkIcon className="h-6 w-6" />
                </button>
            </div>
            <nav className="flex-1 px-2 py-4 space-y-2 overflow-y-auto">
                {NAV_LINKS.map((item) => {
                    if ('links' in item) {
                        const isSectionActive = item.links.some(link => location.pathname.startsWith(link.href));
                        const isSectionOpen = openSections.includes(item.name) || isSectionActive;

                        return (
                            <div key={item.name}>
                                <button
                                    onClick={() => toggleSection(item.name)}
                                    className="w-full flex items-center justify-between p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                                >
                                    <span className="text-sm font-semibold">{item.name}</span>
                                    <ChevronDownIcon className={`h-5 w-5 transition-transform ${isSectionOpen ? 'rotate-180' : ''}`} />
                                </button>
                                {isSectionOpen && (
                                    <div className="mt-1 space-y-1">
                                        {item.links.map(link => renderLink(link, true))}
                                    </div>
                                )}
                            </div>
                        );
                    }
                    return renderLink(item);
                })}
            </nav>
        </div>
    );

    return (
        <>
            {/* Mobile Sidebar */}
            <div className={`fixed inset-0 z-30 bg-gray-900 bg-opacity-50 transition-opacity lg:hidden ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setSidebarOpen(false)}></div>
            <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-800 transform transition-transform lg:hidden ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                {navContent}
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden lg:flex lg:flex-shrink-0">
                <div className="flex flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
                    {navContent}
                </div>
            </div>
        </>
    );
};

export default SideNav;