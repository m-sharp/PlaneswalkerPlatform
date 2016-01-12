angular.module('CardModelService', ['CardInfoFactory'])
    .factory('CardModelService', ['CardInfoFactory',
        function (CardInfoFactory) {
            function CardModelService(cardData) {
                if (cardData)
                    this.setData(cardData);
            };

            CardModelService.prototype = {
                setData: function (cardData) {
                    angular.extend(this, cardData);
                },

                addVersion: function (id, cardText) {
                    if(this.Versions)
                        this.Versions.push({multiverseid: id, text: cardText});
                    else{
                        angular.extend(this, { Versions : [] });
                        this.Versions.push({ multiverseid: id, text: cardText });
                    }
                },

                addAltText: function (altText) {
                    if (this.AltText)
                        this.AltText.push({ 'text': altText });
                    else {
                        angular.extend(this, { AltText: [] });
                        this.AltText.push({ 'text': altText });
                    }
                }
            };

            return CardModelService;
        }]);