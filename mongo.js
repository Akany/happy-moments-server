var mongoClient = require('mongodb').MongoClient;

var DB = null;

const DBUSER = 'akany';
const DBPASSWORD = 'akany';
const URL = `mongodb://${DBUSER}:${DBPASSWORD}@ds139187.mlab.com:39187/happy-moments`;

module.exports = {
    connect,
    getConnection
};

function connect() {
    return new Promise((resolve, reject) => {
        mongoClient.connect(URL, (err, db) => {
            if (err) {
                reject(err);
            }

            DB = db;
            resolve(db);
        });
    });
}

function getConnection() {
    return DB;
}