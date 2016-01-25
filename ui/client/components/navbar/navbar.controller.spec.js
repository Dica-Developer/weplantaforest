describe('Controller: NavbarCtrl', function () {
  'use strict';

  beforeEach(module('IPAT', function ($translateProvider) {
    $translateProvider.translations('en', {});
    $translateProvider.translations('de', {});
  }));

  beforeEach(module('app/plant-shortcut/plant_shortcut.html'));

  var scope,
    $rootScope,
    $state;

  beforeEach(inject(function ($injector) {
    var $controller = $injector.get('$controller');

    $rootScope = $injector.get('$rootScope');
    $state = $injector.get('$state');

    scope = $rootScope.$new();
    $controller('NavbarCtrl', {
      $scope: scope
    });
  }));

  it('should be defined', function () {
    expect(scope).not.to.be.an('undefined');
  });

  describe('isCollapsed', function () {

    it('should return true', function () {
      expect(scope.isCollapsed).to.equal(true);
    });

  });

  describe('isActive', function () {

    beforeEach(function () {
      $state.go('plant-shortcut');
      $rootScope.$digest();
    });

    it('should return true if given argument is equal to current route', function () {
      expect(scope.isActive('/plant-shortcut')).to.equal(true);
    });

    it('should return false if given argument is not equal to current route', function () {
      expect(scope.isActive('/notEqual')).to.equal(false);
    });

  });

});
