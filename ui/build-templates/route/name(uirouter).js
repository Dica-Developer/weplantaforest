angular.module('<%= scriptAppName %>')
  .config(function ($stateProvider) {
    'use strict';

    $stateProvider
      .state('<%= name %>', {
        url: '<%= route %>',
        templateUrl: '<%= htmlUrl %>',
        controller: '<%= classedName %>Ctrl'
      });
  });
