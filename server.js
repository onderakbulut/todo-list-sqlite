const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors({
    origin: 'http://localhost:3001', // Frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use('/api', routes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});