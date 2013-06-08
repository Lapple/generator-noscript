var path = require('path');

var express = require('express');
var yate = require('yate');
var argv = require('optimist').argv;

var app = express();

app.engine('yate', function (file, data, callback) {
    try {
        var compiled = path.basename(file, '.yate') + '.tmpl.js';
        var template = require(path.join(path.dirname(file), compiled));

        callback(null, template(data));
    } catch (err) {
        callback(err, null);
    }
});

app.set('port', argv.port || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'yate');

app.configure('development', function () {
    app.set('livereload', argv.livereload || 35729);
});

app.use(express.compress());
app.use(express.methodOverride());
app.use(express.bodyParser());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.post('models/', require('./models'));
app.get('*', require('./index'));

app.listen(app.get('port'));
console.log('Listening on port %s', app.get('port'));
