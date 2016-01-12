angular.module('CardFilters', [])
    .filter('SearchByName', ['CardManager',
        function (CardManager) {
            function _containsCardCopy(resultsArray, card) {
                for (a = 0; a < resultsArray.length; a++)
                    if (resultsArray[a].name === card.name)
                        return a;
                return -1;
            };
            
            function _handleMultiple(originalCard, copyCard) {
                CardManager.AddVersion(originalCard.multiverseid, copyCard.multiverseid);
            };

            function _filterByName(cards, searchString, numberOfHints) {
                var results = [];
                var letterMatch = new RegExp(searchString.toLowerCase());
                for (i = 0; i < cards.length; i++) {
                    var card = cards[i];
                    var cardName = card.name.toLowerCase();
                    if (letterMatch.test(cardName.substring(0, searchString.length))) {
                        var copyIndex = _containsCardCopy(results, card);
                        if (copyIndex > -1)
                            _handleMultiple(results[copyIndex], card);
                        else
                            results.push(card);
                    }

                    if (results.length === numberOfHints)
                        break;
                }
                return results;
            };

            return function (items, searchString, numberOfHints) {
                if (!searchString) return {};

                var results = _filterByName(items, searchString, numberOfHints);

                return results;
            };
        }]);