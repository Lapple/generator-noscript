/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;


describe('noscript generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('noscript:app', ['../../app']);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      'app/routes.js',
      'app/init.js',
      'app/page.js',
      'app/layouts/main.js',
      'app/layouts/not-found.js',
      'app/views/app/app.js',
      'app/views/welcome/welcome.js',
      'app/views/welcome/welcome.yate',
      'app/views/not-found/not-found.js',
      'app/views/not-found/not-found.yate',
      'server/server.js',
      'server/index.js',
      'server/models.js',
      'server/views/index.yate',
      'tests/tests.html',
      'tests/spec/router.js',
      'package.json',
      'bower.json',
      'README.md',
      'Gruntfile.js',
      '.bowerrc',
      '.gitignore',
      '.jshintrc',
      '.editorconfig'
    ];

    helpers.mockPrompt(this.app, {
      'projectName': 'test',
      'bare': 'Y'
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });
});
