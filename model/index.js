'use strict';

var util = require('util');
var path = require('path');

var _s = require('underscore.string');
var yeoman = require('yeoman-generator');

var ModelGenerator = module.exports = function ModelGenerator(args, options, config) {
  yeoman.generators.NamedBase.apply(this, arguments);
  this.fileName = _s.dasherize(this.name).replace(/^\-/, '');
  this.modelName = _s.camelize(this.name);

  if (this.name !== this.modelName) {
    this.log.info('converting %s to %s as per convention', this.name, this.modelName);
  }

  this.log.create('model ' + this.modelName);
};

util.inherits(ModelGenerator, yeoman.generators.NamedBase);

ModelGenerator.prototype.files = function files() {
  this.template('_model.js', path.join('app/models', this.fileName + '.js'));
  this.template('_model-server.js', path.join('server/models', this.fileName + '.js'));
};
