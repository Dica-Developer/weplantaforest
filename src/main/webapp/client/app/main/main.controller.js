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

    $scope.teaser = [
      {
        'image': {
          'src': 'http://placehold.it/350',
          'alt': ''
        },
        'title': 'MAIN.TEASER.1.TITLE',
        'text': 'MAIN.TEASER.1.TEXT'
      },
      {
        'image': {
          'src': 'http://placehold.it/350',
          'alt': ''
        },
        'title': 'MAIN.TEASER.2.TITLE',
        'text': 'MAIN.TEASER.2.TEXT'
      },
      {
        'image': {
          'src': 'http://placehold.it/350',
          'alt': ''
        },
        'title': 'MAIN.TEASER.3.TITLE',
        'text': 'MAIN.TEASER.3.TEXT'
      }
    ];

  });
