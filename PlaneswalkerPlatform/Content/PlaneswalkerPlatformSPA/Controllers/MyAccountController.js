angular.module('PlaneswalkerPlatform')
    .controller('MyAccountController', [
        function MyAccountController($scope) {
            $scope.Status = {
                AlertClass: '',
                Message: ''
            };
        }]);