var express = require('express');
var router = express.Router();

const authController = require('../controllers/auth.controller');

const { runValiation } = require('../validators');
const { loginValidator, registerValidator } = require('../validators/auth.validator');

router.post('/register', registerValidator, runValiation, authController.register);
router.post('/login', loginValidator, runValiation, authController.login);
router.put('/changePass', authController.changePassword);

module.exports = router;