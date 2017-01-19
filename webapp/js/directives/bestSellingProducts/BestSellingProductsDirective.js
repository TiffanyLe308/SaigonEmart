(function () {
    'use strict';

    angular.module('sgApp')
        .directive('bestSellingProducts', bestSellingProducts);

    function bestSellingProducts() {
        return {
            controller: 'BestSellingProductsCtrl',
            restrict: 'E',
            replace: false,
            scope: {
            },
            templateUrl: '/js/directives/bestSellingProducts/bestSellingProducts.html'
        };
    }
})();