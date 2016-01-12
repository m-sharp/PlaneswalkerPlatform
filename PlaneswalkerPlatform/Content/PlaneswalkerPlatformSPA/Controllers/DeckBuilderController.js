angular.module('PlaneswalkerPlatform')
    .controller('DeckBuilderController', ['$scope', 'CardImageFactory', 'CardManager',
        function DeckBuilderController($scope, CardImageFactory, CardManager) {
            $scope.Status = {
                AlertClass: '',
                Message: ''
            };
            $scope.CardInfo = [];
            $scope.CardNames = [];
            $scope.CardSearchString = '';
            $scope.CurrentSearchCard = null;

            function Init(){ 
                //TODO: Set card back as default
                $('#CardSearchImg').attr("src", CardImageFactory.GetCardImageSrc(180607));

                CardManager.LoadAllCards().then(function (cards) {
                    $scope.CardInfo = cards;
                });                
            };

            Init();

            $scope.UpdatePicture = function(card) {
                $('#CardSearchImg').attr("src", CardImageFactory.GetCardImageSrc(card.multiverseid));
                $scope.CurrentSearchCard = card;
            };

            $scope.GetCardImageSrcForId = function (multiverseid) {
                return CardImageFactory.GetCardImageSrc(multiverseid);
            };


        }]);