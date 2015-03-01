﻿app.controller('ReviewCtrl', function ($scope, $http) {
    var self = this;
    // list of `state` value/display objects
    var review = {};
    review.Title = null;
    $scope.review = review;
    $scope.productTypes = [];
    $scope.selectedProductType = null;
    $scope.productTypeSearchText = null;
    $scope.productTypeSearch = productTypeSearch;

    $scope.updateRatings = function () {
        $scope.review.Ratings = [];
        if ($scope.review.Product.Type !== undefined && $scope.review.Product.Type !== null) {
            for (var i = 0; i < $scope.review.Product.Type.RatingTypes.length; i++) {
                var rating = {};
                rating.Value = 0;
                rating.Type = $scope.review.Product.Type.RatingTypes[i];
                $scope.review.Ratings.push(rating);
            }
        }
    }

    $scope.submitReview = function()
    {
        $http.post('http://api.imaginarium.getsett.net/legends-of-lunchtime/review',
                    $scope.review,
                    { headers: { 'Authorization': token.token_type + ' ' + token.access_token } }).
        success(function (data, status, headers, config) {
      // this callback will be called asynchronously
      // when the response is available
        })
        .error(function (data, status, headers, config) {

            $mdToast.show(
                $mdToast.simple()
                .content(data.error_description)
                .position('top left right')
                .hideDelay(3000)
            );
        });
    }

    loadAll();
    // ******************************
    // Internal methods
    // ******************************
    /**
     * Search for states... use $timeout to simulate
     * remote dataservice call.
     */
    function productTypeSearch(query) {
        var results = query ? $scope.productTypes.filter(createFilterFor(query)) : [],
            deferred;
        return results;
    }
    /**
     * Build `states` list of key/value pairs
     */
    function loadAll() {
        $http.get('http://api.imaginarium.getsett.net/legends-of-lunchtime/product-types')
            .success(function (data, status, headers, config) {
                $scope.productTypes = data;
            });
    }
    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(productType) {
            return (productType.Name.toLowerCase().indexOf(lowercaseQuery) !== -1);
        };
    }

    
});