(function () {
  'use strict';

  module.exports = {
    options: {
      paths: [
        '<%= yeoman.client %>/bower_components',
        '<%= yeoman.client %>/app',
        '<%= yeoman.client %>/components'
      ]
    },
    server: {
      files: {
        '.tmp/app/app.css' : '<%= yeoman.client %>/app/app.less'
      }
    }
  };

}());
