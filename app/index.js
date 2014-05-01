'use strict';

var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var NoscriptGenerator = module.exports = function NoscriptGenerator(args, options) {
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
    var done = this.async();

    var welcome = [
        '                               _       __ ',
        '   ____  ____  _______________(_)___  / /_',
        '  / __ \\/ __ \\/ ___/ ___/ ___/ / __ \\/ __/',
        ' / / / / /_/ (__  ) /__/ /  / / /_/ / /_  ',
        '/_/ /_/\\____/____/\\___/_/  /_/ .___/\\__/  ',
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

        done();
    }.bind(this));
};

NoscriptGenerator.prototype.app = function app() {
    this.mkdir('app');

    this.mkdir('tests');
    this.mkdir('tests/spec');

    this.copy('app/app.js', 'app/app.js');
    this.copy('app/view-app.js', 'app/view-app.js');
    this.template('app/init.js', 'app/init.js');
    this.template('app/layout-main.js', 'app/layout-main.js');
    this.template('app/layout-not-found.js', 'app/layout-not-found.js');

    if (!this.bare) {
        this.copy('app/view-welcome.js', 'app/view-welcome.js');
        this.template('app/view-welcome.yate', 'app/view-welcome.yate');

        this.copy('app/view-not-found.js', 'app/view-not-found.js');
        this.copy('app/view-not-found.yate', 'app/view-not-found.yate');
    }

    this.template('tests/tests.html', 'tests/tests.html');
    this.copy('tests/spec/router.js', 'tests/spec/router.js');
};

NoscriptGenerator.prototype.server = function server() {
    this.mkdir('server');

    this.copy('server/server.js', 'server/server.js');
    this.copy('server/route-index.js', 'server/route-index.js');
    this.copy('server/route-models.js', 'server/route-models.js');
    this.copy('server/engine-yate.js', 'server/engine-yate.js');
    this.template('server/page-index.yate', 'server/page-index.yate');
};

NoscriptGenerator.prototype.styles = function styles() {
    this.mkdir('styles');

    this.template('styles/main.styl', 'styles/main.styl');
};

NoscriptGenerator.prototype.projectfiles = function projectfiles() {
    this.template('_package.json', 'package.json');
    this.template('_README.md', 'README.md');

    this.copy('Gruntfile.js', 'Gruntfile.js');

    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.copy('gitignore', '.gitignore');
};
