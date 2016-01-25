'use strict';

module.exports = {
  dist: {
    files: [{
      expand: true,
      dot: true,
      cwd: '<%= yeoman.client %>',
      dest: '<%= yeoman.dist %>',
      src: [
        '*.{ico,png,txt}',
        '.htaccess',
        'i18n/**/*',
        'assets/images/{,*/}*.{webp}',
        'assets/fonts/**/*',
        'index.html'
      ]
    }, {
      expand: true,
      cwd: '.tmp/images',
      dest: '<%= yeoman.dist %>/assets/images',
      src: ['generated/*']
    }, {
      expand: true,
      dest: '<%= yeoman.dist %>',
      src: [
        'package.json'
      ]
    }]
  },
  styles: {
    expand: true,
    cwd: '<%= yeoman.client %>',
    dest: '.tmp/',
    src: ['{app,components}/**/*.css']
  }
};
