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
                    { indexval: 1, rangetext: "0~16" },//17
                    { indexval: 2, rangetext: "17~33" },//17
                    { indexval: 3, rangetext: "34~50" },//17
                    { indexval: 4, rangetext: "51~58" },//8
                    { indexval: 5, rangetext: "59~66" },//8
                    { indexval: 6, rangetext: "67~75" },//9
                    { indexval: 7, rangetext: "76~83" },//8
                    { indexval: 8, rangetext: "84~91" },//7
                    //{ indexval: 9, rangetext: "92~100" },
                    //{ indexval: 10, rangetext: "More than 101" },
            ];

            var maxAQI = 300;
            var baseSpaceAQI = 15;
            var currentAQI = scp.AQI.AQI;
            scp.currentAQIText = currentAQI;
            if (currentAQI > maxAQI) {
                baseSpaceAQI = baseSpaceAQI+13;
                scp.currentAQIText = "爆";
            }
            scp.IndicatorsAqiObj = {
                "color": "#673ab7",
                "margin-left": "calc(((100% / 300) * " + currentAQI + ") - " + baseSpaceAQI + "px)"
            };

            var maxPM25 = 58;
            var baseSpacePM25 = 15;
            var currentPM25 = scp.AQI._PM2point5;
            scp.currentPM25Text = currentPM25;
            if (currentPM25 > maxPM25) {
                baseSpacePM25 = baseSpacePM25+13;
                scp.currentPM25Text = "爆";
            }
            scp.IndicatorsPM25Obj = {
                "color": "#673ab7",
                "margin-left": "calc(((100% / " + maxPM25 + ") * " + currentPM25 + ") - " + baseSpacePM25 + "px)"
            };

            var maxPM10 = 91;
            var baseSpacePM10 = 15;
            var currentPM10 = scp.AQI.PM10;
            scp.currentPM10Text = currentPM10;
            if (currentPM10 > maxPM10) {
                baseSpacePM10 = baseSpacePM10 + 13;
                scp.currentPM10Text = "爆";
            }
            scp.IndicatorsPM10Obj = {
                "color": "#673ab7",
                "margin-left": "calc(((100% / " + maxPM10 + ") * " + currentPM10 + ") - " + baseSpacePM10 + "px)"
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