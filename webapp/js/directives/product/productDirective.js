(function () {
    'use strict';

    angular.module('sgApp')
        .directive('product', product);

    function product() {
        var directiveDefinition = {
            controller: 'ProductCtrl',
            restrict: 'E',
            replace: false,
            scope: {
                product: '='
            },
            templateUrl: 'js/directives/product/product.html'
        };

        return directiveDefinition;
    }
})();
