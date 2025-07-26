import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
} from '@mui/material';

const soloMatches = [
    { opponent: 'Ranu', result: 'Win', date: '22 July', score: '21-15' },
    { opponent: 'Sujal', result: 'Loss', date: '20 July', score: '18-21' },
];

const SoloMatchesTable = () => (
    <Paper sx={{ mb: 4, p: 2 }}>
        <Typography variant="h6" gutterBottom>
            Solo Matches
        </Typography>
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Opponent</TableCell>
                        <TableCell>Result</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Score</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {soloMatches.map((match, index) => (
                        <TableRow key={index}>
                            <TableCell>{match.opponent}</TableCell>
                            <TableCell>{match.result}</TableCell>
                            <TableCell>{match.date}</TableCell>
                            <TableCell>{match.score}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </Paper>
);

export default SoloMatchesTable;
