const express = require("express");
const app = express();

const usersRouter = require("./usersRouter");
const groupsRouter = require("./groupsRouter");

app.use("/user", usersRouter);
app.use("/group", groupsRouter);
module.exports = app;
