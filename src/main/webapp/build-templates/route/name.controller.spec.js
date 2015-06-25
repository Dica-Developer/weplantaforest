describe('Controller: <%= classedName %>Ctrl', function () {
  'use strict';

  beforeEach(module('<%= scriptAppName %>'));

  var scope;

  beforeEach(inject(function ($injector) {
    var $rootScope = $injector.get('$rootScope'),
      $controller = $injector.get('$controller');

    scope = $rootScope.$new();
    $controller('<%= classedName %>Ctrl', {
      $scope: scope
    });
  }));

  it('should have defined scope', function () {
    expect(scope).not.to.be.an('undefined');
  });
});
