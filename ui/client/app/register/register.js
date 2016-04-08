angular.module('IPAT')
  .config(function ($stateProvider) {
    'use strict';

    $stateProvider
      .state('register', {
        url: '/register',
        templateUrl: 'app/register/register.html',
        controller: 'RegisterCtrl'
      });
  });
