angular.module('IPAT')
  .config(function ($stateProvider) {
    'use strict';

    $stateProvider
      .state('projects', {
        url: '/projects',
        templateUrl: 'app/projects/projects.html',
        controller: 'ProjectsCtrl'
      });
  });
