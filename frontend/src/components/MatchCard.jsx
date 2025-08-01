// components/referee/MatchCard.jsx
import React from 'react';
// import { Button } from '@/components/ui/button';
import { Button } from '@mui/material';
import { Eye, Pencil, Trash } from 'lucide-react';

const MatchCard = ({ match, onDelete }) => {
  
  return (
    <div className="p-4 shadow rounded-xl bg-white mb-4">
      <h3 className="text-lg font-semibold mb-2">
        {/* {match.player1?.name} vs {match.player2?.name} */}
        Amish VS Ranu
      </h3>
      {/* <p>Status: {match.status}</p> */}
      {/* <p>Score: {match.score1} - {match.score2}</p> */}

      <div className="mt-3 flex gap-2">
        <Button onClick={() => alert("View logic here")} className="flex items-center gap-2">
          <Eye size={16} /> View
        </Button>

        <Button variant="outline" onClick={() => alert("Edit logic here")} className="flex items-center gap-2">
          <Pencil size={16} /> Edit
        </Button>

        <Button variant="destructive" onClick={() => onDelete(match._id)} className="flex items-center gap-2">
          <Trash size={16} /> Delete
        </Button>
      </div>
    </div>
  );
};

export default MatchCard;
