(function () {
    'use strict';

    angular.module('sgApp')
        .controller('ProductCtrl', ProductController)
        .controller('PanelDialogCtrl', PanelDialogCtrl);

    function ProductController($scope, $rootScope, $mdPanel) {

        $scope.viewProductDetails = function() {
            var position = $mdPanel.newPanelPosition().absolute().center();
            var animation = $mdPanel.newPanelAnimation();
            animation.withAnimation($mdPanel.animation.FADE);
            var config = {
                animation: animation,
                locals: {
                    product: $scope.product
                },
                attachTo: angular.element(document.body),
                controller: PanelDialogCtrl,
                controllerAs: 'ctrl',
                disableParentScroll: this.disableParentScroll,
                templateUrl: '/js/directives/panel/panel.html',
                hasBackdrop: true,
                panelClass: 'product-dialog',
                position: position,
                trapFocus: true,
                zIndex: 150,
                clickOutsideToClose: true,
                escapeToClose: true,
                focusOnOpen: true
            };

            $mdPanel.open(config);
        };
    }

    function PanelDialogCtrl(mdPanelRef, $scope, product) {
        $scope.product = product;

        $scope.closeDialog = function() {
            mdPanelRef && mdPanelRef.close();
        }
    }
})();