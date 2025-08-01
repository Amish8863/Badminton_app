import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowUp, ArrowDown } from "lucide-react";
import axios from "axios";

const Playground = () => {
    const { matchId } = useParams();
    const navigate = useNavigate();

    const [score1, setScore1] = useState(0);
    const [score2, setScore2] = useState(0);
    const [loading, setLoading] = useState(false);

    const handleScoreChange = (player, change) => {
        if (player === 1) {
            setScore1(prev => Math.max(0, prev + change));
        } else {
            setScore2(prev => Math.max(0, prev + change));
        }
    };

    const handleSubmit = async () => {
        setLoading(true);

        try {
            const response = await axios.post(`/api/matches/submit-score/${matchId}`, {
                matchType: "solo", // or "team"
                player1Id: "123abc", // Replace with actual from fetched data
                player2Id: "456def",
                score1,
                score2
            });

            console.log("Score submitted:", response.data);
            navigate("/referee/dashboard"); // redirect after submit
        } catch (err) {
            console.error("Error submitting score:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-screen text-white">
            <div className="flex flex-1">
                {/* Player 1 */}
                <div className="flex-1 bg-blue-600 flex flex-col items-center justify-center space-y-6">
                    <h2 className="text-2xl font-bold">Player 1</h2>
                    <div className="text-6xl">{score1}</div>
                    <div className="flex flex-col space-y-3">
                        <button onClick={() => handleScoreChange(1, 1)} className="bg-white text-blue-600 p-4 rounded-full">
                            <ArrowUp size={32} />
                        </button>
                        <button onClick={() => handleScoreChange(1, -1)} className="bg-white text-blue-600 p-4 rounded-full">
                            <ArrowDown size={32} />
                        </button>
                    </div>
                </div>

                {/* Player 2 */}
                <div className="flex-1 bg-red-600 flex flex-col items-center justify-center space-y-6">
                    <h2 className="text-2xl font-bold">Player 2</h2>
                    <div className="text-6xl">{score2}</div>
                    <div className="flex flex-col space-y-3">
                        <button onClick={() => handleScoreChange(2, 1)} className="bg-white text-red-600 p-4 rounded-full">
                            <ArrowUp size={32} />
                        </button>
                        <button onClick={() => handleScoreChange(2, -1)} className="bg-white text-red-600 p-4 rounded-full">
                            <ArrowDown size={32} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <div className="bg-gray-900 text-center p-4">
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded text-lg font-bold"
                >
                    {loading ? "Submitting..." : "Submit & End Match"}
                </button>
            </div>
        </div>
    );
};

export default Playground;
