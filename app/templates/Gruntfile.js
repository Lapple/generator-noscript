'use strict';

var path = require('path');
var child = require('child_process');

module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-yate');

    grunt.initConfig({

        nommon: path.dirname(require.resolve('nommon')),
        livereload: 35729,

        watch: {
            options: {
                interrupt: true
            },
            templates: {
                files: [
                    'app/views/**/*.yate'
                ],
                tasks: [
                    'yate:templates'
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
                    'concat:js'
                ]
            },
            styles: {
                files: [
                    'styles/**/*.styl'
                ],
                tasks: [
                    'stylus',
                    'concat:css'
                ]
            },
            livereload: {
                files: [
                    'public/js/*.js',
                    'public/css/*.css',
                    'server/views/*.tmpl.js',
                    '!public/js/*.min.js',
                    '!public/css/*.min.css',
                ],
                options: {
                    livereload: '<%= livereload %>'
                }
            }
        },
        yate: {
            options: {
                runtime: true
            },
            templates: {
                files: {
                    'public/js/templates.js': [
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
        stylus: {
            options: {
                'include css': true,
                compress: false,
                import: [
                    'nib'
                ]
            },
            main: {
                files: {
                    'public/css/main.css': 'styles/main.styl'
                }
            }
        },
        concat: {
            js: {
                options: {
                    separator: ';'
                },
                files: {
                    'public/js/app.js': [
                        'app/routes.js',
                        'app/models/**/*.js',
                        'app/layouts/*.js',
                        'app/views/**/*.js',
                        'app/actions/**/*.js',
                        'app/init.js'
                    ],
                    'public/js/components.js': [
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
            },
            css: {
                files: {
                    'public/css/main.css': [
                        'vendor/noscript/css/*.css',
                        'public/css/main.css'
                    ]
                }
            }
        },
        uglify: {
            js: {
                src: [
                    'public/js/components.js',
                    'public/js/templates.js',
                    'public/js/app.js'
                ],
                dest: 'public/js/app.min.js'
            }
        },
        cssmin: {
            css: {
                files: [{
                    expand: true,
                    flatten: true,
                    ext: '.min.css',
                    src: 'public/css/*.css',
                    dest: 'public/css/'
                }]
            }
        },
        express: {
            options: {
                main: 'server/server.js',
                port: 3000
            }
        },
        clean: {
            build: [
                'public/js/*.js',
                'public/css/*.css',
                'server/views/*.tmpl.js'
            ]
        }

    });

    grunt.registerTask('build', [
        'clean',
        'yate',
        'stylus',
        'concat',
        'uglify',
        'cssmin'
    ]);

    grunt.registerTask('server', [
        'clean',
        'yate',
        'stylus',
        'concat',
        'express',
        'watch'
    ]);

    grunt.registerTask('express', function () {
        var options = this.options();

        var server = child.spawn('node', [
            options.main,
            '--port',
            options.port,
            '--livereload',
            grunt.config('livereload')
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
