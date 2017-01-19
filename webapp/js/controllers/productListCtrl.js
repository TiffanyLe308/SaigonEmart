'use strict';

/**
 * @ngdoc function
 * @name ProductListCtrl
 * @description
 * # ProductCategoryCtrl
 * Controller of Product Category page
 */
angular.module('sgApp')
    .controller('ProductListCtrl', function ($rootScope, $scope, $stateParams, $http) {
        $rootScope.$broadcast('viewChange', {'viewName': 'product'});
        $scope.products = [];
        $scope.categoryId = $stateParams.categoryId;
        $scope.subcategoryId = $stateParams.subcategoryId;
        $scope.productCategoryNameKey = 'views.index.product.category.' + $scope.categoryId;
        $scope.productSubcategoryNameKey = 'views.index.product.category.' + $scope.categoryId + '.subcategory.' + $scope.subcategoryId;

        $http({
            method: 'POST',
            url:  '/products/' + $scope.categoryId + '/' + $scope.subcategoryId
        }).then(function successCallback(response) {
            $scope.products = response.data;
        }, function errorCallback(response) {
            $scope.products = [];
        });
    });
