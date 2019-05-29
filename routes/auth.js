const express = require('express');
const router = express();
const Auth = require('../api/controllers/AuthController');

router.post('/login', Auth.login);


module.exports = router;