(function () {
    'use strict';

    angular.module('sgApp')
        .controller('NewProductsCtrl', NewProductsCtrl);

    function NewProductsCtrl($scope, $http) {
        $scope.newProductIds = [2, 29, 122];
        $scope.newProducts = [];

        var i, product;
        for (i = 0; i < $scope.newProductIds.length; i++) {
            $http({
                method: 'GET',
                url: '/product/' + $scope.newProductIds[i]
            }).then(function successCallback(response) {
                product = response.data;
                $scope.newProducts.push(product);
            }, function errorCallback(response) {
                console.error(JSON.stringify(response));
            });
        }
    }
})();