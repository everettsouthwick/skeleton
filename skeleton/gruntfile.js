/// <binding ProjectOpened='watch' />
// Load Grunt
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Tasks
        sass: { // Begin Sass Plugin
            dist: {
                options: {
                    sourcemap: 'none'
                },
                files: [{
                    expand: true,
                    cwd: 'wwwroot/sass',
                    src: 'main.scss',
                    dest: 'wwwroot/css',
                    ext: '.css'
                }]
            }
        },
        postcss: { // Begin Post CSS Plugin
            options: {
                map: false,
                processors: [
                    require('autoprefixer')({
                        browsers: ['last 2 versions']
                    })
                ]
            },
            dist: {
                src: 'wwwroot/css/main.css'
            }
        },
        cssmin: { // Begin CSS Minify Plugin
            target: {
                files: [{
                    expand: true,
                    cwd: 'wwwroot/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'wwwroot/css',
                    ext: '.min.css'
                }]
            }
        },
        concat: { // Begin JS Concat Plugin
            options: {
                separator: ';',
            },
            dist: {
                src: ['wwwroot/js/src/**/*.js'],
                dest: 'wwwroot/js/main.js',
            },
        },
        uglify: { // Begin JS Uglify Plugin
            build: {
                src: ['wwwroot/js/main.js'],
                dest: 'wwwroot/js/main.min.js'
            }
        },
        watch: { // Compile everything into one task with Watch Plugin
            css: {
                files: 'wwwroot/sass/**/*.scss',
                tasks: ['sass', 'postcss', 'cssmin']
            },
            js: {
                files: 'wwwroot/js/src/**/*.js',
                tasks: ['concat', 'uglify']
            }
        }
    });
    // Load Grunt plugins
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Register Grunt tasks
    grunt.registerTask('default', ['watch']);
};