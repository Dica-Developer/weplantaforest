describe('Controller: FooterCtrl', function () {
  'use strict';

  beforeEach(module('IPAT', function ($translateProvider) {
    $translateProvider.translations('en', {});
    $translateProvider.translations('de', {});
  }));

  beforeEach(module('components/footer/footer.html'));

  var scope,
    $rootScope,
    $translate,
    $state;

  beforeEach(inject(function ($injector) {
    var $controller = $injector.get('$controller');

    $rootScope = $injector.get('$rootScope');
    $state = $injector.get('$state');
    $translate = $injector.get('$translate');

    scope = $rootScope.$new();
    $controller('FooterCtrl', {
      $scope: scope
    });
  }));

  it('should be defined', function () {
    expect(scope).not.to.be.an('undefined');
  });

  it('shoud have default language set to "Deutsch"', function () {
    expect($translate.preferredLanguage()).to.equal('de');
  });

  describe('getSwitchLanguageToString', function () {

    it('should return "Deutsch" if language is set to "en"', function () {
      $translate.use('en');
      expect(scope.getSwitchLanguageToString()).to.equal('Deutsch');
    });

    it('should return "English" if language is set to "de"', function () {
      $translate.use('de');
      expect(scope.getSwitchLanguageToString()).to.equal('English');
    });
  });

  describe('switchLanguage', function () {

    it('should toggle language', function () {
      expect($translate.use()).to.equal('de');
      scope.switchLanguage();
      expect($translate.use()).to.equal('en');
      scope.switchLanguage();
      expect($translate.use()).to.equal('de');
    });

  });

});
