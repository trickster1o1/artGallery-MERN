require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const productRoute = require('./routes/product');

const app = express();

app.use('/api/product', productRoute);

mongoose.connect(process.env.MONG_URI).then(() => {
    app.listen(process.env.PORT, () => {
        console.log('listening on port 4000');
    })
})