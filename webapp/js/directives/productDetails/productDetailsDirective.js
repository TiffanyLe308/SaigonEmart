(function () {
    'use strict';

    angular.module('sgApp').directive('productDetails', product);

    function product() {
        var directiveDefinition = {
            controller: 'ProductDetailsCtrl',
            restrict: 'E',
            replace: false,
            scope: {
                product: '='
            },
            templateUrl: 'js/directives/productDetails/productDetails.html'
        };

        return directiveDefinition;
    }
})();