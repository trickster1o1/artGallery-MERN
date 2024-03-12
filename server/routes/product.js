const express = require('express');
const { getProducts, postProduct, deleteProduct, updateProduct, productDetail, deleteAll } = require('../controllers/productController');
const router = express.Router();
const multer = require('multer');
const path  = require('path');


router.get('/', getProducts);
router.post('/', postProduct);
router.delete('/:id/delete', deleteProduct);
router.patch('/:id', updateProduct);
router.get('/:id', productDetail);
router.delete('/distruct', deleteAll);


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/Images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname+"_"+Date.now()+path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage })


router.post('/upload', upload.single('file'), (req,res) => {
    console.log(req.file.filename);
    res.writeHead(301,
        {Location: 'http://localhost:3000/upload?upload=success'}
      );
      res.end();
});


module.exports = router;