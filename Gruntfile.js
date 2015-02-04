module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        stylus: {
            devCompile: {
                files: {
                    './preview/css/style.styl': './src/view/css/style.styl'
                }
            }
        },
        jade: {
            devCompile: {
                files: {
                    './preview/index.html': './src/view/index.jade'
                }
            }
        },
        copy: {
            devCompile: {
                files: [
                    {
                        src: './node_modules/jquery/dist/jquery.min.js', 
                        dest: './preview/js/'
                    },
                    {
                        src: './node_modules/angular/angular.min.js',
                        dest: './preview/js/'
                    }
                ]
            }
        },
        connect: {
            devServer: {
                options: {
                    port: 3000,
                    base: './preview'
                }
            }
        },

        watch: {
            styles: {
                files: './src/view/css/*.styl',
                tasks: ['stylus:devCompile']
            },
            jades: {
                files: './src/view/*.jade',
                tasks: ['jade:devCompile']
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('dev', ['connect:devServer', 'copy:devCompile', 'jade:devCompile', 'stylus:devCompile', 'watch']);
};
