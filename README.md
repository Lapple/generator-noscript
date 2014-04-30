# Noscript generator
[![Build Status](https://secure.travis-ci.org/Lapple/generator-noscript.png?branch=master)](https://travis-ci.org/Lapple/generator-noscript)

A [noscript](https://github.com/pasaran/noscript/) project generator for Yeoman.

## Getting started

Make sure you have [yo](https://github.com/yeoman/yo) and [grunt-cli](https://github.com/gruntjs/grunt-cli) installed:

    npm install -g yo grunt-cli

Install the generator:

    npm install -g generator-noscript

Make a new directory and `cd` into it:

    mkdir new-ns-project && cd $_

Run `yo noscript` and answer some prompts. After the dependencieas are
installed run `grunt build` to assemble the project or `grunt server` to
start local development server.

## Generators

List of available generators:

- [noscript](#app) (aka [noscript:app](#app))
- [noscript:model](#model)
- [noscript:view](#view)
- [noscript:list](#list)

**Note:** Generators are supposed to be run from the root directory of your app.

### App

Generates most of the boilerplate code you need to get started with a noscript
app. Sets up the following folder structure:

```
/app            Folder, containing your front-end code:
  /views        - ns.Views
  /models       - ns.Models
  /layouts      - ns.Layouts
  /actions      - ns.Actions
  /components   - non-ns code, e.g. widgets or helpers
  routes.js     - route definitions
  init.js       - initialization code

/server         Folder, containing back-end, express powered code:
  /views        - yate templates
  /models       - model retrieval modules
  server.js     - main server-side script
  models.js     - models connector
  index.js      - main application template renderer

/tests          Tests folder
  /spec         Spec folder
  tests.html    Test-runner file

/vendor         Folder, containing bower-installed dependencies
/styles         Project CSS written in Stylus

package.json
bower.json
Grunfile.js
```

`Gruntfile` comes bundled with following tasks:

- `grunt build` assembles the project, building templates and concatenating
scripts,
- `grunt server` builds the project and starts up a local instance
of express server with livereload.

The generated app will use:

- [Yate](https://github.com/pasaran/yate/) for templates,
- [Stylus](https://github.com/learnboost/stylus) for CSS preprocessing,
- [Express](https://github.com/visionmedia/express) as backend router and server.

Example:

    yo noscript

### Model

Generates `ns.Model` definition and pairs it with server-side model retrieval
module. Note that dasherized or underscored names are camel-cased as per
convention.

Pass `--collection` option to generate `ns.ModelCollection` definition.

Example:

    yo noscript:model sampleModel
    yo noscript:model sampleModels --collection

### View

Generates `ns.View` definition with a corresponding
[Yate](https://github.com/pasaran/yate/) template. Note that dasherized or
underscored names are camel-cased as per convention.

Pass `--collection` option to generate `ns.ViewCollection` definition.

Example:

    yo noscript:view sampleView
    yo noscript:view sampleViews --collection

### List

Lists views, models or layouts currently present in the project.

Example:

    yo noscript:list views
    yo noscript:list models
    yo noscript:list layouts

## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)
