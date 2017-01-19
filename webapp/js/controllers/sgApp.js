angular
    .module('sgApp', [
        'ui.router',
        'pascalprecht.translate',
        'ngSanitize',
        'ngResource',
        'ngAnimate',
        'ngCookies',
        'tmh.dynamicLocale',
        'ui.bootstrap',
        'ngMaterial',
        'ngMessages'
    ])
    .constant('LOCALES', {
        'locales': {
            'vi-vn': 'Vietnamese',
            'en-us': 'English'
        },
        'preferredLocale': 'vi-vn'
    })
    .config(function ($urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
    })
    .config(function ($stateProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'login.html',
                controller: 'LoginCtrl'
            })
            .state('signup', {
                url: '/signup',
                templateUrl: 'signup.html',
                controller: 'SignUpCtrl'
            })
            .state('home', {
                url: '/',
                templateUrl: 'main.html',
                controller: 'HomeCtrl'
            })
            .state('services', {
                url: '/services',
                templateUrl: 'services.html',
                controller: 'ServicesCtrl'
            })
            .state('about', {
                url: '/about',
                templateUrl: 'about.html',
                controller: 'AboutCtrl'
            })
            .state('contact', {
                url: '/contact',
                templateUrl: 'contact.html',
                controller: 'ContactCtrl'
            })
            .state('productCategory', {
                url: '/product/category/:categoryId/subcategory/:subcategoryId',
                templateUrl: 'productList.html',
                controller: 'ProductListCtrl'
            })
        ;
    })
    .config(function ($translateProvider, LOCALES) {
        $translateProvider.useSanitizeValueStrategy(null);

        // configures staticFilesLoader
        $translateProvider.useStaticFilesLoader({
            prefix: 'resources/locale_',
            suffix: '.json'
        });
        $translateProvider.preferredLanguage(LOCALES.preferredLocale);
        $translateProvider.useLocalStorage();
    })
    // Angular Dynamic Locale
    .config(function (tmhDynamicLocaleProvider) {
        tmhDynamicLocaleProvider.localeLocationPattern('https://cdnjs.cloudflare.com/ajax/libs/angular-i18n/1.4.6/angular-locale_{{locale}}.js');
    })
;

