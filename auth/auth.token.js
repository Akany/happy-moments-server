var ObjectID = require('mongodb').ObjectID;
var authMongo = require('./auth.mongo.js');

module.exports = {
    generate,
    restoreUser
};

function generate() {
    return new ObjectID()
}

function restoreUser(req, res, next) {
    authMongo
        .restoreUser(req.query.token)
        .then(user => {
            if (!user) {
                res.status(400).json({
                    message: 'Token is invalid'
                });

                return;
            }

            req.user = user;
            next();
        });
}