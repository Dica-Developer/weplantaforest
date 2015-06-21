angular.module('IPAT')
  .controller('NavbarCtrl', function ($scope, $location) {
    'use strict';

    $scope.menu = [
      {
        'title': 'Pflanzen',
        'link': '/plant-shortcut'
      },
      {
        'title': 'Entdecken',
        'link': '/explore'
      }
    ];

    $scope.isCollapsed = true;

    $scope.isActive = function (route) {
      return route === $location.path();
    };
  });
