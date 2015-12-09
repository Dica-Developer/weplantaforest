angular.module('IPAT', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'uiGmapgoogle-maps',
  'pascalprecht.translate',
  'api'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $translateProvider, uiGmapGoogleMapApiProvider) {
    'use strict';

    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(false);

    $translateProvider
      .useStaticFilesLoader({
        prefix: 'i18n/locale-',
        suffix: '.json'
      })
      .useSanitizeValueStrategy('sanitize')
      .preferredLanguage('de');

    uiGmapGoogleMapApiProvider.configure({
      //    key: 'your api key',
      v: '3.17',
      libraries: 'geometry,visualization'
    });
  });
