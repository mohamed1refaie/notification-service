const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('./mongoose');
const notificationsRoutes = require('./api/routes/notifications');
const smsRoutes = require('./api/routes/sms');
const subscribeRoutes = require('./api/routes/subscribe');
const refreshTokenRoutes = require('./api/routes/refreshToken');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

//Routes which handle the requests
app.use('/notifications', notificationsRoutes);
app.use('/sms', smsRoutes);
app.use('/subscribe', subscribeRoutes);
app.use('/refreshToken', refreshTokenRoutes);

app.use((req, res, next) => {
    const error = new Error("not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;