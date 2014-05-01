'use strict';

var util = require('util');
var path = require('path');

var _s = require('underscore.string');
var yeoman = require('yeoman-generator');
var inflect = require('inflect-js');

var FILE_PREFIX = 'view-';

var ViewGenerator = module.exports = function ViewGenerator(args, options) {
    yeoman.generators.NamedBase.apply(this, arguments);
    this.fileName = FILE_PREFIX + _s.dasherize(this.name).replace(/^\-/, '');
    this.viewName = _s.camelize(this.name);
    this.isCollection = !!options.collection;

    if (this.name !== this.viewName) {
        this.log.info('converting %s to %s as per convention', this.name, this.viewName);
    }

    if (this.isCollection) {
        this.childViewName = inflect.singularize(this.viewName);
        this.childViewFileName = inflect.singularize(this.fileName);
    }

    this.log.create('view ' + this.viewName);
};

util.inherits(ViewGenerator, yeoman.generators.NamedBase);

ViewGenerator.prototype.files = function files() {
    var viewTemplate = this.isCollection ? '_view-collection.js' : '_view.js';
    var yateTemplate = this.isCollection ? '_view-collection.yate' : '_view.yate';

    var viewBaseName = path.join('app', this.fileName);

    this.template(viewTemplate, viewBaseName + '.js');
    this.template(yateTemplate, viewBaseName + '.yate');
};
