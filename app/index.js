'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var NoscriptGenerator = module.exports = function NoscriptGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.on('error', function (err) {
    this.log.error(err.message || err);
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(NoscriptGenerator, yeoman.generators.Base);

NoscriptGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  var welcome = [
    '                               _       __ ',
    '   ' + '____'.bold + '  ____  ' + '_____'.bold + '__________(_)___  / /_',
    '  ' + '/ __ \\'.bold + '/ __ \\' + '/ ___/'.bold + ' ___/ ___/ / __ \\/ __/',
    ' / / / /'.bold + ' /_/ ' + '(__  )'.bold + ' /__/ /  / / /_/ / /_  ',
    '/_/ /_/'.bold + '\\____' + '/____/'.bold + '\\___/_/  /_/ .___/\\__/  ',
    '                            /_/           '
  ].join('\n');

  console.log(welcome);

  var prompts = [
    {
      name: 'projectName',
      message: 'Project name:'
    },
    {
      type: 'confirm',
      name: 'bare',
      message: 'Generate sample views?',
      default: 'y/N'
    }
  ];

  this.prompt(prompts, function (err, props) {
    if (err) {
      return this.emit('error', err);
    }

    this.projectName = props.projectName;
    this.bare = /n/gi.test(props.bare);

    cb();
  }.bind(this));
};

NoscriptGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/views');
  this.mkdir('app/models');
  this.mkdir('app/actions');
  this.mkdir('app/layouts');
  this.mkdir('app/components');

  this.mkdir('server');
  this.mkdir('server/views');
  this.mkdir('server/models');

  this.mkdir('vendor');
  this.mkdir('styles');
  this.mkdir('tests');
  this.mkdir('tests/spec');

  this.copy('app/routes.js', 'app/routes.js');
  this.copy('app/init.js', 'app/init.js');
  this.template('app/page.js', 'app/page.js');
  this.template('app/layouts/main.js', 'app/layouts/main.js');
  this.template('app/layouts/not-found.js', 'app/layouts/not-found.js');
  this.copy('app/views/app/app.js', 'app/views/app/app.js');

  if (!this.bare) {
    this.copy('app/views/welcome/welcome.js', 'app/views/welcome/welcome.js');
    this.template('app/views/welcome/welcome.yate', 'app/views/welcome/welcome.yate');
    this.copy('app/views/not-found/not-found.js', 'app/views/not-found/not-found.js');
    this.copy('app/views/not-found/not-found.yate', 'app/views/not-found/not-found.yate');
  }

  this.template('styles/main.styl', 'styles/main.styl');

  this.template('server/server.js', 'server/server.js');
  this.template('server/index.js', 'server/index.js');
  this.template('server/models.js', 'server/models.js');
  this.template('server/views/index.yate', 'server/views/index.yate');

  this.template('tests/tests.html', 'tests/tests.html');
  this.copy('tests/spec/router.js', 'tests/spec/router.js');
};

NoscriptGenerator.prototype.projectfiles = function projectfiles() {
  this.template('_package.json', 'package.json');
  this.template('_bower.json', 'bower.json');
  this.template('_README.md', 'README.md');
  this.template('bowerrc', '.bowerrc');

  this.copy('Gruntfile.js', 'Gruntfile.js');

  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
  this.copy('gitignore', '.gitignore');
};
