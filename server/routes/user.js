const express = require('express');
const { userLogin, delUser } = require('../controllers/userController');
const router = express.Router();

router.get('/login', userLogin);
router.delete('/deactivate', delUser)

module.exports = router;