angular.module('CardManager', ['CardModelService', 'CardInfoFactory'])
    .factory('CardManager', ['$q', 'CardModelService', 'CardInfoFactory',
        function ($q, CardModelService, CardInfoFactory) {
            var cardManager = {
                _indexOf: function (array, needle) {
                    if (!array || !needle)
                        return -1;

                    var i = -1, index = -1;

                    for (i = 0; i < array.length; i++) {
                        if (array[i] === needle) {
                            index = i;
                            break;
                        }
                    }

                    return index;
                },

                _pool: {},

                _searchPool: function (multiverseid) {
                    return this._pool[multiverseid];
                },

                _addToPool: function(cardData) {
                    var instance = new CardModelService(cardData);
                    //Does multiverseid make sense here if its not particularly linear?
                    this._pool[instance.multiverseid] = instance;
                    return instance;
                },

                _removeFromPool: function(multiverseid) {
                    if (this._searchPool(multiverseid)) {
                        delete this._pool[multiverseid];
                        return true;
                    }
                    return false;
                },

                _loadAllCardsIntoPool : function(deferred){
                    var scope = this;

                    CardInfoFactory.GetAllCards()
                        .success(function (allSetData) {
                            var cards = scope._getCardsFromSets(allSetData); //TODO: The garbage logic that follows should be off-loaded as much as possible
                            deferred.resolve(cards);
                        })
                        .error(function (errorData) {
                            var message = "Error getting all card info! ErrorData: " + errorData;
                            deferred.reject(message);
                        });
                },

                _getCardsFromSets: function(allSetData){
                    var scope = this;

                    var cards = [];
                    angular.forEach(allSetData, function(set) {
                        if(set.code.substring(0, 1) !== 'p')
                            cards.push.apply(cards, scope._evaluateCards(set.cards));
                    });
                    return cards;
                },

                _evaluateCards: function(cardArray) {
                    var scope = this; 

                    var cards = [];
                    angular.forEach(cardArray, function(card) {
                        if (card.multiverseid) {
                            var instance = scope._searchPool(card.multiverseid);
                            if (instance)
                                instance.addAltText(card.text);
                            else {
                                instance = scope._addToPool(card);
                                cards.push(instance);
                            }
                        }
                    });

                    return cards;
                },

                GetCard: function (multiverseid) {
                    var deferred = $q.defer();
                    var card = this._searchPool(multiverseid);
                    if (card)
                        deferred.resolve(card);
                    else
                        deferred.reject('Card info not found! Has everything been loaded?');
                    return deferred.promise;
                },

                LoadAllCards: function () {
                    var deferred = $q.defer();
                    if (!jQuery.isEmptyObject(this._pool))
                        deferred.resolve(this._pool);
                    else
                        this._loadAllCardsIntoPool(deferred);
                    return deferred.promise;
                },

                DropFromPool: function (multiverseid) {
                    var deferred = $q.defer();
                    if (this._removeFromPool(multiverseid)) {
                        var message = "Card " + multiverseid + " dropped from pool.";
                        deferred.resolve(message);
                    } else {
                        var message = "Error dropping card " + multiverseid + " from pool.";
                        deferred.reject(message);
                    }
                    return deferred.promise;
                },

                AddVersion: function (originalCardId, copyCardId) {
                    var originalCard = this._searchPool(originalCardId);
                    var copyCard = this._searchPool(copyCardId);

                    if (!originalCard || !copyCard || this._indexOf(originalCard.Versions, copyCard.multiverseid) !== -1)
                        return false;

                    originalCard.addVersion(copyCard.multiverseid);
                    this.DropFromPool(copyCard.multiverseid); //TODO: Necessary?
                    return true;
                }

            };

            return cardManager;
        }]);