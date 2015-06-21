(function () {
  'use strict';

  module.exports = {
    dist: {
      options: {
        force: true
      },
      files: [{
        dot: true,
        src: [
          '.tmp',
          '<%= yeoman.dist %>/*',
          '!<%= yeoman.dist %>/dev'
        ]
      }]
    }
  };

}());
