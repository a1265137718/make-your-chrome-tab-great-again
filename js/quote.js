"use strict";

window.momentum = window.momentum || {};
momentum.QuoteCtrl = function () {
    this.apiUrl = "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous";
};

momentum.QuoteCtrl.prototype = {
    fetchQuote: function (cb) {
        $.ajax({
            url: this.apiUrl,
            headers: {
                'X-Mashape-Key': 'v59o64xwMgmshgjqKwJypJ54sCR8p1ALpyijsnYauOzYVMbYRK'
            },
            method: "POST",
            success: cb
        });
    }
};