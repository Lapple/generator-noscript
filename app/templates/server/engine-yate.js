'use strict';

var path = require('path');

module.exports = function(file, data, callback) {
    try {
        var compiled = path.basename(file, '.yate') + '.tmpl.js';
        var template = require(path.join(path.dirname(file), compiled));

        callback(null, template(data));
    } catch (err) {
        callback(err, null);
    }
};
