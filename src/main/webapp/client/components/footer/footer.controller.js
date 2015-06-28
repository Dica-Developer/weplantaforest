angular.module('IPAT')
  .controller('FooterCtrl', function ($scope, $translate) {
    'use strict';

    $scope.sitemap = {
      'LINK.PLANTINGS': {
        'LINK.PLANTINGS': 'main',
        'LINK.PROJECT_ACREAGES': 'projects',
        'LINK.CERTIFICATE': 'main',
        'LINK.VOUCHER': 'main'
      },
      'LINK.LEAGUE_TABLES': {
        'LINK.ALL': 'main',
        'LINK.PRIVATE': 'main',
        'LINK.COMMERCIAL': 'main',
        'LINK.NON_PROFIT_ORG': 'main',
        'LINK.SCHOOLS': 'main',
        'LINK.TEAMS': 'main'
      },
      'LINK.COMPANY': {
        'LINK.IDEA': 'main',
        'LINK.CODEX': 'main',
        'LINK.TEAM': 'main',
        'LINK.PARTNERS': 'main',
        'LINK.FINANCIALS': 'main',
        'LINK.JOBS': 'main',
        'LINK.PRESS': 'main'
      }
    };

    $scope.getSwitchLanguageToString = function (){
      return $translate.use() === 'en' ? 'Deutsch' : 'English';
    };

    $scope.switchLanguage = function () {
      var langKey = $translate.use() === 'de' ? 'en' : 'de';
      $translate.use(langKey);
    };
  });
