'use strict';

var serveStatic = require('serve-static');

module.exports = function(grunt){

    grunt.initConfig({

      pkg: grunt.file.readJSON('package.json'),

      connect: {
        options: {
          port: 9000,
          hostname: '0.0.0.0',
          middleware: function(connect){
            return [
              connect().use('/bower_components',serveStatic('./bower_components')),
              serveStatic('./app')
            ];
          }
        },
        dist: {
          options: {
            base: 'dist'
          }
        },
        server: {
          options: {
            base: 'app'
          }
        }
      },

      // check for naive errors in javascript code
      jshint: {
        options: {
          reporter: require('jshint-stylish')
        },
        all: {
          src: ['Gruntfile.js','app/**/*.js']
        },
        test: {
          src: ['test/{,*/}*.js']
        }
      },

      // Minify javascript files
      uglify: {
        options: {
          banner: '/*\n minifiedJS <%= pkg.name %> <%= grunt.template.today("yy mm dd") %>\n*/'
        },
        build: {
          files: {
            'dist/js/scripts.min.js': 'app/js/**/*.js'
          }
        }
      },

      // Minify css files
      cssmin: {
        options: {
          banner: '/*\n minifiedCSS <%= pkg.name %> <%= grunt.template.today("yy mm dd") %>\n*/'
        },
        build: {
          files: {
            'dist/css/styles.css': 'app/styles/main.sass'
          }
        }
      },

      karma: {
        unit: {
          configFile: 'karma.conf.js'
        }
      }

    });

    grunt.registerTask('test', ['karma']);

    grunt.registerTask('build', ['jshint','uglify','cssmin']);

    grunt.registerTask('serve', ['connect:server:keepalive']);

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-karma');

}
