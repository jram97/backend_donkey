require('dotenv').config();
require('./database/asociations');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const { errorHandler } = require('./middlewares/handlers');

const indexRouter = require('./routers/index');
const passport = require('passport');
const passportMiddleware = require('./middlewares/passport')

//settings
const app = express();

app.listen(9999);

//middlewares
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
passport.use('jwt', passportMiddleware.JwtStrategy);

//routes
app.use('/', indexRouter);
app.use(errorHandler);

module.exports = app;
