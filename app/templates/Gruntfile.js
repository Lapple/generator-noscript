'use strict';

module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        livereload: 35729,
        watch: {
            options: {
                interrupt: true
            },
            templates: {
                files: ['app/views/**/*.yate'],
                tasks: ['yate:templates']
            },
            views: {
                files: ['server/*.yate'],
                tasks: ['yate:server']
            },
            js: {
                files: ['app/*.js'],
                tasks: ['concat:js']
            },
            styles: {
                files: ['styles/**/*.styl'],
                tasks: ['stylus', 'concat:css']
            },
            livereload: {
                files: [
                    'public/js/*.js',
                    'public/*.css',
                    '!public/js/*.min.js',
                    '!public/*.min.css',
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
                        'node_modules/noscript/yate/*.yate',
                        'app/views/*.yate'
                    ]
                }
            },
            server: {
                options: {
                    modular: true
                },
                files: [{
                    expand: true,
                    cwd: 'server',
                    src: '*.yate',
                    dest: 'server',
                    ext: '.tmpl.js'
                }]
            }
        },
        stylus: {
            options: {
                'include css': true,
                compress: false
            },
            main: {
                files: {
                    'public/main.css': 'styles/main.styl'
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
                        'app/models/**/*.js',
                        'app/layouts/*.js',
                        'app/views/**/*.js',
                        'app/actions/**/*.js',
                        'app/*.js'
                    ],
                    'public/js/components.js': [
                        'node_modules/es5-shim/es5-shim.js',
                        'node_modules/noscript/dist/noscript.js'
                    ]
                }
            },
            css: {
                files: {
                    'public/main.css': [
                        'node_modules/noscript/css/*.css',
                        'public/main.css'
                    ]
                }
            },
            tests: {
                files: {
                    'public/js/tests.js': [
                        'tests/spec/**/*.js'
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
                    cwd: 'public',
                    src: '*.css',
                    dest: 'public',
                    ext: '.min.css'
                }]
            }
        },
        clean: {
            build: [
                'public/*.css',
                'public/js/*.js',
                'server/*.tmpl.js'
            ]
        },
        nodemon: {
            server: {
                script: 'server/server.js',
                options: {
                    args: [
                        '--port', 3000,
                        '--livereload', '<%= livereload %>'
                    ],
                    watch: ['server']
                }
            }
        },
        concurrent: {
            watchers: {
                tasks: [
                    'nodemon',
                    'watch'
                ],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        mocha: {
            tests: {
                src: [
                    'tests/tests.html'
                ],
                options: {
                    log: true,
                    run: true
                }
            }
        }

    });

    grunt.registerTask('build', [
        'clean',
        'yate',
        'stylus',
        'concat:js',
        'concat:css',
        'uglify',
        'cssmin'
    ]);

    grunt.registerTask('serve', [
        'clean',
        'yate',
        'stylus',
        'concat:js',
        'concat:css',
        'concurrent:watchers'
    ]);

    grunt.registerTask('test', [
        'yate:templates',
        'concat:js',
        'concat:tests',
        'mocha'
    ]);
};
