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
                    { indexval: 6, rangetext: "301~500" },
            ];
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