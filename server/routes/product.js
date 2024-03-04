const express = require('express');
const { getProducts, postProduct, deleteProduct, updateProduct, productDetail } = require('../controllers/productController');

const router = express.Router();

router.get('/', getProducts);
router.post('/', postProduct);
router.delete('/:id/delete', deleteProduct);
router.patch('/:id', updateProduct);
router.get('/:id', productDetail);

module.exports = router;