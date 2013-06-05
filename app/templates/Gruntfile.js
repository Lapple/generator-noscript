module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-yate');

    grunt.initConfig({

        yate: {
            templates: {
                options: {
                    runtime: true
                },
                files: {
                    '_build/_templates.js': [
                        'app/views/**/*.yate'
                    ]
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
                        '_build/_templates.js'
                    ]
                }
            }
        },
        uglify: {
            js: {
                src: '_build/app.js',
                dest: '_build/app.min.js'
            }
        },
        clean: {
            prebuild: [
                '_build'
            ],
            postbuild: [
                '_build/_*.js'
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

    grunt.registerTask('watch', function () {
    });

    grunt.registerTask('server', function () {
    });

};
