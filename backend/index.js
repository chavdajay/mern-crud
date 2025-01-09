require('dotenv').configDotenv();

const express = require('express');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', userRoutes);

const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); 
});
