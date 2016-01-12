angular.module('CardInfoFactory', [])
    .factory('CardInfoFactory', ['$http', function ($http) {
        var cardInfoFactory = {};

        cardInfoFactory.GetAllCards = function () {
            return $http.get('/Content/InfoHandler.ashx');
        };

        return cardInfoFactory;
}]);