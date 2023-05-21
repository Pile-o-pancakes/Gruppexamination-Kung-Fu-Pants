const express = require('express');
const app = express();

const usersRouter = require('./usersRouter');
const groupsRouter = require('./groupsRouter');
const {checkToken} = require('../middleware');

app.use('/user', checkToken, usersRouter);


app.use('/group', checkToken, groupsRouter);
module.exports = app;
