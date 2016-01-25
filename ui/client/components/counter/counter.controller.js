angular.module('IPAT')
  .controller('CounterCtrl', function ($scope, $interval, ReportApi) {
    'use strict';
    var updateReportsInterval;

    function getReports() {
      ReportApi
        .co2
        .query()
        .then(function (response) {
          $scope.co2 = response.data.co2.toFixed(2);
          $scope.trees = response.data.treesCount;
        });
    }

    $scope.co2 = 0;
    $scope.trees = 0;

    updateReportsInterval = $interval(getReports, 10000);

    $scope.$on('$destroy', function() {
        $interval.cancel(updateReportsInterval);
      }
    );

    getReports();
  });

