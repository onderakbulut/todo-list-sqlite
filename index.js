const express = require('express');
const routes = require('./routes');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Welcome to the ToDo API!');
});

app.use('/api', routes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});