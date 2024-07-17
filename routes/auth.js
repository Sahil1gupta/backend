const express = require('express');
const router = express.Router();
const login = require('../controller/login');
const signup = require('../controller/signup');

router.post('/signup', signup);
router.post('/login', login);

module.exports = router;
