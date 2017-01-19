/**
 * Created by huyhoang on 6/5/16.
 */
'use strict';

/**
 * @ngdoc function
 * @name LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of Login page
 */
angular.module('sgApp')
    .controller('LoginCtrl', function ($rootScope, $scope, $http, $location) {
        $rootScope.$broadcast('viewChange', {'viewName': 'login'});

        
    });
