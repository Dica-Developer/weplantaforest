'use strict';

module.exports = {
  dist: {
    files: {
      src: [
        '<%= yeoman.dist %>/{,*/}*.js',
        '<%= yeoman.dist %>/{,*/}*.css',
        '<%= yeoman.dist %>/assets/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
        '<%= yeoman.dist %>/assets/fonts/*'
      ]
    }
  }
};
