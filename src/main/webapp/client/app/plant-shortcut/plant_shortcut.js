'use strict';

angular.module('IPAT')
  .config(function ($stateProvider) {
    $stateProvider
      .state('plant-shortcut', {
        url: '/plant-shortcut',
        templateUrl: 'app/plant-shortcut/plant_shortcut.html',
        controller: 'Plant-Shortcut-Ctrl'
      });
  });