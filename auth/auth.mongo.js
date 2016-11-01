var mongo = require('../mongo.js');

module.exports = {
    getUser
};


function getUser(email, password) {
    return new Promise((resolve, reject) => {
        mongo
            .getConnection()
            .collection('users')
            .find({
                email: email,
                password: password
            })
            .toArray((err, users) => {
                if (err) {
                    reject(err);
                }

                resolve(users[0]);
            });
    });
}