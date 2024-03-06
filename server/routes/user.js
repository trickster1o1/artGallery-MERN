const express = require('express');
const { userLogin, delUser, userSignup, getUsers } = require('../controllers/userController');
const router = express.Router();

router.post('/login', userLogin);
router.post('/signup', userSignup);
router.delete('/deactivate', delUser);
router.get('/', getUsers);

module.exports = router;