/*
 * Created by huyhoang on 10/11/16.
 */
angular.module('SgAdminApp').controller('CreateNewOrderCtrl', function($scope, $http, $resource) {
    $scope.isDoneInput = false;
    $scope.discount = 0;
    $scope.selectedProducts = [];
    $scope.selectedReseller = null;
    $scope.resellerProducts = null;
    $scope.today = function() {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function() {
        $scope.dt = null;
    };

    $scope.inlineOptions = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        minDate: new Date(),
        startingDay: 1
    };

    $scope.toggleMin = function() {
        $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
        $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    };

    $scope.toggleMin();

    $scope.open = function() {
        $scope.popup.opened = true;
    };

    $scope.setDate = function(year, month, day) {
        $scope.dt = new Date(year, month, day);
    };

    $scope.format = 'dd/MM/yyyy';
    $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.popup = {
        opened: false
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    $scope.events = [
        {
            date: tomorrow,
            status: 'full'
        },
        {
            date: afterTomorrow,
            status: 'partially'
        }
    ];

    function getDayClass(data) {
        var date = data.date,
            mode = data.mode;
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0,0,0,0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    }

    function getTimestamp() {
        return "timestamp=" + (new Date().getTime());
    }

    function getResellerList() {
        $http({
            method: 'GET',
            url: '/resellers/all?' + getTimestamp()
        }).then(function(response) {
            $scope.resellers = response.data;
        }, function() {
            console.info('Something not right');
        });
    }

    getResellerList();

    $scope.getProductsForReseller = function() {
        $http({
            method: 'GET',
            url: '/reseller/' + $scope.selectedReseller.id + '/products'
        }).then(function(response) {
            $scope.resellerProducts = response.data;
        }, function() {
            console.info('Something not right getting products for reseller');
        });
    };

    $scope.resetOrder = function() {
        $scope.isDoneInput = false;
        $scope.discount = 0;
        $scope.total = 0;
        angular.forEach($scope.resellerProducts, function(selectedProduct) {
            selectedProduct.quantity = 0;
            selectedProduct.discount = 0;
        });
        $scope.selectedProducts = [];
    };

    $scope.updateOrder = function() {
        $scope.actionInProgress = true;
        $scope.isDoneInput = true;
        $scope.total = 0;
        var i, resellerProduct;
        for (i = 0; i < $scope.resellerProducts.length; i++) {
            resellerProduct = $scope.resellerProducts[i];
            if (resellerProduct.quantity > 0) {
                resellerProduct.price = resellerProduct.wholeSalePrice * (100 - resellerProduct.discount) / 100;
                resellerProduct.productId = resellerProduct.id;
                $scope.total += resellerProduct.price * resellerProduct.quantity;
                $scope.selectedProducts.push(resellerProduct);
            }
        }
        $scope.actionInProgress = false;
    };

    $scope.submitOrder = function() {
        $scope.actionInProgress = true;
        var orderDto = {
            createdDate: new Date().getTime(),
            branchId: $scope.selectedBranch.id,
            discount: $scope.discount,
            orderNumber: $scope.invoicePrefix + '-' + $scope.invoiceNumber,
            orderedBy: 'admin',
            orderLineItems: $scope.selectedProducts
        };
        $resource('/order/create').save(orderDto, function() {
            $scope.resetOrder();
            $scope.successMessage = 'Đơn hàng đã được lưu trữ thành công!';
            $scope.actionInProgress = false;
        }, function() {
            $scope.errorMessage = 'Đơn hàng bị lỗi.';
            console.error("Error occurred. Needs to be handled");
            $scope.actionInProgress = false;
        });
    };

    $scope.updateOrderDiscount = function() {
        var products = $scope.isDoneInput ? $scope.selectedProducts : $scope.resellerProducts;
        angular.forEach(products, function(product) {
            product.discount = $scope.discount;
        });
        $scope.updateOrder();
    };
});