'use strict';

module.exports = {
  target: {
    src: '<%= yeoman.client %>/index.html',
    ignorePath: '<%= yeoman.client %>/',
    exclude: [/bootstrap-sass-official/, /bootstrap.js/, '/json3/', '/es5-shim/', /bootstrap.css/, /font-awesome.css/]
  }
};
