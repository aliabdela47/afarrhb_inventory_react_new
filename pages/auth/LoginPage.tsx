import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import { EnvelopeIcon, LockClosedIcon } from '../../components/icons/Icons';
import { useAuth } from '../../contexts/AuthContext';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('ardii.2000@gmail.com');
    const [password, setPassword] = useState('123456');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const success = await login(email, password);

        setIsLoading(false);
        if (success) {
            navigate('/dashboard');
        } else {
            setError('Invalid email or password. Please try again.');
        }
    };

    return (
        <AuthLayout>
            <div className="w-full max-w-md space-y-8">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Or{' '}
                        <Link to="/signup" className="font-medium text-primary-600 hover:text-primary-500">
                            create a new account
                        </Link>
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="rounded-md bg-red-50 p-4">
                            <p className="text-sm font-medium text-red-800">{error}</p>
                        </div>
                    )}
                    <div className="space-y-4 rounded-md shadow-sm">
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
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="relative block w-full appearance-none rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-3 pl-10 text-gray-900 dark:text-white placeholder-gray-500 focus:z-10 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                                    placeholder="Password"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                                Forgot your password?
                            </a>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative flex w-full justify-center rounded-md border border-transparent bg-primary-600 py-3 px-4 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-50"
                        >
                            {isLoading ? 'Signing in...' : 'Sign in'}
                        </button>
                    </div>
                </form>
            </div>
        </AuthLayout>
    );
};

export default LoginPage;
