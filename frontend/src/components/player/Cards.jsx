import React from 'react';
import { useSelector } from 'react-redux';

const Cards = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="p-4 md:p-6 bg-gray-100">
      {/* Welcome Section */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
          Welcome, {user?.name} 👋
        </h1>
        <p className="text-gray-600 mt-1 text-sm md:text-base">Here’s a summary of your stats:</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Matches Played */}
        <div className="bg-white shadow rounded-xl p-6 border-l-4 border-blue-600">
          <h2 className="text-lg font-semibold text-gray-800">Matches Played</h2>
          <p className="text-3xl font-bold mt-2 text-blue-600">24</p>
        </div>

        {/* Wins */}
        <div className="bg-white shadow rounded-xl p-6 border-l-4 border-green-600">
          <h2 className="text-lg font-semibold text-gray-800">Wins</h2>
          <p className="text-3xl font-bold mt-2 text-green-600">15</p>
        </div>

        {/* Rankings */}
        <div className="bg-white shadow rounded-xl p-6 border-l-4 border-purple-600">
          <h2 className="text-lg font-semibold text-gray-800">Ranking</h2>
          <p className="text-3xl font-bold mt-2 text-purple-600">#3</p>
        </div>
      </div>
    </div>
  );
};

export default Cards;
