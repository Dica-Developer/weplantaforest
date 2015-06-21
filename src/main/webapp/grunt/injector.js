'use strict';

module.exports = {
  options: {},
  // Inject application script files into index.html (doesn't include bower)
  scripts: {
    options: {
      transform: function (filePath) {
        filePath = filePath.replace('/client/', '');
        filePath = filePath.replace('/.tmp/', '');
        return '<script src="' + filePath + '"></script>';
      },
      starttag: '<!-- injector:js -->',
      endtag: '<!-- endinjector -->'
    },
    files: {
      '<%= yeoman.client %>/index.html': [
        ['{.tmp,<%= yeoman.client %>}/{app,components}/**/*.js',
          '!{.tmp,<%= yeoman.client %>}/app/app.js',
          '!{.tmp,<%= yeoman.client %>}/components/api/api.js',
          '!{.tmp,<%= yeoman.client %>}/{app,components}/**/*.spec.js',
          '!{.tmp,<%= yeoman.client %>}/{app,components}/**/*.mock.js']
      ]
    }
  },

  // Inject component less into app.less
  less: {
    options: {
      transform: function (filePath) {
        filePath = filePath.replace('/client/app/', '');
        filePath = filePath.replace('/client/components/', '');
        return '@import \'' + filePath + '\';';
      },
      starttag: '// injector',
      endtag: '// endinjector'
    },
    files: {
      '<%= yeoman.client %>/app/app.less': [
        '<%= yeoman.client %>/{app,components}/**/*.less',
        '!<%= yeoman.client %>/app/app.less'
      ]
    }
  },

  // Inject component css into index.html
  css: {
    options: {
      transform: function (filePath) {
        filePath = filePath.replace('/client/', '');
        filePath = filePath.replace('/.tmp/', '');
        return '<link rel="stylesheet" href="' + filePath + '">';
      },
      starttag: '<!-- injector:css -->',
      endtag: '<!-- endinjector -->'
    },
    files: {
      '<%= yeoman.client %>/index.html': [
        '<%= yeoman.client %>/{app,components}/**/*.css'
      ]
    }
  }
};
