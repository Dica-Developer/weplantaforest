angular.module('IPAT', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'api'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    'use strict';

    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
