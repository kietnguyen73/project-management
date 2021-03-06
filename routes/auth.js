const express = require('express');
const router = express();
const Auth = require('../api/controllers/AuthController');


router.post('/login', Auth.login);


router.use(Auth.authenticate);

router.get('/me', Auth.me);


module.exports = router;