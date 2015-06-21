(function () {
  'use strict';

  module.exports = {
      options: {
        configFile: '<%= yeoman.client %>/.eslintrc'
      },
      target: [
        '<%= yeoman.client %>/{app,components}/**/!(api)/*.js',
        '!<%= yeoman.client %>/{app,components}/**/*.spec.js',
        '!<%= yeoman.client %>/{app,components}/**/*.mock.js'
      ]
  };

}());
