'use strict';

var util = require('util');
var path = require('path');

var yeoman = require('yeoman-generator');

var ListGenerator = module.exports = function ListGenerator(args, options, config) {
  yeoman.generators.NamedBase.apply(this, arguments);

  this.expand(path.join('app', '**', this.name + '-*.js')).forEach(function(filePath) {
    this.log.info(path.basename(filePath, '.js'));
  }.bind(this));
};

util.inherits(ListGenerator, yeoman.generators.NamedBase);
