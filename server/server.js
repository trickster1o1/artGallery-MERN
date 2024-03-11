require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path  = require('path');

const corsOptions = {
    origin:'*',
    credentials: true,
    optionSuccessStatus: 200,
}

const app = express();
const productRoute = require('./routes/product');
const userRoute = require('./routes/user');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname+"_"+Date.now()+path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });


// middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/product', productRoute);
app.use('/api/user', userRoute)
app.post('/api/product/upload', upload.single('file'), (req,res) => {
    const { image, name } = req.body;
    console.log(image, name);
    res.status(200).json({msg: 'uploaded', img: req.body});
});

mongoose.connect(process.env.MONG_URI).then(() => {
    app.listen(process.env.PORT, () => {
        console.log('listening on port 4000');
    })
})