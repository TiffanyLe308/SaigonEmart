'use strict';

/**
 * @ngdoc function
 * @name HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of Home page
 */
angular.module('sgApp')
    .controller('HomeCtrl', function ($rootScope, $scope) {
        $rootScope.$broadcast('viewChange', {'viewName': 'home'});
    });
