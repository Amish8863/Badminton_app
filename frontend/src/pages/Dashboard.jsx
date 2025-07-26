import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import RefereeLayout from '../layouts/RefereeLayout';
import PlayerLayout from '../layouts/PlayerLayout';

const Dashboard = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);

    if (!user) {
        console.log("User not found, redirecting to login...");
        navigate('/login');
    }

    switch (user.role) {
        case 'admin':
            return <AdminLayout />;
        case 'referee':
            return <RefereeLayout />;
        case 'player':
            return <PlayerLayout />;
        default:
            console.error("Unknown user role, redirecting to login...");
            navigate('/login');
            return null; // Prevent rendering if role is unknown
    }

}

export default Dashboard;