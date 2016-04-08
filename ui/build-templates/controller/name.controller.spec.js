'use strict';

describe('Controller: <%= classedName %>Ctrl', function () {

  // load the controller's module
  beforeEach(module('<%= scriptAppName %>'));

  var scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($injector) {
    var $rootScope = $injector.get('$rootScope'),
      $controller = $injector.get('$controller');

    scope = $rootScope.$new();
    $controller('<%= classedName %>Ctrl', {
      $scope: scope
    });
  }));

  it('should have defined scope', function () {
    expect(scope).not.to.be.undefined;
  });
});