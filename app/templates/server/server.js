var express = require('express');
var path = require('path');

var app = express();

app.use('/public', express.static(path.join(__dirname, '..', 'public')));

app.get('/*', function (req, res) {
    res.set('Content-Type', 'text/html');
    res.send(require('../_build/pages/index')());
});

app.listen(3000);
console.log('Listening on port 3000.');
