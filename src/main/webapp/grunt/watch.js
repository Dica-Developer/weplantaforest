'use strict';

module.exports = {
  injectJS: {
    files: [
      '<%= yeoman.client %>/{app,components}/**/*.js',
      '!<%= yeoman.client %>/{app,components}/**/*.spec.js',
      '!<%= yeoman.client %>/{app,components}/**/*.mock.js',
      '!<%= yeoman.client %>/app/app.js'],
    tasks: ['injector:scripts']
  },
  injectCss: {
    files: [
      '<%= yeoman.client %>/{app,components}/**/*.css'
    ],
    tasks: ['injector:css']
  },
  jsTest: {
    files: [
      '<%= yeoman.client %>/{app,components}/**/*.spec.js',
      '<%= yeoman.client %>/{app,components}/**/*.mock.js'
    ],
    tasks: ['newer:eslint', 'karma']
  },
  injectLess: {
    files: [
      '<%= yeoman.client %>/{app,components}/**/*.less'],
    tasks: ['injector:less']
  },
  less: {
    files: [
      '<%= yeoman.client %>/{app,components}/**/*.less'],
    tasks: ['less', 'autoprefixer']
  },
  gruntfile: {
    files: ['Gruntfile.js']
  },
  livereload: {
    files: [
      '{.tmp,<%= yeoman.client %>}/{app,components}/**/*.css',
      '{.tmp,<%= yeoman.client %>}/{app,components}/**/*.html',
      '{.tmp,<%= yeoman.client %>}/{app,components}/**/*.js',
      '!{.tmp,<%= yeoman.client %>}{app,components}/**/*.spec.js',
      '!{.tmp,<%= yeoman.client %>}/{app,components}/**/*.mock.js',
      '<%= yeoman.client %>/assets/images/{,*//*}*.{png,jpg,jpeg,gif,webp,svg}'
    ],
    options: {
      livereload: true
    }
  }
};
