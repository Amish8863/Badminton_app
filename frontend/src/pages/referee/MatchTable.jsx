import React from "react";

const MatchTable = ({ matches }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-2xl shadow p-4">
      <h2 className="text-lg font-semibold mb-2">Your Matches</h2>
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Date</th>
            <th className="text-left p-2">Mode</th>
            <th className="text-left p-2">Status</th>
            <th className="text-left p-2">Winner</th>
            <th className="text-left p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match) => (
            <tr key={match._id} className="border-b hover:bg-gray-50">
              <td className="p-2">{new Date(match.matchDate).toLocaleDateString()}</td>
              <td className="p-2 capitalize">{match.mode}</td>
              <td className="p-2">{match.status}</td>
              <td className="p-2">{match?.winner?.name || "-"}</td>
              <td className="p-2">
                {/* Actions: view, edit, delete */}
                <button className="text-blue-600 hover:underline mr-2">View</button>
                {match.status === "inprogress" && (
                  <button className="text-yellow-600 hover:underline mr-2">Edit</button>
                )}
                <button className="text-red-600 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MatchTable;
