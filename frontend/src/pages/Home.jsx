import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login')
    }

    if (!user) {
        return <div className='p-4 text-red-500'>You are not Logged in</div>
    }


    return (
        <div className='min-h-screen bg-gray-100 p-6'>
            <div className='max-w-4xl mx-auto bg-white shadow rounded-lg p-6'>
                <h1 className='text-2xl font-semibold'>
                    Welcome, {user?.name}
                </h1>

                <p className='mb-4'>Role: <strong>{user?.role}</strong></p>

                {
                    user?.role === 'player' && (
                        <div>
                            <h2 className='text-xl font-semibold mb-2'>Your Stats</h2>
                            <p>-Matches played</p>
                            <p>-Wins/Losses</p>
                            <p>-Ranking</p>
                        </div>
                    )
                }

                {
                    user?.role === 'referee' && (
                        <div>
                            <h2 className='text-xl font-semibold mb-2'>Referee Panel</h2>
                            <p>-View Upcoming Matches</p>
                            <p>-Assign Scores</p>
                        </div>
                    )
                }

                {
                    user?.role === 'admin' && (
                        <div>
                            <h2 className='text-xl font-semibold mb-2'>Admin Dashboard</h2>
                            <p>-Manage Users</p>
                            <p>-View Leaderboards</p>
                            <p>-System Settings</p>
                        </div>
                    )
                }

                <button onClick={handleLogout} className='mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700'>Logout</button>

            </div>

        </div>
    )
}

export default Home;