angular.module('IPAT')
  .config(function ($stateProvider) {
    'use strict';

    $stateProvider
      .state('project-details', {
        url: '/project/:id',
        templateUrl: 'app/project-details/project-details.html',
        controller: 'ProjectDetailsCtrl'
      });
  });
