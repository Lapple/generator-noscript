'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var NoscriptGenerator = module.exports = function NoscriptGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(NoscriptGenerator, yeoman.generators.Base);

NoscriptGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  console.log('Noscript Generator');

  var prompts = [{
    name: 'projectName',
    message: 'Project name:'
  }];

  this.prompt(prompts, function (err, props) {
    if (err) {
      return this.emit('error', err);
    }

    this.projectName = props.projectName;

    cb();
  }.bind(this));
};

NoscriptGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/layouts');
  this.mkdir('app/views');
  this.mkdir('app/views/app');
  this.mkdir('app/models');
  this.mkdir('app/actions');

  this.mkdir('server');
  this.mkdir('server/pages');

  this.mkdir('vendor');
  this.mkdir('public');

  this.template('_package.json', 'package.json');
  this.template('_bower.json', 'bower.json');
  this.template('_README.md', 'README.md');
  this.template('bowerrc', '.bowerrc');

  this.copy('Gruntfile.js', 'Gruntfile.js');

  this.copy('app/routes.js', 'app/routes.js');
  this.copy('app/init.js', 'app/init.js');
  this.copy('app/layouts/main.js', 'app/layouts/main.js');
  this.copy('app/views/app/app.js', 'app/views/app/app.js');
  this.copy('app/views/app/app.yate', 'app/views/app/app.yate');

  this.template('server/server.js', 'server/server.js');
  this.template('server/pages/index.yate', 'server/pages/index.yate');
};

NoscriptGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
  this.copy('gitignore', '.gitignore');
};
