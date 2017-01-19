/*
 * Created by huyhoang on 11/6/16.
 */
angular.module('SgAdminApp').controller('OrderReportCtrl', function($scope, $http) {
    $scope.ordersDisplayType = {
        COMBINED: 0,
        SEPARATE: 1
    };

    $scope.filter = {
        resellerId: -1,
        displayType: $scope.ordersDisplayType.COMBINED
    };

    $scope.resellerToBranchMap = {};
    $scope.branchToResellerMap = {};
    $scope.resellerIdToResellerMap = {};
    $scope.branchIdToBranchMap = {};

    function init() {
        $scope.orderReport = {
            total: 0,
            numOfOrders: 0
        };
        $scope.orders = [];
        $scope.ordersByReseller = {};
        $scope.display = {
            combinedOrdersByReseller: {}
        };
    }

    init();

    function getResellerList() {
        $http({
            method: 'GET',
            url: '/resellers/all?' + getTimestampParam()
        }).then(function(response) {
            $scope.resellers = response.data;
            constructResellerToBranchMap();
        }, function() {
            console.info('Something not right');
        });
    }

    getResellerList();

    $scope.getReport = function() {
        $scope.isLoading = true;
        $scope.isGettingReportOnce = true;
        init();
        $http({
            method: 'GET',
            url: '/order/report',
            params: {
                fromDate: $scope.fromDate.customFormat('#YYYY#-#MM#-#DD# #hh#:#mm#:#ss#'),
                toDate: $scope.toDate.customFormat('#YYYY#-#MM#-#DD# #hh#:#mm#:#ss#'),
                timestamp: new Date().customFormat('#YYYY#-#MM#-#DD# #hh#:#mm#:#ss#')
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function(response) {
            $scope.orders = response.data;
            postGetOrderReport();
            prepareDataByDisplayType();
            $scope.isLoading = false;
        }, function() {
            $scope.isLoading = false;
        });
    };
    
    function postGetOrderReport() {
        var i, j, total, order, orderLineItem, resellerOrders = [];
        $scope.orderReport.total = 0;
        for (i = 0; i < $scope.orders.length; i++) {
            order = $scope.orders[i];
            order.isInHcmCity = $scope.branchIdToBranchMap[order.branchId].isInHcmCity;
            resellerOrders = $scope.ordersByReseller[$scope.branchToResellerMap[order.branchId]];
            resellerOrders = resellerOrders != null ? resellerOrders : [];
            resellerOrders.push(order);
            $scope.ordersByReseller[$scope.branchToResellerMap[order.branchId]] = resellerOrders;

            total = 0;
            for (j = 0; j < order.orderLineItems.length; j++) {
                orderLineItem = order.orderLineItems[j];
                orderLineItem.subtotal = orderLineItem.quantity * orderLineItem.price;
                total += orderLineItem.subtotal;
            }
            order.total = total;
            $scope.orderReport.total += total;
        }
    }

    function prepareDataByDisplayType() {
        if ($scope.filter.displayType == $scope.ordersDisplayType.SEPARATE) {
            $scope.displayOrders = angular.copy($scope.orders);
        } else {
            var i, j, orders, order, orderLineItem, existingOrderLineItems, existingOrderLineItem, resellerId;

            for (resellerId in $scope.ordersByReseller) {
                var combinedOrder = {
                    total: 0,
                    hcmCity: {
                        total: 0,
                        insideHcmCityOrders: {}
                    },
                    outsideHcmCity: {
                        total: 0,
                        outsideHcmCityOrders: {}
                    }
                };

                if ($scope.ordersByReseller.hasOwnProperty(resellerId)) {
                    orders = $scope.ordersByReseller[resellerId];
                    for (i = 0; i < orders.length; i++) {
                        order = orders[i];
                        combinedOrder.total += order.total;
                        if (order.isInHcmCity) {
                            combinedOrder.hcmCity.total += order.total;
                        } else {
                            combinedOrder.outsideHcmCity.total += order.total;
                        }

                        for (j = 0; j < order.orderLineItems.length; j++) {
                            orderLineItem = order.orderLineItems[j];
                            existingOrderLineItems = order.isInHcmCity ? combinedOrder.hcmCity.insideHcmCityOrders : combinedOrder.outsideHcmCity.outsideHcmCityOrders;
                            existingOrderLineItem = existingOrderLineItems[orderLineItem.productId];
                            if (existingOrderLineItem != null) {
                                existingOrderLineItem.quantity += orderLineItem.quantity;
                                existingOrderLineItem.subtotal = existingOrderLineItem.quantity * existingOrderLineItem.price;
                            } else {
                                existingOrderLineItems[orderLineItem.productId] = angular.copy(orderLineItem);
                            }
                        }
                    }
                    $scope.display.combinedOrdersByReseller[resellerId] = combinedOrder;
                }
            }


        }
    }

    $scope.showOrderDetails = function(order) {
        order.showDetails = !order.showDetails;
    };

    $scope.filterOrdersByReseller = function() {
        $scope.displayOrders = angular.copy($scope.orders);
        var i, displayOrder;
        $scope.orderReport.total = 0;
        if ($scope.filter.resellerId > -1) {
            var selectedBranchIds = getBranchIdsOfReseller($scope.filter.resellerId);
            for (i = 0; i < $scope.displayOrders.length;) {
                displayOrder = $scope.displayOrders[i];
                if (selectedBranchIds.indexOf(displayOrder.branchId) == -1) {
                    $scope.displayOrders.splice(i, 1);
                } else {
                    i++;
                    $scope.orderReport.total += displayOrder.total;
                }
            }
        }
    };

    function getBranchIdsOfReseller(resellerId) {
        if (Object.keys($scope.resellerToBranchMap).length == 0) {
            constructResellerToBranchMap();
        }
        return $scope.resellerToBranchMap[resellerId];
    }

    function constructResellerToBranchMap() {
        var i, j, reseller, branch, branchIds;
        for (i = 0; i < $scope.resellers.length; i++) {
            reseller = $scope.resellers[i];
            $scope.resellerIdToResellerMap[reseller.id] = reseller;
            branchIds = [];
            for (j = 0; j < reseller.branches.length; j++) {
                branch = reseller.branches[j];
                $scope.branchIdToBranchMap[branch.id] = branch;
                $scope.branchToResellerMap[branch.id] = reseller.id;
                branchIds.push(branch.id);
            }
            $scope.resellerToBranchMap[reseller.id] = branchIds;
        }
    }

    $scope.changeFilterDisplayType = function() {
        prepareDataByDisplayType();
    };
});