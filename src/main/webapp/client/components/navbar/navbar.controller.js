angular.module('IPAT')
  .controller('NavbarCtrl', function ($scope, $location, $translate) {
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

    $scope.isCollapsed = true;

    $scope.isActive = function (route) {
      return route === $location.path();
    };

    $scope.getSwitchLanguageToString = function (){
      return $translate.use() === 'en' ? 'Deutsch' : 'English';
    };

    $scope.switchLanguage = function () {
      var langKey = $translate.use() === 'de' ? 'en' : 'de';
      $translate.use(langKey);
    };
  });
