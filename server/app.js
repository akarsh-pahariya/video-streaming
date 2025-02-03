const express = require('express');
const userRouter = require('./routes/userRouter');
const { globalErrorHandler } = require('./controllers/errorController');

const app = express();

app.use(express.json());

app.use('/api/v1/user', userRouter);

app.use(globalErrorHandler);

module.exports = app;
