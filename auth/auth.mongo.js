var mongo = require('../mongo.js');

module.exports = {
    getUser,
    setToken
};


function getUser(email) {
    return new Promise((resolve, reject) => {
        mongo
            .getConnection()
            .collection('users')
            .find({
                email: email
            })
            .toArray((err, users) => {
                if (err) {
                    reject(err);
                }

                resolve(users[0]);
            });
    });
}

function setToken(email, token) {
    return new Promise((resolve, reject) => {
        mongo
            .getConnection()
            .collection('users')
            .update({email: email}, {$set: {token: token}}, err => {
                if (err) {
                    reject(err);
                }

                resolve();
            });
    });
}