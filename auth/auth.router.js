var express = require('express');
var auth = express.Router();

var authMongo = require('./auth.mongo.js');

auth.post('/', (req, res) => {
    if (!validateLogin(req.body)) {
        res.status(404).end('validation failed');
    }

    authMongo
        .getUser(req.body.email, req.body.password)
        .then(user => {
            if (!user) {
                return res
                    .status(200)
                    .end('User doesn\'t exist');
            }

            res
                .status(200)
                .json(user)
                .end();
        });
});

function validateLogin(data) {
    return data.email && data.password;
}

module.exports = auth;