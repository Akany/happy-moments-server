var ObjectID = require('mongodb').ObjectID;

module.exports = {
    generate
};

function generate() {
    return new ObjectID()
}