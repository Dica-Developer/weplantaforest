'use strict';

describe('Controller: NavbarCtrl', function () {

  beforeEach(module('IPAT', function ($translateProvider) {
    $translateProvider.translations('en', {});
    $translateProvider.translations('de', {});
  }));

  beforeEach(module('app/plant-shortcut/plant_shortcut.html'));

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

    beforeEach(function () {
      $state.go('plant-shortcut');
      $rootScope.$digest();
    });

    it('should return true if given argument is equal to current route', function () {
      expect(scope.isActive('/plant-shortcut')).to.be.true;
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
