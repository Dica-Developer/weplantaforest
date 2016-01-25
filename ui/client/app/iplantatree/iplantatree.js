angular.module('IPAT')
  .config(function ($stateProvider) {
    'use strict';

    $stateProvider
      .state('iplantatree', {
        url: '/iplantatree',
        templateUrl: 'app/iplantatree/iplantatree.html',
        controller: 'IplantatreeCtrl'
      });
  });
