/*
 * Created by huyhoang on 10/10/16.
 */

var sgAdminApp = angular.module('SgAdminApp', [
    'ui.router',
    'ngSanitize',
    'ngAnimate',
    'ui.bootstrap',
    'ngMaterial',
    'ngMessages',
    'ngResource']);

sgAdminApp
    .config(function ($urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
    })
    .config(function ($stateProvider) {
        $stateProvider
            .state('createNewProduct', {
                url: '/product/new',
                templateUrl: '/admin/createNewProduct.html',
                controller: 'CreateNewProductCtrl'
            })
            .state('createNewOrder', {
                url: '/order/new',
                templateUrl: '/admin/createNewOrder.html',
                controller: 'CreateNewOrderCtrl'
            })
            .state('orderReport', {
                url: '/orders/report',
                templateUrl: '/admin/orderReport.html',
                controller: 'OrderReportCtrl'
            })
        ;
    })
    .config(function($mdDateLocaleProvider) {
        $mdDateLocaleProvider.parseDate = function(dateString) {
            var m = moment(dateString, 'DD/MM/YYYY', true);
            return m.isValid() ? m.toDate() : new Date(NaN);
        };

        $mdDateLocaleProvider.formatDate = function(date) {
            return moment(date).format('DD/MM/YYYY');
        };
    })
;

sgAdminApp.controller('SgAdminAppController', function($rootScope, $scope, $http) {
});