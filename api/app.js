const express = require('express');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const logger = require('morgan');

// our routers
const usersRouter = require('./routes/users');
const authsRouter = require('./routes/auths');
const animalsRouter = require('./routes/animals');
const skinsRouter = require('./routes/skins');

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


app.use('/users', usersRouter);
app.use('/auths', authsRouter);
app.use('/animals', animalsRouter);
app.use('/skins', skinsRouter);

module.exports = app;
