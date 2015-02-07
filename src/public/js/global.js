var curState = new Object({});
curState.track = -1;
var app = angular.module("zifferArchive", []);

app.controller("TrackListController", ["$scope", "$http", function($scope, $http){
    $http
        .get('./json/archive.json')
        .success(function(data){
            $scope.tracks=data;
        });

    $scope.curState = curState;
}]);
