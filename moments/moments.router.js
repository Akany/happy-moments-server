var moments = require('express').Router();

var momentsMongo = require('./moments.mongo.js');

module.exports = moments;

moments.get('/', (req, res, next) => {
    momentsMongo
        .getMoments()
        .then(moments => res.status(200).json(moments));
});

moments.post('/', validateMoment, putMoment);

function putMoment(req, res, next) {
    momentsMongo
        .putMoment(req.body.content)
        .then(moment => {
            res.status(200).json(moment)
        });
}

function validateMoment(req, res, next) {
    if (req.body.content) {
        next();

        return;
    }

    res.send(400).json({
        message: 'Moment decription is missing'
    });
}