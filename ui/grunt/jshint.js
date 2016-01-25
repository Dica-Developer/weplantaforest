'use strict';

module.exports = {
  options: {
    jshintrc: '<%= yeoman.client %>/.jshintrc',
    reporter: require('jshint-stylish')
  },
  all: [
    '<%= yeoman.client %>/{app,components}/**/*.js',
    '!<%= yeoman.client %>/{app,components}/**/*.spec.js',
    '!<%= yeoman.client %>/{app,components}/**/*.mock.js'
  ],
  test: {
    src: [
      '<%= yeoman.client %>/{app,components}/**/*.spec.js',
      '<%= yeoman.client %>/{app,components}/**/*.mock.js'
    ]
  }
};
