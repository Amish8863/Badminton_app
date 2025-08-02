const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRoute = require('./routes/userRoute');
const matchRoute = require('./routes/matchRoute');

// Load environment variables from .env file
dotenv.config();
const app = express();

// Middleware to enable CORS
// app.use(cors());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

//middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());

// Sample route
app.get('/', (req, res) => {
    res.send('Hello World!');
})

// Basic user routes
app.use('/api/users', userRoute);

// Basic match routes
app.use('/api/matches', matchRoute);

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
})

// Connect to MongoDB
mongoose.connect(process.env.MONGOURI).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});
