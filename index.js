const express = require('express');
const { db } = require('./db');

//import json web token opearions
const jwt = require('jsonwebtoken');


const webUserRoutes = require('./routes/webUserRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = 3000;
require('dotenv').config()

app.use(express.json());
db.connect();


//MIDDLEWARE
app.use((req, res, next) => {

    if (req.url === '/api/login') {
        next();
        return;
    }

    try {
        //Bearer 12r91mp2rmpo12mrp1mp2ormpo12
        let token = req.headers['authorization'];
        token = token.split(' ')[1];

        jwt.verify(token, process.env.JWT_TOKEN);

        next();


    }
    catch (err) {
        res.status(401).json({ message: 'Unauthorized' });
    }



}
);

//bu endpoint ile kullanıcıya token veriyoruz
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    if (email === "admin@mail.com" && password === "123") {
        const token = jwt.sign({ email }, process.env.JWT_TOKEN,
            {
                expiresIn: '1h'
            });
        //jwt options

        res.json({ token: token });
    }
    else {
        res.status(401).json({ message: 'Unauthorized' });
    }
}
);




app.use('/api/webusers', webUserRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);




app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

