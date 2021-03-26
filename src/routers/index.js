const express = require('express');
const router = express.Router();

const authRouter = require('./auth.route');
const userRouter = require('./users.route');
const roleRouter = require('./role.route');

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/role', roleRouter);

module.exports = router;
