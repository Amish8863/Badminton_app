import React, { useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Card, CardContent, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getUserMatches } from '../../features/matches/matchSlice';

const data = [
    { name: 'Wins', value: 12 },
    { name: 'Losses', value: 5 },
];

const COLORS = ['#4caf50', '#f44336'];

const WinLossPieChart = () => {

    const dispatch = useDispatch();
    const userId = useSelector((state) => state.auth.user._id);
    const matchData = useSelector((state) => state.match.data);
    console.log("matchData: ", matchData)

    const data = matchData && matchData.map((item, index) => {
        
    })

    useEffect(() => {
        if (userId) {
            dispatch(getUserMatches(userId));
        }
    }, [userId]);

    // if (isLoading) return <p>Loading...</p>;
    // if (error) return <p>Error: {error}</p>;

    return (

        <Card sx={{ mb: 4 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Win vs Loss Chart
                </Typography>
                <PieChart width={400} height={250}>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        label
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </CardContent>
        </Card>
    )
};

export default WinLossPieChart;
