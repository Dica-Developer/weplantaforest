'use strict';

describe('Controller: Plant-Shortcut-Ctrl', function () {

  // load the controller's module
  beforeEach(module('IPAT'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('Plant-Shortcut-Ctrl', {
      $scope: scope
    });
  }));

  it('should attach a list of things to the scope', function () {
    expect(scope).not.to.be.undefined;
  });
});
