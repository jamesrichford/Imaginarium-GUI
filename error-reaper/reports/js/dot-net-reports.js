﻿if (app === undefined) {
    var app = angular.module('dot-net-reports', ['ngMaterial']);
}

app.controller('dot-net-reports-controller', function ($scope, $mdDialog) {

    $.get('http://api.imaginarium.getsett.net/error-reaper/reports/dot-net?take=20&sort=Timestamp desc')
    .success(function (reports) {
        $scope.reports = reports;
    });

    $scope.deleteReport = function (report) {
    } 
});