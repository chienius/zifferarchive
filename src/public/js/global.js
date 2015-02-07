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
    $scope.getImgClass = function(){
        if( window.innerHeight > window.innerWidth )
            return 1;
        else
            return 0; 
    };
    $scope.startDownload = function(filename){
        var downWindow = window.open('sheets/'+filename);
    };
}]);
