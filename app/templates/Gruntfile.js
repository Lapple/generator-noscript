'use strict';

module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-yate');
    grunt.loadNpmTasks('grunt-mocha');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');

    grunt.initConfig({

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
                        'node_modules/noscript/yate/*.yate',
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
                        'app/models/**/*.js',
                        'app/layouts/*.js',
                        'app/views/**/*.js',
                        'app/actions/**/*.js',
                        'app/*.js'
                    ],
                    'public/js/components.js': [
                        'node_modules/es5-shim/es5-shim.js',
                        'vendor/jquery/jquery.js',
                        'node_modules/noscript/dist/noscript.js'
                    ]
                }
            },
            css: {
                files: {
                    'public/css/main.css': [
                        'node_modules/noscript/css/*.css',
                        'public/css/main.css'
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
                    flatten: true,
                    ext: '.min.css',
                    src: 'public/css/*.css',
                    dest: 'public/css/'
                }]
            }
        },
        clean: {
            build: [
                'public/js/*.js',
                'public/css/*.css',
                'server/views/*.tmpl.js'
            ]
        },
        nodemon: {
            server: {
                options: {
                    file: 'server/server.js',
                    args: [
                        '--port', 3000,
                        '--livereload', '<%= livereload %>'
                    ],
                    watchedFolders: ['server']
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

    grunt.registerTask('server', [
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
