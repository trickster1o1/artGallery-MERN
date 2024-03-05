require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');

const app = express();
const productRoute = require('./routes/product');
const userRoute = require('./routes/user');

// middleware
app.use(express.json());
app.use('/api/product', productRoute);
app.use('/api/user', userRoute)

mongoose.connect(process.env.MONG_URI).then(() => {
    app.listen(process.env.PORT, () => {
        console.log('listening on port 4000');
    })
})