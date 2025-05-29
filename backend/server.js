require('dotenv').config(); // Load environment variables from .env
const cors = require('cors');


const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/db');

const app = express();
app.use(cors());
// Connect to MongoDB
connectDB();

app.use(express.json()); // For parsing JSON
app.use(logger); // Custom logger middleware

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
