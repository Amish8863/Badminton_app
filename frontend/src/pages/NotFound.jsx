import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NotFound = () => {
    const { user } = useSelector((state) => state.auth);

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-800">
            <h1 className="text-6xl font-bold mb-4">404 - Page Not Found</h1>
            <p className="text-xl mb-6">The page you are looking for does not exist.</p>

            <Link to={`/${user.role}/dashboard`} className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                Go to Home
            </Link>
        </div>
    );
}

export default NotFound;