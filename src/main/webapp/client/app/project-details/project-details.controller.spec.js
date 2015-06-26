describe('Controller: ProjectDetailsCtrl', function () {
  'use strict';

  beforeEach(module('IPAT'));

  var scope;

  beforeEach(inject(function ($injector) {
    var $rootScope = $injector.get('$rootScope'),
      $controller = $injector.get('$controller');

    scope = $rootScope.$new();
    $controller('ProjectDetailsCtrl', {
      $scope: scope,
      $stateParams: {id: 13}
    });
  }));

  it('should have defined scope', function () {
    expect(scope).not.to.be.an('undefined');
  });
});
