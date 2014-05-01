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
      'app/app.js',
      'app/init.js',
      'app/layout-main.js',
      'app/layout-not-found.js',
      'app/view-app.js',
      'app/view-welcome.js',
      'app/view-welcome.yate',
      'app/view-not-found.js',
      'app/view-not-found.yate',
      'server/server.js',
      'server/route-index.js',
      'server/route-models.js',
      'server/engine-yate.js',
      'server/page-index.yate',
      'tests/tests.html',
      'tests/spec/router.js',
      'package.json',
      'README.md',
      'Gruntfile.js',
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
