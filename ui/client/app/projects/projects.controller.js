angular.module('IPAT')
  .controller('ProjectsCtrl', function ($scope, ProjectApi) {
    'use strict';

    $scope.projects = [];

    window.ProjectApi = ProjectApi
    ProjectApi.query().then(function(response) {
      if (200 === response.status) {
          $scope.projects = response.data._embedded.projectDtoes;
      } else {
        console.log("error occured");
      }
    }).catch(function() {
      console.log("error occured");
    });

    $scope.getPercentage = function (total, current) {
      var percentage = (100 * current / total);
      return Math.ceil(percentage);
    };
  });
