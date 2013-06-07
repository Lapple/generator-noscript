'use strict';

var util = require('util');
var path = require('path');

var _s = require('underscore.string');
var yeoman = require('yeoman-generator');

var ViewGenerator = module.exports = function ViewGenerator(args, options, config) {
  yeoman.generators.NamedBase.apply(this, arguments);
  this.fileName = _s.dasherize(this.name).replace(/^\-/, '');
  this.viewName = _s.camelize(this.name);

  this.on('end', function () {
    console.log('+ view ' + this.viewName.green);
  }.bind(this));
};

util.inherits(ViewGenerator, yeoman.generators.NamedBase);

ViewGenerator.prototype.files = function files() {
  this.mkdir(path.join('app/views', this.fileName));
  this.template('_view.js', path.join('app/views', this.fileName, this.fileName + '.js'));
};
