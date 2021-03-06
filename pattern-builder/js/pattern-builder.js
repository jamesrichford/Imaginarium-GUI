﻿$(window).load(function () {

    $('#pattern-canvas').height($(document).height() - $('#main-tool-bar').height());
});

if (app === undefined) {
    var app = angular.module('pattern-builder', ['ngMaterial']);
}

function createSquare(color) {
    var square = {};
    square.color = color;
    square.height = 20;
    square.width = 20;

    return square;
}

function createRow(squares, defaultColor) {
    var row = {};
    row.squares = [];

    for (var i = 0; i < squares; i++) {
        row.squares.push(createSquare(defaultColor));
    }

    return row;
}

app.controller('pattern-builder-controller', function ($scope, $mdDialog) {

    $scope.defaultColor = {}
    $scope.defaultColor.red = 0;
    $scope.defaultColor.green = 0;
    $scope.defaultColor.blue = 0;

    var grid = {};
    grid.rows = [];
    grid.rows.push(createRow(5, $scope.defaultColor));
    grid.rows.push(createRow(5, $scope.defaultColor));
    grid.rows.push(createRow(5, $scope.defaultColor));

    $scope.grid = grid;

    var gridInfo = {};
    gridInfo.rowCount = grid.rows.length;
    gridInfo.columnCount = grid.rows[0].squares.length;
    $scope.gridInfo = gridInfo;

    
    $scope.$watch('gridInfo.rowCount', function () {
        var rows = $scope.grid.rows;
        var currentRowCount = rows.length;
        var newRowCount = $scope.gridInfo.rowCount;

        if (currentRowCount < newRowCount) {
            for (var i = rows.length; i < newRowCount; i++) {
                rows.push(createRow($scope.gridInfo.columnCount, $scope.defaultColor));
            }
        }
        else {
            for (var i = currentRowCount; i > newRowCount; i--) {
                rows.pop();
            }
        }
    });

    $scope.$watch('gridInfo.columnCount', function () {
        var rows = $scope.grid.rows;
        var currentColumnCount = rows[0].squares.length;
        var newColumnCount = $scope.gridInfo.columnCount;
        var rowCount = $scope.gridInfo.rowCount;

        if (currentColumnCount < newColumnCount) {
            for (var i = currentColumnCount; i < newColumnCount; i++) {
                for (var j = 0; j < rowCount; j++) {
                    rows[j].squares.push(createSquare($scope.defaultColor));
                }
            }
        }
        else {
            for (var i = currentColumnCount; i > newColumnCount; i--) {
                for (var j = 0; j < rowCount; j++) {
                    rows[j].squares.pop();
                }
            }
        }
    });

    $scope.toggleColor = function (square) {

        if (square.color == $scope.selectedColor) {
            square.color = $scope.defaultColor;
        }
        else {
            square.color = $scope.selectedColor;
        }
    }

    $scope.newColor = function () {
        var color = {};
        color.red = Math.floor(Math.random() * 256);
        color.green = Math.floor(Math.random() * 256);
        color.blue = Math.floor(Math.random() * 256);
        $scope.pallette.push(color);
    }

    $scope.removeColor = function (color) {
        $scope.pallette.splice($scope.pallette.indexOf(color), 1);
    }

    $scope.selectColor = function (color) {
        $scope.selectedColor = color;
    }

    $scope.editColor = function (color) {
        $mdDialog.show({
            controller: EditColorDialogController,
            templateUrl: 'templates/edit-color-dialog.html',
            locals: { color: color }
        });
        /*
        .then(function (answer) {
            $scope.alert = 'You said the information was "' + answer + '".';
        }, function () {
            $scope.alert = 'You cancelled the dialog.';
        });
        */
    }

    var pallette = [];

    $scope.pallette = pallette;
    $scope.newColor();
    $scope.newColor();
    $scope.newColor();
    $scope.selectedColor = pallette[0];    
});