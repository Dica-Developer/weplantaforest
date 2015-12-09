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
      '<%= yeoman.client %>/app/app.css': '<%= yeoman.client %>/app/app.less'
    }
  }
};
