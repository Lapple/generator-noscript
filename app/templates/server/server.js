var path = require('path');

var express = require('express');
var yate = require('yate');
var argv = require('optimist').argv;

var app = express();

app.engine('yate', function (path, data, callback) {
    try {
        callback(null, yate.run(path, { data: data }));
    } catch (err) {
        callback(err, null);
    }
});

app.set('port', argv.port || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'yate');

app.use(express.static(path.join(__dirname, '..', '_build')));

// app.post('/models', require('./models'));
app.get('/*', require('./index'));

app.listen(app.get('port'));
console.log('Listening on port %s', app.get('port'));
