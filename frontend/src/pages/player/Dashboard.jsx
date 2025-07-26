import React from 'react';
import Cards from '../../components/player/Cards';
import WinLossPieChart from '../../components/player/WinLossPieChart';
import SoloMatchesTable from '../../components/player/SoloMatchTable';
import TeamMatchesTable from '../../components/player/TeamMatchTable';
import MatchTypeBarChart from '../../components/player/WinnLossBarChart';

const PlayerDashboard = () => {
    return (
        <div className="p-4 md:p-6 bg-gray-100 min-h-screen space-y-8">
            <Cards />

            {/* <div className="bg-white shadow rounded-xl p-6">
                <h2 className="text-xl font-bold mb-4 text-slate-800">Win-Loss Distribution</h2>
                <WinLossPieChart />
            </div> */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white shadow rounded-xl p-6">
                    <h2 className="text-xl font-bold mb-4">Win-Loss Pie Chart</h2>
                    <WinLossPieChart />
                </div>
                <div className="bg-white shadow rounded-xl p-6">
                    <h2 className="text-xl font-bold mb-4">Match Type Bar Chart</h2>
                    <MatchTypeBarChart />
                </div>
            </div>

            <div className="bg-white shadow rounded-xl p-6">
                <h2 className="text-xl font-bold mb-4 text-slate-800">Solo Matches</h2>
                <SoloMatchesTable />
            </div>

            <div className="bg-white shadow rounded-xl p-6">
                <h2 className="text-xl font-bold mb-4 text-slate-800">Team Matches</h2>
                <TeamMatchesTable />
            </div>
        </div>
    );
};

export default PlayerDashboard;
