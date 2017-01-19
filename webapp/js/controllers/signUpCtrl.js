/**
 * Created by huyhoang on 6/6/16.
 */
/**
 * @ngdoc function
 * @name SignUpCtrl
 * @description
 * # SignUpCtrl
 * Controller of Signup page
 */
angular.module('sgApp').controller('SignUpCtrl', function ($rootScope, $scope, $http) {
    $rootScope.$broadcast('viewChange', {'viewName': 'signup'});
    $scope.user = {};

    $scope.signUp = function() {
        $http({
            method: 'POST',
            url: '/user/save',
            data: {
                email: $scope.user.email,
                password: $scope.user.password
            }
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    };

    $scope.checkPasswordMatched = function() {
        if ($scope.user.password != $scope.user.confirmedPassword) {
            $scope.signupForm.confirmedPassword.$setValidity('passwordMatched', false);
        } else {
            $scope.signupForm.confirmedPassword.$setValidity('passwordMatched', true);
        }
    }
});