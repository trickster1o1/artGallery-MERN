const express = require('express');
const router = express.Router();
const {getProducts, getOrders, getUsers, productStatus} = require('../controllers/adminController');
const requireAuth = require('../middleware/requreAuth');


router.use(requireAuth);
router.get('/users', getUsers);
router.get('/products', getProducts);
router.get('/orders', getOrders);
router.post('/product/status', productStatus);


module.exports = router;