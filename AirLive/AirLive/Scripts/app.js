var airApp = angular.module('airApp', ['ngRoute']);
airApp.config(function ($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl: "Home/AirInfo",
        controller: "mainCtrl"
    }).when("/Home", {
        templateUrl: "Home/AirInfo",
        controller: "mainCtrl"
    }).when("/Home/Index", {
        templateUrl: "Home/AirInfo",
        controller: "mainCtrl"
    });
});

airApp.controller('mainCtrl', ['$scope', '$http', function (scp, client) {
    scp.initCountys = function () {
        var apiUrl = "api/CountysGet";
        client({
            method: "GET",
            url: apiUrl
        }).then(function mySuccess(response) {
            console.log(response);
            scp.Countys = response.data;
        }, function myError(response) {
            scp.msg = response.statusText;
        });
    }
    scp.initSides = function () {
        scp.AQI = "";
        var apiUrl = "api/SidesGet?County=" + scp.selectedCounty;
        client({
            method: "GET",
            url: apiUrl
        }).then(function mySuccess(response) {
            console.log(response);
            scp.Sides = response.data;
        }, function myError(response) {
            scp.msg = response.statusText;
        });
    }
    scp.initAQI = function () {
        var apiUrl = "api/AQIGet?County=" + scp.selectedCounty + "&SiteName=" + scp.selectedSide;
        client({
            method: "GET",
            url: apiUrl
        }).then(function mySuccess(response) {
            console.log(response);
            scp.AQI = response.data;

            scp.aqiranges = [
                    { indexval: 1, rangetext: "0~50" },
                    { indexval: 2, rangetext: "51~100" },
                    { indexval: 3, rangetext: "101~150" },
                    { indexval: 4, rangetext: "151~200" },
                    { indexval: 5, rangetext: "201~300" },
                    //{ indexval: 6, rangetext: "301~500" },
            ];

            scp.pm25ranges = [
                    { indexval: 1, rangetext: "1~11" },
                    { indexval: 2, rangetext: "12~23" },
                    { indexval: 3, rangetext: "24~35" },
                    { indexval: 4, rangetext: "36~41" },
                    { indexval: 5, rangetext: "42~47" },
                    { indexval: 6, rangetext: "48~53" },
                    { indexval: 7, rangetext: "54~58" },
                    //{ indexval: 8, rangetext: "59~64" },
                    //{ indexval: 9, rangetext: "65~70" },
                    //{ indexval: 10, rangetext: "More than 71" },
            ];

            scp.pm10ranges = [
                    { indexval: 1, rangetext: "0~16" },
                    { indexval: 2, rangetext: "17~33" },
                    { indexval: 3, rangetext: "34~50" },
                    { indexval: 4, rangetext: "51~58" },
                    { indexval: 5, rangetext: "59~66" },
                    { indexval: 6, rangetext: "67~75" },
                    { indexval: 7, rangetext: "76~83" },
                    { indexval: 8, rangetext: "84~91" },
                    { indexval: 9, rangetext: "92~100" },
                    { indexval: 10, rangetext: "More than 101" },
            ];

            var currentAQI = scp.AQI.AQI;
            scp.currentAQIText = currentAQI;
            if (currentAQI > (300 - 15)) {
                currentAQI = (300 - 15);
                scp.currentAQIText = "破表";
            }
            scp.IndicatorsAqiObj = {
                "color": "#673ab7",
                "margin-left": "calc(((100vw / 300) * " + currentAQI + ") - 15px)"
            };

            var maxPM25 = 58;
            var currentPM25 = scp.AQI._PM2point5;
            scp.currentPM25Text = currentPM25;
            if (currentPM25 > (maxPM25 - 15)) {
                currentPM25 = (maxPM25 - 15);
                scp.currentPM25Text = "破表";
            }
            scp.IndicatorsPM25Obj = {
                "color": "#673ab7",
                "margin-left": "calc(((100vw / " + maxPM25 + ") * " + currentPM25 + ") - 15px)"
            };

        }, function myError(response) {
            scp.errormsg = response.statusText;
        });
    }

    scp.initCountys();
    scp.selectedCounty = "臺北市";
    scp.initSides();
    scp.selectedSide = "中山";
    scp.initAQI();

}]);
//http://www.globalmednews.tw/epaper.php?no=211

airApp.directive("levelBarAqi", function () {
    return {
        restrict: 'AECM',
        templateUrl: 'directives/levelBar.html',
        replace: true,
        scope: {
            levelbarIndexval: "@",
            levelbarRangetext: "@",
        }
    }
});

airApp.directive("levelBarPm25", function () {
    return {
        restrict: 'AECM',
        templateUrl: 'directives/levelBar.html',
        replace: true,
        scope: {
            levelbarIndexval: "@",
            levelbarRangetext: "@",
        }
    }
});

airApp.directive("levelBarPm10", function () {
    return {
        restrict: 'AECM',
        templateUrl: 'directives/levelBar.html',
        replace: true,
        scope: {
            levelbarIndexval: "@",
            levelbarRangetext: "@",
        }
    }
});