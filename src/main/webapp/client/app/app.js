angular.module('IPAT', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'pascalprecht.translate',
  'api'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $translateProvider) {
    'use strict';

    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);

    $translateProvider
      .useStaticFilesLoader({
        prefix: 'i18n/locale-',
        suffix: '.json'
      })
      .useSanitizeValueStrategy('sanitize')
      .preferredLanguage('de');
  });
