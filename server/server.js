require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const corsOptions = {
    origin:'*',
    credentials: true,
    optionSuccessStatus: 200,
}

const app = express();
const productRoute = require('./routes/product');
const userRoute = require('./routes/user');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');


// middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static('public'));
app.use('/api/product', productRoute);
app.use('/api/user', userRoute)
app.use('/api/cart', cartRoute);
app.use('/api/order', orderRoute);


mongoose.connect(process.env.MONG_URI).then(() => {
    app.listen(process.env.PORT, () => {
        console.log('listening on port 4000');
    })
})