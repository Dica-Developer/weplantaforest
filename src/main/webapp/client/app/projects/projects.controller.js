angular.module('IPAT')
  .controller('ProjectsCtrl', function ($scope) {
    'use strict';

    $scope.projects = [
      {
        'id': 13,
        'name': 'Berlin Mittelheide',
        'pictureLink': 'https://placeholdit.imgix.net/~text?txtsize=26&w=350&h=350&txttrack=0&txt=Berlin Mittelheide',
        'teaser': 'PROJECTS.13.TEASER',
        'text': 'PROJECTS.13.TEXT',
        'total': 18000,
        'current': 1608
      },
      {
        'id': 12,
        'name': 'Wallendorf II',
        'pictureLink': 'https://placeholdit.imgix.net/~text?txtsize=26&w=350&h=350&txttrack=0&txt=Wallendorf II',
        'teaser': 'PROJECTS.12.TEASER',
        'text': 'PROJECTS.12.TEXT',
        'total': 12400,
        'current': 11742
      },
      {
        'id': 11,
        'name': 'Deponie Wallendorf I',
        'pictureLink': 'https://placeholdit.imgix.net/~text?txtsize=26&w=350&h=350&txttrack=0&txt=Deponie Wallendorf I',
        'teaser': 'PROJECTS.11.TEASER',
        'text': 'PROJECTS.11.TEXT',
        'total': 6200,
        'current': 6200
      }
    ];

    $scope.getPercentage = function (total, current) {
      var percentage = (100 * current / total);
      return Math.ceil(percentage);
    };
  });
