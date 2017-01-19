(function () {
    'use strict';

    angular.module('sgApp')
        .controller('BestSellingProductsCtrl', BestSellingProductsCtrl);

    function BestSellingProductsCtrl($scope, $rootScope, $http) {
        $scope.bestSellingProductsIds = [2, 29, 122];
        $scope.bestSellingProducts = [];

        var i, product;
        for (i = 0; i < $scope.bestSellingProductsIds.length; i++) {
            $http({
                method: 'GET',
                url: '/product/' + $scope.bestSellingProductsIds[i]
            }).then(function successCallback(response) {
                product = response.data;
                $scope.bestSellingProducts.push(product);
            }, function errorCallback(response) {
                console.error(JSON.stringify(response));
            });
        }
    }
})();