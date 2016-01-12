angular.module('PlaneswalkerPlatform')
    .controller('HomeController', ['CardImageFactory',
        function HomeController($scope, CardImageFactory) {
            $scope.Status = {
                AlertClass: '',
                Message: ''
            };
    }]);