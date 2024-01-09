const express = require('express'); // import express
const { db } = require('./db');
const app = express();
require('dotenv').config()

const PORT = 3000;

db.connect();




app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

