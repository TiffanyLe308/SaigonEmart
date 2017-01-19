'use strict';

/**
 * @ngdoc function
 * @name AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of About Us
 */
angular.module('sgApp')
    .controller('AboutCtrl', function ($rootScope) {
        $rootScope.$broadcast('viewChange', {'viewName': 'about'});
    });
