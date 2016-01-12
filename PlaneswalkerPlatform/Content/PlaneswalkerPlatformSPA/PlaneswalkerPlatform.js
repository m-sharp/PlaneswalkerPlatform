function initialize() {
    angular.module('PlaneswalkerPlatform', [
        'ngRoute',
        'CardInfoFactory', 'CardImageFactory', 'HttpInterceptorFactory',
        'CardManager',
        'CardModelService',
        'NavigationController',
        'CardFilters'])
        .config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
            //$httpProvider.interceptors.push('HttpInterceptorFactory');
            
            $routeProvider.when('/Home',
                {
                    templateUrl: '/Content/PlaneswalkerPlatformSPA/Partials/Home.html',
                    controller: 'HomeController',
                    friendlyPageName: 'Home'
                })
                .when('/DeckBuilder',
                {
                    templateUrl: '/Content/PlaneswalkerPlatformSPA/Partials/DeckBuilder.html',
                    controller: 'DeckBuilderController',
                    friendlyPageName: 'Deck Builder'
                })
                .when('/MyAccount',
                {
                    templateUrl: '/Content/PlaneswalkerPlatformSPA/Partials/MyAccount.html',
                    controller: 'MyAccountController',
                    friendlyPageName: 'My Account'
                })
                .otherwise({ redirectTo: '/Home' });
        }]);
};
initialize();