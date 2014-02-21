module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      build: {
        src: 'kkcountdown/js/build/kkcountdown.js',
        dest: 'kkcountdown/js/build/kkcountdown.min.js'
      }
    },

    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'assets/css/build/style.css': 'assets/css/style.scss'
        }
      }
    },

    coffee: {
      compile: {
        files: {
          'kkcountdown/js/build/kkcountdown.js': 'kkcountdown/js/kkcountdown.coffee'
        }
      }
    },

    qunit: {
      // all: ['test/**/*.html']
      all: ['test/*.html']
    },

    watch: {
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: ['jshint:gruntfile'],
      },
      css: {
        files: ['assets/css/style.scss'],
        tasks: ['css']
      },
      scripts: {
        files: ['kkcountdown/js/kkcountdown.coffee'],
        tasks: ['js']
      }
    }

  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-qunit');

  // Default task(s).
  grunt.registerTask('default', ['sass','coffee','uglify','watch', 'qunit']);
  grunt.registerTask('css', ['sass']);
  grunt.registerTask('js', ['coffee','uglify']);

};