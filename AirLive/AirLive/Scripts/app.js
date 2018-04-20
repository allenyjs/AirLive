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

airApp.controller('mainCtrl', ['$scope', function (scp) {
    alert("mainCtrl");
}]);