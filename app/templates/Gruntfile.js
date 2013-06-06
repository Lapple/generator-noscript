'use strict';

var path = require('path');

module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-yate');

    grunt.initConfig({

        nommon: path.dirname(require.resolve('nommon')),

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
            templates: {
                options: {
                    runtime: true
                },
                files: {
                    '_build/templates.js': '_build/_templates.yate'
                }
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

    grunt.registerTask('watch', function () {
    });

    grunt.registerTask('server', function () {
    });

    grunt.registerMultiTask('prepareYate', function () {
        this.files.forEach(function (f) {
            grunt.file.write(f.dest, f.src.map(function (p) {
                return 'include "' + path.resolve(__dirname, p) + '"';
            }).join(grunt.util.linefeed));

            grunt.log.writeln('File ' + f.dest.cyan + ' created.');
        });
    });
};
