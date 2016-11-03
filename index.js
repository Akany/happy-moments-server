var express = require('express');
var bodyParser = require('body-parser');
var app = express();


var mongo = require('./mongo.js');

var auth = require('./auth/auth.router.js');
var { restoreUser } = require('./auth/auth.token.js');
var moments = require('./moments/moments.router');

var PORT = 3000;

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.end('<h1>Hello server</h1>');
});

app.use('/api/auth', auth);
app.use('/api/moments', restoreUser, moments);

mongo
    .connect()
    .then(() => {
        console.log(`DB connected`);
        listenServer();
    });

function listenServer() {
    app.listen(PORT, console.log(`listening on ${PORT}`));
}