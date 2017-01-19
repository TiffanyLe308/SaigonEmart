(function () {
    'use strict';

    angular.module('sgApp')
        .directive('newProducts', newProducts);

    function newProducts() {
        return {
            controller: 'NewProductsCtrl',
            restrict: 'E',
            replace: false,
            scope: {
            },
            templateUrl: '/js/directives/newProducts/newProducts.html'
        };
    }
})();