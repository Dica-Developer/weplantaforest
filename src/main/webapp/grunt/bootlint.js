'use strict';

module.exports = {
  options: {
    stoponerror: false,
    relaxerror: ['E001', 'W001', 'W002', 'W003', 'W005']
  },
  files: ['<%= yeoman.client %>/{app,components}/**/*.html']
};
