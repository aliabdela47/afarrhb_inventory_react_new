
import React from 'react';

interface AuthLayoutProps {
    children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    return (
        <div className="flex min-h-screen bg-white dark:bg-gray-900">
            {/* Left side panel */}
            <div className="hidden lg:flex w-1/2 items-center justify-center bg-gradient-to-br from-primary-500 to-primary-700 p-12 text-white relative overflow-hidden">
                <div className="z-10 text-center">
                    <img src="/assets/logo.png" alt="AfarRHB Logo" className="h-40 w-auto mx-auto mb-8 drop-shadow-lg" />
                    <h1 className="text-4xl font-bold leading-tight mb-4 drop-shadow-md">
                        AfarRHB Inventory Management System
                    </h1>
                    <p className="text-lg text-primary-100 drop-shadow-sm">
                        Efficiently managing resources for a healthier future.
                    </p>
                </div>
                {/* Background decorative shapes */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-1/4 -translate-y-1/4"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/4 translate-y-1/4"></div>
            </div>

            {/* Right side form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
                {children}
            </div>
        </div>
    );
};

export default AuthLayout;
