describe('Controller: Plant-Shortcut-Ctrl', function () {
  'use strict';

  // load the controller's module
  beforeEach(module('IPAT'));

  var scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    $controller('Plant-Shortcut-Ctrl', {
      $scope: scope
    });
  }));

  it('should attach a list of things to the scope', function () {
    expect(scope).not.to.be.an('undefined');
  });
});
