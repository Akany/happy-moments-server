var mongo = require('../mongo.js');

module.exports = {
    getMoments,
    putMoment
};

function getMoments(callback) {
    return new Promise((resolve, reject) => {
        mongo
            .getConnection()
            .collection('moments')
            .find({})
            .toArray((err, moments) => {
                if (err) {
                    return reject(err);
                }

                resolve(moments);
            });
    });
}

function putMoment(content) {
    var data = {
        content: content,
        date: (new Date()).toISOString()
    };

    return mongo
        .getConnection()
        .collection('moments')
        .insertOne(data)
        .then(() => data);
}