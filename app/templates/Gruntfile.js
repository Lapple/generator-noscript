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
                files: ['app/*.yate'],
                tasks: ['yate:templates']
            },
            pages: {
                files: ['server/*.yate'],
                tasks: ['yate:server']
            },
            styles: {
                files: ['styles/**/*.styl'],
                tasks: ['stylus']
            },
            livereload: {
                files: [
                    'public/*.{js,css}',
                    '!public/*.min.{js,css}',
                ],
                options: {
                    livereload: '<%= livereload %>'
                }
            }
        },
        browserify: {
            options: {
                watch: grunt.option('development'),
                keepAlive: grunt.option('development'),
                bundleOptions: {
                    // Enable source maps.
                    debug: grunt.option('development')
                }
            },
            app: {
                files: {
                    'public/app.js': 'app/app.js'
                }
            }
        },
        yate: {
            options: {
                runtime: true,
                writeAST: true
            },
            templates: {
                files: {
                    'public/templates.js': [
                        'node_modules/noscript/yate/*.yate',
                        'app/view-*.yate'
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
                    src: 'page-*.yate',
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
            options: {
                separator: ';'
            },
            libs: {
                files: {
                    'public/libs.js': [
                        'node_modules/es5-shim/es5-shim.js',
                        'node_modules/noscript/dist/noscript.js'
                    ]
                }
            },
            tests: {
                files: {
                    'public/tests.js': [
                        'tests/spec/**/*.js'
                    ]
                }
            }
        },
        uglify: {
            js: {
                src: [
                    'public/libs.js',
                    'public/templates.js',
                    'public/app.js'
                ],
                dest: 'public/app.min.js'
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
                'public/*.{js,css}',
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
                tasks: ['nodemon', 'browserify', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        mocha: {
            tests: {
                src: ['tests/tests.html'],
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
        'browserify',
        'concat:libs',
        'uglify',
        'cssmin'
    ]);

    grunt.registerTask('serve', [
        'clean',
        'yate',
        'stylus',
        'concat:libs',
        'concurrent:watchers'
    ]);

    grunt.registerTask('test', [
        'yate:templates',
        'browserify',
        'concat:libs',
        'concat:tests',
        'mocha'
    ]);
};
