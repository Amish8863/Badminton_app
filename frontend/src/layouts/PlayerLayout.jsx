import { Menu } from "lucide-react";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from '../components/Sidebar';

const PlayerLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
            {/* Mobile Topbar */}
            <div className="md:hidden bg-slate-800 text-white p-4 flex justify-between items-center">
                <h1 className="text-xl font-semibold">Player Panel</h1>
                <button onClick={() => setSidebarOpen(!sidebarOpen)}>
                    <Menu size={24} />
                </button>
            </div>

            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Main Content */}
            <main className="flex-1 p-6 overflow-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default PlayerLayout;
