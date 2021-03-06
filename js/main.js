"use strict";

window.momentum = window.momentum || {};

momentum.Core = function () {
    this.timeStr = "";
    this.weatherStr = "";
    this.ampm = "AM";
    this.salutation = "Morning, ";
    this.location = "";
    this.timeEl = $("#time");
    this.weatherEl = $("#weather");
    this.greetingEl = $("#greetings");
    this.ampmEl = $("#ampm");
    this.lat;
    this.lon;
    this.weatherCtrl = new momentum.WeatherCtrl();
};

momentum.Core.prototype = {
    setTime: function () {
        var date = new Date();
        var hours = date.getHours();
        if (hours > 12) {
            this.salutation = "Afternoon, ";
        }
        if (hours > 18) {
            this.salutation = "Evening, ";
        }
        if (hours > 11 && hours < 24) {
            this.ampm = "PM";
        }
        if (hours > 12) {
            hours -= 12;
        }
        var mins = date.getMinutes();
        if (mins < 10) {
            var txt = '0' + mins;
            mins = txt;
        }
        var ret = '';
        ret = ret + hours + ':' + mins;
        this.timeStr = ret;
    },
    setWeather: function (weatherData) {
        this.weatherStr = Math.floor(weatherData.main.temp - 273.15);
        this.location = weatherData.name;
        this.render();
    },
    updateTime: function () {
        this.setTime();
    },
    updateWeather: function () {
        this.weatherCtrl.fetchWeather(this.lat, this.lon, this.setWeather.bind(this));
    },
    start: function () {
        if (!navigator.geolocation) {
            throw "Geolocation not supported!";
        }
        function error() {
            throw "Error occured!";
        }

        navigator.geolocation.getCurrentPosition(function (position) {
            this.lat = position.coords.latitude;
            this.lon = position.coords.longitude;
            this.updateWeather();
        }.bind(this), error);
        this.setTime();
        this.render();
    },
    render: function () {
        this.timeEl.text(this.timeStr);
        this.greetingEl.text("Good " + this.salutation);
        this.ampmEl.text(this.ampm);
        this.weatherEl.text(this.weatherStr);
    }
};

function doStuff(evt) {
    var nameElement = document.getElementById("someInput");
    localStorage.setItem('server', nameElement.value);
    var evt = evt || window.event;
    if (evt.keyCode == 13) {
        document.getElementById("someDiv").innerHTML += localStorage.getItem('server');
        $('input').hide();
    }
}
$('#someDiv').click(function () {
    $('#someDiv').empty();
    $('input').show();
})

$("#someInput").keyup(function (e) {
    return doStuff();
});

if (localStorage.getItem('server') != undefined) {
    document.getElementById("someDiv").innerHTML += localStorage.getItem('server');
    $('input').hide();
}

if (navigator.onLine) {
    if (localStorage.getItem('bg') === undefined || null) {
        localStorage.setItem('bg', 'https://source.unsplash.com/daily');
        var getunsplash = localStorage.getItem('bg');
        document.querySelector('.bg-wrapper').setAttribute("style", "background-image:" + "url" + "(" + getunsplash + ")" + '!important')
    } else {
        var getBg = localStorage.getItem('bg');
        if(getBg != null ) {
            document.querySelector('.bg-wrapper').setAttribute("style", "background-image:" + "url" + "(" + 'bg/bg' + getBg + '.jpeg' + ")" + '!important');
        } else {
            document.querySelector('.bg-wrapper').setAttribute("style", "background-image:" + "url" + "(" + 'bg/bg' + 8 + '.jpeg' + ")" + '!important');
        }
    }
} else {
    $('.quote, .clouds-flat-button, .weather, .download-icon').hide();
    $('.direction').hide();
}

$(document).keyup(function (e) {
    if (e.keyCode == 39) {
        $(".changeBg-right").trigger("click");
    } else if (e.keyCode == 37) {
        $(".changeBg-left").trigger("click");
    }
});

var clicks = 0;

$(".changeBg-right").click(function () {
    if (clicks < 10) {
        clicks++;
        localStorage.setItem('bg', clicks);
        var getBg = localStorage.getItem('bg');
        document.querySelector('.bg-wrapper').setAttribute("style", "background-image:" + "url" + "(" + 'bg/bg' + getBg + '.jpeg' + ")" + '!important');
        document.querySelector('.setbglink').setAttribute("href", 'bg/bg' + getBg + '.jpeg');
    } else {
        clicks = 0;
        localStorage.setItem('bg', 'https://source.unsplash.com/daily');
        var getunsplash = localStorage.getItem('bg');
        document.querySelector('.bg-wrapper').setAttribute("style", "background-image:" + "url" + "(" + getunsplash + ")" + '!important');
        document.querySelector('.setbglink').setAttribute("href", 'https://source.unsplash.com/daily');
    }
});
$(".changeBg-left").click(function () {
    if (clicks > 1) {
        clicks--;
        localStorage.setItem('bg', clicks);
        var getBg = localStorage.getItem('bg');
        document.querySelector('.bg-wrapper').setAttribute("style", "background-image:" + "url" + "(" + 'bg/bg' + getBg + '.jpeg' + ")" + '!important');
        document.querySelector('.setbglink').setAttribute("href", 'bg/bg' + getBg + '.jpeg');
    } else {
        clicks = 11;
        localStorage.setItem('bg', 'https://source.unsplash.com/daily');
        var getunsplash = localStorage.getItem('bg');
        document.querySelector('.bg-wrapper').setAttribute("style", "background-image:" + "url" + "(" + getunsplash + ")" + '!important');
        document.querySelector('.setbglink').setAttribute("href", 'https://source.unsplash.com/daily');
    }
});

var getBgun = localStorage.getItem('bg');
if (getBgun === 'https://source.unsplash.com/daily') {
    document.querySelector('.bg-wrapper').setAttribute("style", "background-image:" + "url" + "(" + getBgun + ")" + '!important');
}

$(window).load(function () {
    $('#preloader').fadeOut('slow', function () {
        $(this).remove();
    });
});