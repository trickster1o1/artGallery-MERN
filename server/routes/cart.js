const express = require('express');
const requireAuth = require('../middleware/requreAuth');
const router = express.Router();
const { addToCart, getCarts, deleteItem, clearCart} = require('../controllers/cartController');

// Middleware
router.use(requireAuth);

router.patch('/', addToCart);
router.get('/', getCarts);
router.delete('/:id', deleteItem);
router.delete('/', clearCart);

module.exports = router;