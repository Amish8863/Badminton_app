import React, { useEffect, useState } from "react";
import axios from "axios"; // use your axios instance
import MatchCard from "../../components/MatchCard";
// import MatchTable from "@/components/referee/MatchTable";

const RefereeDashboard = () => {
  const [stats, setStats] = useState({ totalMatches: 0, totalWins: 0 });
  const [matches, setMatches] = useState([]);

  console.log("matches :", matches)

  useEffect(() => {
    const fetchStats = async () => {
      const res = await axios.get("http://localhost:8080/api/matches/referee-stats");
      setStats(res.data);
    };

    const fetchMatches = async () => {
      const res = await axios.get("http://localhost:8080/api/matches/by-referee");
      setMatches(res.data.matches);
    };

    fetchStats();
    fetchMatches();
  }, []);

    const handleDelete = async (matchId) => {
        try {
            await axios.delete(`/api/matches/${matchId}`);
            setMatches((prev) => prev.filter((match) => match._id !== matchId));
        } catch (error) {
            console.error("Failed to delete match:", error);
        }
    };


  return (
    <div className="p-4 space-y-4">
      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-4 shadow">
          <h2 className="text-xl font-semibold">Total Matches</h2>
          <p className="text-3xl font-bold text-blue-600">{stats.totalMatches}</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow">
          <h2 className="text-xl font-semibold">Matches Completed</h2>
          <p className="text-3xl font-bold text-green-600">{stats.totalWins}</p>
        </div>
      </div>

      {/* Table of matches */}
      {/* <MatchTable matches={matches}  /> */}
      <MatchCard match={matches} onDelete={handleDelete} />
    </div>
  );
};

export default RefereeDashboard;
