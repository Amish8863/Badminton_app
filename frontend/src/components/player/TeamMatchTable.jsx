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

const teamMatches = [
    { team: 'Dhruv & Sujal', result: 'Win', date: '21 July', score: '21-18' },
    { team: 'Ranu & Om', result: 'Loss', date: '19 July', score: '19-21' },
];

const TeamMatchesTable = () => (
    <Paper sx={{ mb: 4, p: 2 }}>
        <Typography variant="h6" gutterBottom>
            Team Matches
        </Typography>
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Team</TableCell>
                        <TableCell>Result</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Score</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {teamMatches.map((match, index) => (
                        <TableRow key={index}>
                            <TableCell>{match.team}</TableCell>
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

export default TeamMatchesTable;
