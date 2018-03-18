var getCards = function() {
    var context = $(".cards");

    context.find('.nw .card > a').click(function(e){
        e.preventDefault();

        var cardname = $(this).parent().siblings('.nwname').text();

        var storeCards = (result) => {
            var cards = [];

            if (result['cards']) {
                cards = result['cards'];
            }

            cards.push(cardname);

            chrome.storage.local.set({'cards': cards}, function() {
                console.log('Cards In: ', cards);
            });
        }

        chrome.storage.local.get('cards', storeCards);
    });
};

getCards();