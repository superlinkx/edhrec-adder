var clearCards = function() {
    chrome.storage.local.clear(function() {
        console.log("Cleared all cards!");
    });
}

var refreshCards = function() {
    chrome.storage.local.get('cards', function(result) {
        cardsHTML = '';
        result['cards'].forEach(function(val) {
            cardsHTML += '<li>'+val+'</li>';
        });
        $('.card-list').html(cardsHTML);
    });
}

var exportCards = function() {
    chrome.storage.local.get('cards', function(result) {
        cardsTxt = result['cards'].join('\n');
        chrome.downloads.download({
            url: 'data:text/plain;charset=utf-8,' + encodeURIComponent(cardsTxt),
            filename: "decklist.txt"
        });
    });
}

$('.clearCards').click(function(e) {
    e.preventDefault();
    clearCards();
});

$('.exportCards').click(function(e) {
    e.preventDefault();
    exportCards();
});

chrome.storage.onChanged.addListener(function(changes, areaName) {
    if (areaName === 'local') {
        refreshCards();
    }
});

refreshCards();