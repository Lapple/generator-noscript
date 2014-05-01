'use strict';

var util = require('util');
var path = require('path');

var _s = require('underscore.string');
var yeoman = require('yeoman-generator');
var inflect = require('inflect-js');

var FILE_PREFIX = 'model-';

var ModelGenerator = module.exports = function ModelGenerator(args, options) {
    yeoman.generators.NamedBase.apply(this, arguments);
    this.fileName = FILE_PREFIX + _s.dasherize(this.name).replace(/^\-/, '');
    this.modelName = _s.camelize(this.name);
    this.isCollection = !!options.collection;

    if (this.name !== this.modelName) {
        this.log.info('converting %s to %s as per convention', this.name, this.modelName);
    }

    if (this.isCollection) {
        this.childModelName = inflect.singularize(this.modelName);
        this.childModelFileName = inflect.singularize(this.fileName);
    }

    this.log.create('model ' + this.modelName);
};

util.inherits(ModelGenerator, yeoman.generators.NamedBase);

ModelGenerator.prototype.files = function files() {
    var appTemplate = this.isCollection ? '_model-collection.js' : '_model.js';
    var serverTemplate = this.isCollection ? '_model-server-collection.js' : '_model-server.js';

    this.template(appTemplate, path.join('app', this.fileName + '.js'));
    this.template(serverTemplate, path.join('server', this.fileName + '.js'));
};
