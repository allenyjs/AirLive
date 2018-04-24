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