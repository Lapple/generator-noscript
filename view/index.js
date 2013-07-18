'use strict';

var util = require('util');
var path = require('path');

var _s = require('underscore.string');
var yeoman = require('yeoman-generator');
var inflect = require('inflect-js');

var ViewGenerator = module.exports = function ViewGenerator(args, options, config) {
  yeoman.generators.NamedBase.apply(this, arguments);
  this.fileName = _s.dasherize(this.name).replace(/^\-/, '');
  this.viewName = _s.camelize(this.name);
  this.isCollection = !!options.collection;

  if (this.name !== this.viewName) {
    this.log.info('converting %s to %s as per convention', this.name, this.viewName);
  }

  if (this.isCollection) {
    this.subviewName = inflect.singularize(this.viewName);
  }

  this.log.create('view ' + this.viewName);
};

util.inherits(ViewGenerator, yeoman.generators.NamedBase);

ViewGenerator.prototype.files = function files() {
  this.mkdir(path.join('app', 'views', this.fileName));

  var viewTemplate = this.isCollection ? '_view-collection.js' : '_view.js';
  var yateTemplate = this.isCollection ? '_view-collection.yate' : '_view.yate';

  var viewBaseName = path.join('app', 'views', this.fileName, this.fileName);

  this.template(viewTemplate, viewBaseName + '.js');
  this.template(yateTemplate, viewBaseName + '.yate');
};
