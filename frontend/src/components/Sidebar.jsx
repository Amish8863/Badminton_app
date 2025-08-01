import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// Lucide icons
import { Home, Users, Settings, ClipboardList, LogOut } from 'lucide-react';
import { logout } from '../features/auth/authSlice';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    function handleLogout() {
        dispatch(logout());
        navigate('/login');
    }

    const menuByRole = {
        player: [
            { label: 'Dashboard', path: '/player/dashboard', icon: <Home size={18} /> },
        ],
        referee: [
            { label: 'Dashboard', path: '/referee/dashboard', icon: <Home size={18} /> },
            { label: 'Manage Matches', path: '/referee/matches', icon: <ClipboardList size={18} /> },
        ],
        admin: [
            { label: 'Dashboard', path: '/admin/dashboard', icon: <Home size={18} /> },
            { label: 'Users', path: '/admin/users', icon: <Users size={18} /> },
            { label: 'Settings', path: '/admin/settings', icon: <Settings size={18} /> },
        ],
    };

    const menuItems = menuByRole[user?.role] || [];

    return (
        <aside
            className={`
                bg-slate-800 text-white min-h-screen p-4 flex flex-col justify-between
                fixed z-50 top-0 left-0 transform transition-transform duration-200 ease-in-out
                md:static md:translate-x-0 md:w-64
                w-64 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}
        >
            {/* Top Section */}
            <div>
                <h2 className="text-xl font-bold mb-6 capitalize">{user?.role} Panel</h2>

                <nav className="flex flex-col space-y-2">
                    {menuItems.map((item, index) => (
                        <NavLink
                            key={index}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-2 px-3 py-2 rounded-md transition ${isActive
                                    ? 'bg-slate-700 text-white font-semibold'
                                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                                }`
                            }
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>
            </div>

            {/* Bottom Profile Section */}
            <div className="mt-8 border-t border-slate-600 pt-4 flex justify-between items-center space-x-3">
                <div className='flex gap-4'>
                    <img
                        src={`https://ui-avatars.com/api/?name=${user?.name}&background=random&color=fff`}
                        alt="avatar"
                        className="w-10 h-10 rounded-full border border-white"
                    />
                    <div>
                        <p className="text-sm font-semibold">{user?.name}</p>
                        <p className="text-xs text-slate-400 capitalize">{user?.role}</p>
                    </div>
                </div>

                <button
                    onClick={handleLogout}
                    className="text-red-500 hover:text-red-600 text-sm font-medium ml-2"
                    title="Logout"
                >
                    <LogOut size={20} />
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
