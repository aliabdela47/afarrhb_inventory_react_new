
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import { UserIcon, EnvelopeIcon, LockClosedIcon } from '../../components/icons/Icons';

const SignUpPage: React.FC = () => {
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you would call an API to register the user
        alert('Sign up successful! Please log in.');
        navigate('/login');
    };

    return (
        <AuthLayout>
            <div className="w-full max-w-md space-y-8">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Create an account
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
                            Sign in
                        </Link>
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4 rounded-md shadow-sm">
                        <div>
                            <label htmlFor="full-name" className="sr-only">Full Name</label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <UserIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="full-name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    required
                                    className="relative block w-full appearance-none rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-3 pl-10 text-gray-900 dark:text-white placeholder-gray-500 focus:z-10 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                                    placeholder="Full Name"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="relative block w-full appearance-none rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-3 pl-10 text-gray-900 dark:text-white placeholder-gray-500 focus:z-10 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                                    placeholder="Email address"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <LockClosedIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    className="relative block w-full appearance-none rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-3 pl-10 text-gray-900 dark:text-white placeholder-gray-500 focus:z-10 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                                    placeholder="Password"
                                />
                            </div>
                        </div>
                         <div>
                            <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <LockClosedIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="confirm-password"
                                    name="confirm-password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    className="relative block w-full appearance-none rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-3 pl-10 text-gray-900 dark:text-white placeholder-gray-500 focus:z-10 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                                    placeholder="Confirm Password"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative flex w-full justify-center rounded-md border border-transparent bg-primary-600 py-3 px-4 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                        >
                            Create Account
                        </button>
                    </div>
                </form>
            </div>
        </AuthLayout>
    );
};

export default SignUpPage;
