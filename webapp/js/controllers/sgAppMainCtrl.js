angular.module('sgApp').controller('SgAppController', function ($scope, $rootScope, $translate, $http,
                  $location, $interval, tmhDynamicLocale, LOCALES) {

    $rootScope.locale = 'vi-vn';
    $scope.viewName = 'home';
    var authenticate = function(credentials, callback) {

        var headers = credentials ? {authorization : "Basic "
        + btoa(credentials.username + ":" + credentials.password)
        } : {};

        $http.get('user', {headers : headers}).success(function(data) {
            $rootScope.authenticated = !!data.name;
            callback && callback();
        }).error(function() {
            $rootScope.authenticated = false;
            callback && callback();
        });

    };

    $rootScope.credentials = {};
    $rootScope.login = function() {
        authenticate($scope.credentials, function() {
            if ($rootScope.authenticated) {
                $location.path("/");
                $scope.error = false;
            } else {
                $location.path("/login");
                $scope.error = true;
            }
        });
    };

    if ($rootScope.credentials.username && $rootScope.credentials.password) {
        $rootScope.login();
    }

    /**
     * Cache busting
     */

    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;
    var slides = $scope.slides = [];

    slides.push({
        image: 'images/HatDe3.jpg',
        text: 'Mut khoai'
    });
    slides.push({
        image: 'images/MutKiwi3.jpg',
        text: 'Mut dau tay'
    });
    slides.push({
        image: 'images/DauTay3.jpg',
        text: 'Mut sen'
    });

    /**
     * Translations for the view
     */
    var pageTitleTranslationId = 'PAGE_TITLE';
    var pageContentTranslationId = 'PAGE_CONTENT';

    $translate(pageTitleTranslationId, pageContentTranslationId)
        .then(function (translatedPageTitle, translatedPageContent) {
            $rootScope.pageTitle = translatedPageTitle;
            $rootScope.pageContent = translatedPageContent;
        });

    /**
     * $scope.locale
     */
    // Set the locale to the prefered one so the corresponding locale file will be downloaded
    tmhDynamicLocale.set(LOCALES.preferredLocale);
    //$translate.use("LOCALES.preferredLocale");
    $scope.locale = $translate.use();

    /**
     * Current time
     */
    $scope.currentTime = Date.now();
    $interval(function () {
        $scope.currentTime = Date.now();
    }, 1000);


    /**
     * EVENTS
     */
    $rootScope.$on('$translateChangeSuccess', function (event, data) {
        $scope.locale = data.language;
        $rootScope.pageTitle = $translate.instant(pageTitleTranslationId);
        $rootScope.pageContent = $translate.instant(pageContentTranslationId);
    });

    $scope.switchLocale = function () {
        if ($rootScope.locale == 'vi-vn') {
            $rootScope.locale = 'en-us';
        } else {
            $rootScope.locale = 'vi-vn';
        }

        $translate.use($rootScope.locale);
        tmhDynamicLocale.set($rootScope.locale);
    };

    $scope.$on('viewChange', function (event, data) {
        $scope.viewName = data.viewName;
    });

    $scope.logout = function() {
        $http.post('/logout', {}).success(function() {
            $rootScope.authenticated = false;
            $location.path("/");
        }).error(function(data) {
            $rootScope.authenticated = false;
        });
    }
});
