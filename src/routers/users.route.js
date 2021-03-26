var express = require('express');
var router = express.Router();

const userController = require('../controllers/users.controller');
const passport = require('passport');

//Public routes

router.get('/activate/:usuario', userController.activate);

//Autenticate

router.use(passport.authenticate("jwt", { session: false }));

//Create

//Read
router.get('/getAll', userController.getAll);

//Update
router.put('/update/me', passport.authenticate("jwt", { session: false }), userController.update);

//Delete
module.exports = router;
