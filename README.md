# Noscript generator
[![Build Status](https://secure.travis-ci.org/Lapple/generator-noscript.png?branch=master)](https://travis-ci.org/Lapple/generator-noscript)

A [noscript](https://github.com/pasaran/noscript/) project generator for Yeoman.

## Getting started

Make sure you have [yo](https://github.com/yeoman/yo) and the generator installed:

    npm install -g yo generator-noscript

Make a new directory and `cd` into it:

    mkdir new-ns-project && cd $_

Run `yo noscript` and answer some prompts. After the dependencieas are
installed run `npm run build` to assemble the project or `npm run serve` to
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
/app              Folder, containing your front-end code:
  view-*.js       - ns.Views
  model-*.js      - ns.Models
  layout-*.js     - ns.Layouts
  init.js         - initialization code
  app.js          - layout inclusion and route definitions

/server           Folder, containing back-end, Express powered code:
  page-*.yate     - Yate templates for different pages
  model-*.js      - model retrieval modules
  server.js       - main server-side script
  route-models.js - models connector
  route-index.js  - main application template renderer
  engine-yate.js  - Yate template engine for Express

/tests            Tests folder
  /spec           - spec folder
  tests.html      - test-runner file

/styles           Project CSS written in Stylus

package.json
Grunfile.js
README.md
```

Build, powered by Grunt, comes bundled with following tasks:

- `npm run build` assembles the project, building templates and concatenating
scripts,
- `npm run serve` builds the project and starts up a local instance
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

    yo noscript:list view
    yo noscript:list model
    yo noscript:list layout

## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)
