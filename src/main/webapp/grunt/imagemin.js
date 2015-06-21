'use strict';

module.exports = {
  dist: {
    files: [{
      expand: true,
      cwd: '<%= yeoman.client %>/assets/images',
      src: '{,*/}*.{png,jpg,jpeg,gif}',
      dest: '<%= yeoman.dist %>/assets/images'
    }]
  }
};
