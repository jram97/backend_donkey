var express = require('express');
var router = express.Router();
const passport = require('passport');
const { roles } = require('../config/roles');
const { roleVerifier } = require('../middlewares/roleVerifier');

const roleController = require('../controllers/role.controller');

const { runValiation } = require('../validators');
const { createValidator, updateValidator } = require('../validators/role.validator');

//Public routes

//Authenticated routes
router.use(passport.authenticate("jwt", { session: false }));

//Admin only routes

router.use(roleVerifier(roles.admin));

//Create

router.post('/create', createValidator, runValiation, roleController.create);

//Read

router.get('/getAll', roleController.getAll);
router.get('/:id', roleController.getById);

//Update

router.put('/update', updateValidator, runValiation, roleController.update);

//Delete

module.exports = router;