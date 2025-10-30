import React, { useState } from 'react';
import SideNav from './SideNav';
import TopNav from './TopNav';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <SideNav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
        <footer className="flex-shrink-0 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-12 items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <p>&copy; 2024 Afar National Regional State Health Bureau. All Rights Reserved.</p>
                    <p>
                        Developed by: 
                        <a 
                            href="https://ali.et" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="ml-1 font-medium text-primary-600 hover:text-primary-500"
                        >
                            Ali Abdela
                        </a>
                    </p>
                </div>
            </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;