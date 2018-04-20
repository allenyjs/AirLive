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
    var apiUrl = "api/CountysGet";
    client({
        method: "GET",
        url: apiUrl
    }).then(function mySuccess(response) {
        console.log(response);
    }, function myError(response) {
        scp.msg = response.statusText;
    });
    alert("mainCtrl");
}]);