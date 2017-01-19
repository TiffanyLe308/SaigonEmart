'use strict';

/**
 * @ngdoc function
 * @name ServicesCtrl
 * @description
 * # ServicesCtrl
 * Controller of Services page
 */
angular.module('sgApp')
    .controller('ServicesCtrl', function ($rootScope) {
        $rootScope.$broadcast('viewChange', {'viewName': 'services'});
    });
