'use strict';

/**
 * @ngdoc function
 * @name ContactCtrl
 * @description
 * # ContactCtrl
 * Controller of the Contact
 */
angular.module('sgApp')
  .controller('ContactCtrl', function ($rootScope) {
      $rootScope.$broadcast('viewChange', {'viewName': 'contact'});
  });
