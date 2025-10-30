import React, { useState, useRef, useEffect } from 'react';
import { Bars3Icon, BellIcon, MagnifyingGlassIcon, ArrowRightOnRectangleIcon, UserIcon, Cog6ToothIcon } from './icons/Icons';
import { useAuth } from '../contexts/AuthContext';

interface TopNavProps {
    setSidebarOpen: (open: boolean) => void;
}

const TopNav: React.FC<TopNavProps> = ({ setSidebarOpen }) => {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const { logout } = useAuth();
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsUserMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        logout();
    };

    return (
        <header className="flex-shrink-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between p-2 h-16 px-4 sm:px-6 lg:px-8">
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="lg:hidden text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
                >
                    <Bars3Icon className="h-6 w-6" />
                </button>
                <div className="flex-1 flex justify-center px-4 lg:ml-0">
                    <div className="w-full max-w-xs">
                        <label htmlFor="search" className="sr-only">Search</label>
                        <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="search"
                                name="search"
                                className="block w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:text-gray-900 dark:focus:text-white focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                                placeholder="Search"
                                type="search"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                        <BellIcon className="h-6 w-6" />
                    </button>
                    <div className="relative" ref={menuRef}>
                        <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 focus:ring-primary-500">
                            <img className="h-8 w-8 rounded-full object-cover" src="https://picsum.photos/100/100" alt="User" />
                        </button>
                        {isUserMenuOpen && (
                             <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1">
                                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">Admin User</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">ardii.2000@gmail.com</p>
                                    </div>
                                    <a href="#/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <UserIcon className="mr-3 h-5 w-5 text-gray-400" />
                                        Your Profile
                                    </a>
                                     <a href="#/settings" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <Cog6ToothIcon className="mr-3 h-5 w-5 text-gray-400" />
                                        Settings
                                    </a>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border-t border-gray-200 dark:border-gray-700"
                                    >
                                        <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5 text-gray-400" />
                                        Sign out
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default TopNav;
