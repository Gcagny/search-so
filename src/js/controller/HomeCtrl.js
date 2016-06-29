var app = require('../app.js');
app
.controller('HomeCtrl', ['$scope', '$http', function ($scope, $http) {

  var init = function(){
    // $scope.console = console;
    $scope.copy = angular.copy;
    $scope.http = $http;
    $http.get("/search/2").then(function(reponse){
      $scope.cfg = reponse.data;
    });
    $scope.search = function(keywords){
      $http.get("/search/2/post/"+keywords).then(function(resultat){
        $scope.result = resultat.data;
      });
    }

  }
  init();

}]);
