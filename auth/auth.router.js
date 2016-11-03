var express = require('express');
var auth = express.Router();

var authMongo = require('./auth.mongo.js');
var authToken = require('./auth.token.js');

auth.post('/', validateLogin, getUser, setToken, (req, res) => {
    res
        .status(200)
        .json(req.user)
        .end();
});

function validateLogin(req, res, next) {
    if (req.body.email && req.body.password) {
        next();

        return;
    }

    res.status(200).json({
        status: false,
        mesage: 'Email or Password is not provided'
    });
}

function getUser(req, res, next) {
    authMongo
        .getUser(req.body.email)
        .then(user => {
            if (!user) {
                return res
                    .status(200)
                    .end(`User doesn't exist`);
            }

            if (user.password !== req.body.password) {
                return res.status(200).json({
                    status: false,
                    message: 'Password is not correct'
                });
            }

            delete user.password;

            req.user = user;
            next();
        });
}

function setToken(req, res, next) {
    var user = req.user;

    user.token = authToken.generate().toString();

    authMongo
        .setToken(user.email, user.token)
        .then(next);
}

module.exports = auth;