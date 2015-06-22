angular.module('IPAT')
  .controller('MainCtrl', function ($scope) {
    'use strict';

    $scope.slides = [
      {
        'image': 'http://lorempixel.com/1140/400/nature/4',
        'title': 'MAIN.SLIDES.1.TITLE',
        'text': 'MAIN.SLIDES.1.TEXT'
      },
      {
        'image': 'http://lorempixel.com/1140/400/nature/8',
        'title': 'MAIN.SLIDES.2.TITLE',
        'text': 'MAIN.SLIDES.2.TEXT'
      },
      {
        'image': 'http://lorempixel.com/1140/400/nature/12',
        'title': 'MAIN.SLIDES.3.TITLE',
        'text': 'MAIN.SLIDES.3.TEXT'
      }
    ];

  });
