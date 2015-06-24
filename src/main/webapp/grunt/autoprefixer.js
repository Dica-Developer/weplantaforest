'use strict';

module.exports = {
  options: {
    browsers: ['last 1 version']
  },
  dist: {
    files: [{
      expand: true,
      cwd: '.tmp/',
      src: '{,*/}*.css',
      dest: '.tmp/'
    }]
  },
  dev: {
    files: [{
      expand: true,
      cwd: 'client/app',
      src: '{,*/}*.css',
      dest: 'client/app'
    }]
  }
};
