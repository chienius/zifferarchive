module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        stylus: {
            compile: {
                files: {
                    './build/css/style.css': './src/view/css/style.styl'
                }
            }
        },
        jade: {
            compile: {
                files: {
                    './build/index.html': './src/view/index.jade'
                }
            }
        },
        copy: {
            compile: {
                files: [
                    {
                        src: './node_modules/jquery/dist/jquery.min.js', 
                        dest: './build/js/jquery.min.js'
                    },
                    {
                        src: './node_modules/angular/angular.min.js',
                        dest: './build/js/angular.min.js'
                    },
                    {
                        expand: true,
                        cwd: './node_modules/font-awesome/',
                        src: 'css/**',
                        dest: './build'
                    },
                    {
                        expand: true,
                        cwd: './node_modules/font-awesome/',
                        src: 'fonts/**',
                        dest: './build'
                    },
                    {
                        expand: true,
                        cwd: './src/public',
                        src: '**',
                        dest: './build'
                    },
                    {
                        expand: true,
                        cwd: './src/raw_images',
                        src: '*.jpg',
                        dest: './build/images/raw'
                    }
                ]
            }
        },
        shell: {
            genImg: {
                command: "./genimg && rm ./build/images/raw -Rf"
            },
            rmBuildDir: {
                command: "rm ./build -Rf"
            }
        },
        connect: {
            devServer: {
                options: {
                    port: 3000,
                    base: './build'
                }
            }
        },

        watch: {
            styles: {
                files: './src/view/css/*.styl',
                tasks: ['stylus']
            },
            jades: {
                files: './src/view/*.jade',
                tasks: ['jade']
            },
            public: {
                files: './src/public/**',
                tasks: ['copy']
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-shell');

    grunt.registerTask('build', ['copy', 'jade', 'stylus', 'shell:genImg']);
    grunt.registerTask('dev', ['build', 'connect', 'watch']);
    grunt.registerTask('clean', ['shell:rmBuildDir']);
};
