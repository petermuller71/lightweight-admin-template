module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({        
        pkg: grunt.file.readJSON('package.json'),
            
            concurrent: {
                target1: ['clean'],
                target2: ['sass'],
                target3: ['postcss:dist'],
                target4: ['csslint'],
                target5: ['cssmin'],
                target6: ['uglify'],
                target7: ['usebanner']
            },

            clean: {
              build: {
                src: ['dist', 'css']
              }
            },

            sass: {
                dist: {
                    options:{
                        sourceMap: true,
                        sourceComments: true,
                        style: 'compact',
                        update: true
                    },
                    files: [{
                        expand: true,
                        cwd:  'sass',
                        src:  ['**/*.scss'],
                        dest: 'css',
                        ext:  '.css'
                    }]                            

                }
            },

            postcss: {
                options: {
                  processors: [
                    require('autoprefixer')({browsers: '> 1%, last 2 version'})
                  ]
                },

                dist: {
                  src: [
                    'css/**/*.css',
                    '!css/**/*min.css'
                  ]
                }
            },       

            csslint: {
                options: {
                    csslintrc: '.csslintrc',
                    import: false
                },
                check: {
                    src: [
                        'css/**/*.css'
                    ]
                }
            },

            cssmin: {                
                options:{
                    sourcemap: true,
                    shorthandCompacting: true,
                    keepSpecialComments: 0,    
                    removeDuplicates: false,   
                    restructure: true,        
                    mergeAdjacent: true,
                    mergeMediaQueries: true
                },
                target: {
                    files: [{
                         expand: true,
                         cwd: 'css',
                         src: ['**/*.css'],
                         dest: 'dist',
                         ext: '.min.css'
                    }]
                }
            },

            uglify: {  
                compress: {
                    sourcemap: true,
                    sequences: true,
                    dead_code: true,
                    conditionals: true,
                    booleans: true,
                    unused: true,
                    if_return: true,
                    join_vars: true,
                    drop_console: true,
                    preserveComments : 'all'
                },
                target: {
                    files: [{
                         expand: true,
                         cwd: 'js',
                         src: ['**/*.js'],
                         dest: 'dist',
                         ext: '.min.js'
                    }]
                }
            },

            usebanner: {
                taskName: {
                  options: {
                    position: 'top',
                    banner: '/* \n '+
                            '*   Name        : lightweight-admin-template \n '+
                            '*   Version     : <%= pkg.version %> \n '+
                            '*   Build Time  : <%= grunt.template.today("yyyy-mm-dd hh:MM") %> \n '+
                            '*   Author      : Irfan Maulana \n '+
                            '*   Github Repo : https://github.com/mazipan/lightweight-admin-template \n '+
                            '*/',
                    linebreak: true
                  },
                  files: {
                    src: [
                        'dist/**/*.min.css',
                        'dist/**/*.min.js'
                    ]
                  }
                }
            },

            watch: {
                css: {
                    files: '**/*.scss',
                    tasks: ['sass']
                }
            }
    });


    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-banner');
    
    grunt.registerTask('default',
            [
                'concurrent:target1',
                'concurrent:target2',
                'concurrent:target3',
                'concurrent:target4',
                'concurrent:target5',
                'concurrent:target6',
                'concurrent:target7'
            ]);
};
