'use strict';

describe('Controller: NavbarCtrl', function () {

  beforeEach(module('IPAT', function ($translateProvider) {
    $translateProvider.translations('en', {});
    $translateProvider.translations('de', {});
  }));

  var scope,
    $translate;

  beforeEach(inject(function ($injector) {
    var $controller = $injector.get('$controller'),
      $rootScope = $injector.get('$rootScope');

    $translate = $injector.get('$translate');

    scope = $rootScope.$new();
    $controller('NavbarCtrl', {
      $scope: scope
    });
  }));

  it('should be defined', function () {
    expect(scope).not.to.be.an('undefined');
  });

  it('shoud have default language set to Deutsch', function () {
    expect($translate.preferredLanguage()).to.equal('de');
  });

  describe('isCollapsed', function () {

    it('should return true', function () {
      expect(scope.isCollapsed).to.be.true;
    });

  });

  describe('isActive', function () {

    it('should return true if given argument is equal to current route', function () {
      expect(scope.isActive('/')).to.be.true;
    });

    it('should return false if given argument is not equal to current route', function () {
      expect(scope.isActive('/notEqual')).to.be.false;
    });

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
