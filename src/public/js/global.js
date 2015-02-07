var curState = new Object({});
curState.track = -1;
var app = angular.module("zifferArchive", []);

app.filter('searchTrack', function(){
    return function(input, query){
        if(!input) return;
        if(!query) return input;
        return input.filter(function(item, index, array){
            if(item.name.toLowerCase().indexOf(query.toLowerCase())>-1 || item.artist.toLowerCase().indexOf(query.toLowerCase())>-1 || item.origin.toLowerCase().indexOf(query.toLowerCase())>-1)
                return true;
        });
    };
});

app.controller("TrackListController", ["$scope", "$http", function($scope, $http){
    $http
        .get('./json/archive.json')
        .success(function(data){
            $scope.tracks=data;
        });

    $scope.curState = curState;
    $scope.openSearch = 0;
    $scope.query = '';
    $scope.showIntro = 0;

    $scope.getImgClass = function(){
        if( window.innerHeight > window.innerWidth )
            return 1;
        else
            return 0; 
    };
    $scope.startDownload = function(filename){
        var downWindow = window.open('sheets/'+filename);
    };
    $scope.toggleSearch = function(){
        var searchFlag = $scope.openSearch;
        if(searchFlag){
            $scope.openSearch = 0;
            $scope.query = '';
            angular.element('body').focus();
        }
        else{
            $scope.openSearch = 1;
            angular.element('input').focus();
        }
    };
}]);
