const express = require('express');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const logger = require('morgan');
const cors = require('cors');

// our routers
const usersRouter = require('./routes/users');
const authsRouter = require('./routes/auths');
const animalsRouter = require('./routes/animals');
const skinsRouter = require('./routes/skins');

const corsOptions = {
  origin: [
    'https://e-vinci.github.io/SealRescue-Frontend',
    'http://localhost:8080',
    `https://e-vinci.github.io`,
  ],
};

const app = express();

const expiryDateIn3Months = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30 * 3);
const cookieSecreteKey = 'SealRescue';
app.use(
  cookieSession({
    name: 'user',
    keys: [cookieSecreteKey],
    cookie: {
      httpOnly: true,
      expires: expiryDateIn3Months,
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
