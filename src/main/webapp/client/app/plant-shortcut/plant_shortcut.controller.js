angular.module('IPAT')
  .controller('Plant-Shortcut-Ctrl', function ($scope, ProjectApi) {
    'use strict';

    $scope.projects = [];

    window.ProjectApi = ProjectApi
    ProjectApi.active.query().then(function(response) {
      if (200 === response.status) {
          $scope.projects = response.data._embedded.projectDtoes;
      } else {
        console.log("error occured");
      }
    }).catch(function() {
      console.log("error occured");
    });
  });
