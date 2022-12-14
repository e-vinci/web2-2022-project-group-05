const express = require('express');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const logger = require('morgan');
const cors = require('cors');
require("dotenv").config();

// our routers
const usersRouter = require('./routes/users');
const authsRouter = require('./routes/auths');
const animalsRouter = require('./routes/animals');
const skinsRouter = require('./routes/skins');

const corsOptions = {
origin: [/https:\/\/e-vinci\.github\.io\/SealRescue-Frontend.*/, /http:\/\/localhost:8080/, /http:\/\/e-vinci\.github\.io.*/,/http:\/\/localhost.*/],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

const app = express();

const expiryDateIn3Months = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30 * 3);
const cookieSecretKey = process.env.COOKIE_KEY;
app.use(
  cookieSession({
    name: 'user',
    keys: [cookieSecretKey],
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      expires: expiryDateIn3Months,
      credentials : true,
    },
  }),
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/users', cors(corsOptions), usersRouter);
app.use('/auths', cors(corsOptions), authsRouter);
app.use('/animals', cors(corsOptions), animalsRouter);
app.use('/skins', cors(corsOptions), skinsRouter);

module.exports = app;
