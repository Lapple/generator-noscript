'use strict';

var _ = require('lodash');
var _s = require('underscore.string');
var async = require('async');

function extractModels(params) {
    return _.values(_.reduce(params, function(memo, value, key) {
        var index = key.split('.').pop();
        var param = key.slice(0, -(index.length + 1));

        memo[index] = memo[index] || {};
        memo[index][param] = value;

        return memo;
    }, {}));
}

function getModelPath(model) {
    return './model-' + _s.dasherize(model).replace(/^\-/, '');
}

function getModel(params, callback) {
    try {
        require(getModelPath(params._model))(params, callback);
    } catch (err) {
        callback(null, {
            error: err.message || err
        });
    }
}

module.exports = function(req, res) {
    var params = _.extend({}, req.params, req.body);

    async.map(extractModels(params), getModel, function(err, models) {
        if (err) {
            res.json({
                error: err.message || err
            });
        } else {
            res.json({
                models: models
            });
        }
    });
};
