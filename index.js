const express = require('express'); // import express
const { db } = require('./db');

const webUserRoutes = require('./routes/webUserRoutes');

const app = express();
const PORT = 3000;
require('dotenv').config()

app.use(express.json());

db.connect();


app.use('/api/webusers', webUserRoutes);




app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

