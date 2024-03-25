const express = require('express');
const { userLogin, delUser, userSignup, getUsers, userUpdate } = require('../controllers/userController');
const router = express.Router();
const requireAuth = require('../middleware/requreAuth');

router.post('/login', userLogin);
router.post('/signup', userSignup);
router.delete('/deactivate', delUser);
router.patch('/',requireAuth, userUpdate);
router.get('/', getUsers);

module.exports = router;