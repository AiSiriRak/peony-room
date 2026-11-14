const express = require('express');

const { register, login, logout, getMe } = require('../controllers/auth');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').post(protect, logout);
router.route('/me').get(protect, getMe);

module.exports = router;
