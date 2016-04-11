'use strict';

module.exports = function (grunt) {

  // Load grunt tasks automatically, when needed
  require('jit-grunt')(grunt, {
    useminPrepare: 'grunt-usemin',
    ngtemplates: 'grunt-angular-templates',
    cdnify: 'grunt-google-cdn',
    protractor: 'grunt-protractor-runner',
    injector: 'grunt-asset-injector',
    buildcontrol: 'grunt-build-control'
  });

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    pkg: grunt.file.readJSON('package.json'),
    yeoman: {
      // configurable paths
      client: require('./bower.json').appPath || 'client',
      dist: 'resources/static'
    },
    watch: require('./grunt/watch'),

    // Make sure code styles are up to par and there are no obvious mistakes
    eslint: require('./grunt/eslint'),
    bootlint: require('./grunt/bootlint'),

    // Empties folders to start fresh
    clean: require('./grunt/clean'),

    // Add vendor prefixed styles
    autoprefixer: require('./grunt/autoprefixer'),

    // Automatically inject Bower components into the app
    wiredep: require('./grunt/wiredep'),

    // Renames files for browser caching purposes
    rev: require('./grunt/rev'),

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: require('./grunt/useminPrepare'),

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: require('./grunt/usemin'),

    // The following *-min tasks produce minified files in the dist folder
    imagemin: require('./grunt/imagemin'),

    svgmin: require('./grunt/svgmin'),

    // Allow the use of non-minsafe AngularJS files. Automatically makes it
    // minsafe compatible so Uglify does not destroy the ng references
    ngAnnotate: require('./grunt/ngAnnotate'),

    // Package all the html partials into a single javascript payload
    ngtemplates: require('./grunt/ngTemplates'),

    // Replace Google CDN references
    cdnify: require('./grunt/cdnify'),

    // Copies remaining files to places other tasks can use
    copy: require('./grunt/copy'),

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'less'
      ],
      test: [
        'less'
      ],
      dist: [
        'less',
        'imagemin',
        'svgmin'
      ]
    },

    // Test settings
    karma: require('./grunt/karma'),

    protractor: require('./grunt/protractor'),


    // Compiles Less to CSS
    less: require('./grunt/less'),

    injector: require('./grunt/injector')
  });

  grunt.registerTask('runYoRamlang', function () {
    var done = this.async();
    var yoCommand = (process.platform === "win32" ? "yo.cmd" : "yo");
	
    require('child_process').spawn(yoCommand, ['ramlang', '--force'])
      .on('close', done);
  });

  grunt.registerTask('buildApiDev', ['clean:api', 'runYoRamlang']);
  grunt.registerTask('buildApiStaging', ['clean:api', 'runYoRamlang']);

  grunt.registerTask('dev', [
    'buildApiDev',
    'injector:less',
    'injector',
    'wiredep',
    'less',
    'autoprefixer:dev',
    'watch'
  ]);

  grunt.registerTask('test', function (target) {
    if (target === 'client') {
      return grunt.task.run([
        'injector:less',
        'concurrent:test',
        'injector',
        'autoprefixer:dist',
        'karma'
      ]);
    }

    else if (target === 'e2e') {
      return grunt.task.run([
        'injector:less',
        'concurrent:test',
        'injector',
        'wiredep',
        'autoprefixer:dist',
        'express:dev',
        'protractor'
      ]);
    }

    else {
      grunt.task.run([
        'test:client'
      ]);
    }
  });

  grunt.registerTask('build', [
    'buildApiStaging',
    'clean:dist',
    'injector:less',
    'concurrent:dist',
    'injector',
    'wiredep',
    'useminPrepare',
    'autoprefixer:dist',
    'ngtemplates',
    'concat',
    'ngAnnotate',
    'copy:dist',
    'cdnify',
    'cssmin',
    'uglify',
    'rev',
    'usemin'
  ]);

  grunt.registerTask('default', [
    'newer:eslint',
    'newer:bootlint',
    'test',
    'build'
  ]);
};
