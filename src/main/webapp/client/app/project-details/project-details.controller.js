angular.module('IPAT')
  .controller('ProjectDetailsCtrl', function ($scope, $stateParams, ProjectApi, uiGmapGoogleMapApi, uiGmapIsReady) {
    'use strict';
    var coords = [];

    $scope.projectId = $stateParams.id;
    $scope.project = [];
    $scope.center = {};
    $scope.zoom = 16;

    ProjectApi.get($stateParams.id).then(function (response) {
      $scope.project = response.data;
      $scope.center = {
        longitude: response.data.longitude,
        latitude: response.data.latitude
      };
      coords = [
        [response.data.latitude + 0.0006, response.data.longitude + 0.002],
        [response.data.latitude + 0.0006, response.data.longitude - 0.002],
        [response.data.latitude - 0.0006, response.data.longitude - 0.002],
        [response.data.latitude - 0.0006, response.data.longitude + 0.002]
      ]
    }).catch(function () {
      console.log("error occured");
    });

    function getPolyConfig(api) {
      return {
        'path': coords.reduce(function (final, coordArray) {
          final.push(new api.LatLng(coordArray[0], coordArray[1]));
          return final;
        }, []),
        'fillColor': '#72AA21',
        'fillOpacity': 0.5,
        'strokeColor': '#72AA21',
        'strokeWeight': 1,
        'clickable': false,
        'draggable': false,
        'editable': false,
        'visible': true
      };
    }

    uiGmapGoogleMapApi.then(function (api) {
      uiGmapIsReady.promise(1).then(function (instances) {
        var inst = instances[0],
          map = inst.map,
          polygon = new api.Polygon(getPolyConfig(api));

        polygon.setMap(map);
      });
    });
  });
