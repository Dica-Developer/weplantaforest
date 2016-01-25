angular.module('IPAT')
  .controller('NavbarCtrl', function ($scope, $location) {
    'use strict';

    $scope.menu = [
      {
        'title': 'LINK.PLANT',
        'link': 'plant-shortcut'
      },
      {
        'title': 'LINK.EXPLORE',
        'link': 'explore'
      }
    ];

    $scope.isCollapsed = false;

    $scope.isActive = function (route) {
      return route === $location.path();
    };
  });
