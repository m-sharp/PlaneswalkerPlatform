angular.module('CardImageFactory', [])
    .factory('CardImageFactory', ['$http', function ($http) {
        var cardImageFactory = {};

        cardImageFactory.GetCardImageSrc = function (multiid) {
            return '/Content/ImageHandler.ashx?multiverseid=' + multiid;
        };

        return cardImageFactory;
}]);