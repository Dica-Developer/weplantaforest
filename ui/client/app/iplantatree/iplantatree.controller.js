angular.module('IPAT')
    .controller('IplantatreeCtrl', function ($scope, TreetypeApi, TreeApi, uiGmapGoogleMapApi, uiGmapIsReady) {
        'use strict';

        function getCoordinates(mapModel, eventName, originalEventArgs){
            var e = originalEventArgs[0];
            $scope.marker.coords = {
                latitude: e.latLng.lat(),
                longitude: e.latLng.lng()
            };
            $scope.marker.isSet = true;

            $scope.map.setCenter(e.latLng);
        }

        $scope.sendTree = function (){
            var tree = {
                id: null,
                longitude: $scope.marker.coords.longitude,
                latitude: $scope.marker.coords.latitude,
                submittedOn: new Date().getTime(),
                plantedOn: $scope.dt.getTime(),
                treeTypeName: $scope.selectedTreeType,
                ownerName: 'Sebastian',
                amount: $scope.treeAmount,
                description: $scope.description
            };

            TreeApi.put(tree)
            .then(function(response){
                    console.log(response);
                });
        };

        $scope.treeTypes = [];
        $scope.selectedTreeType = 'Ahorn';
        $scope.treeAmount = 1;
        $scope.description = '';
        $scope.coordsUpdates = 0;

        $scope.center = {
            longitude: 11.000,
            latitude: 51.000
        };

        $scope.zoom = 10;

        $scope.events = {
            'click': getCoordinates
        };

        $scope.marker = {
            id: 0,
            coords: {
                latitude: null,
                longitude: null
            },
            isSet: false
        };

        $scope.today = function () {
            $scope.dt = new Date();
        };
        $scope.today();

        $scope.clear = function () {
            $scope.dt = null;
        };

        $scope.open = function ($event) {
            $scope.status.opened = true;
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        $scope.format = 'dd.MM.yyyy';

        $scope.status = {
            opened: false
        };


        TreetypeApi.query()
            .then(function (resp) {
                $scope.treeTypes = resp.data._embedded.treeTypeDtoes;
                console.log($scope.treeTypes);
            });

        uiGmapGoogleMapApi.then(function (api) {
            console.log(api);
            uiGmapIsReady.promise(1).then(function (instances) {
                $scope.map = instances[0].map;
                console.log($scope.map);
            });
        });

    });
