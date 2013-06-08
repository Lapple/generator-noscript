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
                    'yate:templates',
                    'concat',
                    'uglify'
                ]
            },
            views: {
                files: [
                    'server/views/*.yate'
                ],
                tasks: [
                    'yate:server'
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
        yate: {
            options: {
                runtime: true
            },
            templates: {
                files: {
                    '_build/js/templates.js': [
                        'vendor/noscript/yate/*.yate',
                        'app/views/**/*.yate'
                    ]
                }
            },
            server: {
                options: {
                    modular: true
                },
                files: [{
                    expand: true,
                    flatten: true,
                    src: 'server/views/*.yate',
                    dest: 'server/views/',
                    ext: '.tmpl.js'
                }]
            }
        },
        concat: {
            js: {
                options: {
                    separator: ';'
                },
                files: {
                    '_build/js/app.js': [
                        'app/routes.js',
                        'app/models/**/*.js',
                        'app/layouts/*.js',
                        'app/views/**/*.js',
                        'app/actions/**/*.js',
                        'app/init.js'
                    ],
                    '_build/js/components.js': [
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
                    '_build/js/components.js',
                    '_build/js/templates.js',
                    '_build/js/app.js'
                ],
                dest: '_build/js/app.min.js'
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
                '_build',
                'server/views/*.tmpl.js'
            ],
            postbuild: [
                '_build/_*.{js,yate}'
            ]
        }

    });

    grunt.registerTask('build', [
        'clean:prebuild',
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
