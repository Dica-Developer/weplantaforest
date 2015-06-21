(function () {
  'use strict';

  module.exports = {
    html: ['<%= yeoman.dist %>/{,*/}*.html'],
    css: ['<%= yeoman.dist %>/{,*/}*.css'],
    js: ['<%= yeoman.dist %>/{,*/}*.js'],
    options: {
      assetsDirs: [
        '<%= yeoman.dist %>',
        '<%= yeoman.dist %>/assets/images'
      ],
      // This is so we update image references in our ng-templates
      patterns: {
        js: [
          [/(assets\/images\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm, 'Update the JS to reference our revved images']
        ]
      }
    }
  };

}());
