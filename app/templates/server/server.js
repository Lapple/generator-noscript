'use strict';

var path = require('path');
var express = require('express');
var argv = require('optimist').argv;

var app = express();

app.engine('yate', require('./engine-yate'));

app.set('port', argv.port || 3000);
app.set('views', __dirname);
app.set('view engine', 'yate');

if (app.get('env') === 'development') {
    app.set('livereload', argv.livereload || 35729);
}

// Middlewares.
app.use(require('compression')());
app.use(require('method-override')());
app.use(require('body-parser')());
app.use(express.static(path.join(__dirname, '..', 'public')));

// Routing.
app.post('/models/', require('./route-models'));
app.get('/*', require('./route-index'));

app.listen(app.get('port'));
console.log('Listening on port %s', app.get('port'));
