const express = require('express');
const { userLogin } = require('../controllers/userController');
const router = express.Router();

router.get('/login', userLogin);

module.exports = router;