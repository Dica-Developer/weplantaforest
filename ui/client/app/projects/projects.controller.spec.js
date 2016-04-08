describe('Controller: ProjectsCtrl', function () {
  'use strict';

  // load the controller's module
  beforeEach(module('IPAT'));

  var scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($injector) {
    var $rootScope = $injector.get('$rootScope'),
      $controller = $injector.get('$controller');

    scope = $rootScope.$new();
    $controller('ProjectsCtrl', {
      $scope: scope
    });
  }));

  it('should have defined scope', function () {
    expect(scope).not.to.be.an('undefined');
  });
});
