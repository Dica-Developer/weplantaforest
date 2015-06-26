angular.module('IPAT')
  .controller('ProjectsCtrl', function ($scope) {
    'use strict';

    $scope.projects = [
      {
        'id': 13,
        'name': 'Berlin Mittelheide',
        'pictureLink': 'https://placeholdit.imgix.net/~text?txtsize=26&w=350&h=350&txttrack=0&txt=Berlin Mittelheide',
        'teaser': 'PROJECTS.13.TEASER',
        'text': 'PROJECTS.13.TEXT'
      },
      {
        'id': 12,
        'name': 'Wallendorf II',
        'pictureLink': 'https://placeholdit.imgix.net/~text?txtsize=26&w=350&h=350&txttrack=0&txt=Wallendorf II',
        'teaser': 'PROJECTS.12.TEASER',
        'text': 'PROJECTS.12.TEXT'
      },
      {
        'id': 11,
        'name': 'Deponie Wallendorf I',
        'pictureLink': 'https://placeholdit.imgix.net/~text?txtsize=26&w=350&h=350&txttrack=0&txt=Deponie Wallendorf I',
        'teaser': 'PROJECTS.11.TEASER',
        'text': 'PROJECTS.11.TEXT'
      }
    ];
  });
