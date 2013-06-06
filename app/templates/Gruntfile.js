'use strict';

var path = require('path');
var child = require('child_process');

module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-yate');

    grunt.initConfig({

        nommon: path.dirname(require.resolve('nommon')),

        watch: {
            options: {
                interrupt: true
            },
            templates: {
                files: [
                    'app/views/**/*.yate'
                ],
                tasks: [
                    'prepareYate',
                    'yate:templates',
                    'concat',
                    'uglify'
                ]
            },
            js: {
                files: [
                    'app/**/*.js'
                ],
                tasks: [
                    'concat',
                    'uglify'
                ]
            }
        },
        prepareYate: {
            templates: {
                files: {
                    '_build/_templates.yate': [
                        'vendor/noscript/yate/*.yate',
                        'app/views/**/*.yate'
                    ]
                }
            }
        },
        yate: {
            options: {
                runtime: true
            },
            templates: {
                files: {
                    '_build/templates.js': '_build/_templates.yate'
                }
            },
            pages: {
                options: {
                    autorun: true,
                    // TODO: Optimize
                    postprocess: function(code) {
                        return code.replace(
                            'return function(data) { return yr.run("main", data); };',
                            'module.exports = function (data) { return yr.run("main", data); };'
                        );
                    }
                },
                files: [{
                    expand: true,
                    flatten: true,
                    src: 'server/pages/*.yate',
                    dest: '_build/pages',
                    ext: '.js'
                }]
            }
        },
        concat: {
            js: {
                options: {
                    separator: ';'
                },
                files: {
                    '_build/app.js': [
                        'app/routes.js',
                        'app/models/**/*.js',
                        'app/layouts/*.js',
                        'app/views/**/*.js',
                        'app/actions/**/*.js',
                        'app/init.js'
                    ],
                    '_build/components.js': [
                        'vendor/jquery/jquery.js',

                        // Nommon section.
                        '<%= nommon %>/no.js',
                        '<%= nommon %>/no.events.js',
                        '<%= nommon %>/no.path.js',
                        '<%= nommon %>/no.parser.js',
                        '<%= nommon %>/no.promise.js',
                        '<%= nommon %>/no.jpath.js',

                        // Noscript section.
                        'vendor/noscript/src/ns.js',
                        'vendor/noscript/src/ns.consts.js',
                        'vendor/noscript/src/ns.consts.events.js',
                        'vendor/noscript/src/ns.dom.js',
                        'vendor/noscript/src/ns.http.js',
                        'vendor/noscript/src/ns.log.js',
                        'vendor/noscript/src/ns.object.js',
                        'vendor/noscript/src/ns.action.js',
                        'vendor/noscript/src/ns.box.js',
                        'vendor/noscript/src/ns.layout.js',
                        'vendor/noscript/src/ns.model.js',
                        'vendor/noscript/src/ns.page.js',
                        'vendor/noscript/src/ns.history.js',
                        'vendor/noscript/src/ns.request.js',
                        'vendor/noscript/src/ns.router.js',
                        'vendor/noscript/src/ns.update.js',
                        'vendor/noscript/src/ns.view.js'
                    ]
                }
            }
        },
        uglify: {
            js: {
                src: [
                    '_build/components.js',
                    '_build/templates.js',
                    '_build/app.js'
                ],
                dest: 'public/app.min.js'
            }
        },
        express: {
            options: {
                main: 'server/server.js',
                port: 3000
            }
        },
        clean: {
            prebuild: [
                '_build'
            ],
            postbuild: [
                '_build/_*.{js,yate}'
            ]
        }

    });

    grunt.registerTask('build', [
        'clean:prebuild',
        'prepareYate',
        'yate',
        'concat',
        'uglify',
        'clean:postbuild'
    ]);

    grunt.registerTask('server', [
        'build',
        'express',
        'watch'
    ]);

    grunt.registerMultiTask('prepareYate', function () {
        this.files.forEach(function (f) {
            grunt.file.write(f.dest, f.src.map(function (p) {
                return 'include "' + path.resolve(__dirname, p) + '"';
            }).join(grunt.util.linefeed));

            grunt.log.writeln('File ' + f.dest.cyan + ' created.');
        });
    });

    grunt.registerTask('express', function () {
        var options = this.options();

        var server = child.spawn('node', [
            options.main,
            '--port',
            options.port
        ]);

        server.stdout.on('data', function (data) {
            console.log('\n' + '[express]'.yellow + '\n%s', data);
        });

        server.stderr.on('data', function (data) {
            console.error('\n' + '[express]'.red + '\n%s', data);
        });

        process.on('exit', server.kill);
    });
};
