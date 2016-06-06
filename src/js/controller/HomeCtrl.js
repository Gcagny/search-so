var app = require('../app.js');
var cfg = require('../data/search-config.js');

app
.controller('HomeCtrl', ['$scope', '$http', function ($scope, $http) {



  var getAttributes = function(tree, output){
    console.log(tree.attributes);
    if(tree.attributes == undefined){
      output.push(tree);
    }
    else {
      getAttributes(tree.attributes, output);
    }
  }

  var init = function(){
    // Variable de recherche (string)
    $scope.keyword = '';

    // Chargement de la config de la recherche
    $scope.cfg = cfg;
    $scope.attributes = [];
    getAttributes(cfg, $scope.attributes);
    console.log('=======');
    console.log($scope.attributes);
    console.log('=======');



    // fonction de recherche
    $scope.search = function(keyword, data){
      console.log('search → ' + keyword);
      $scope.result = data;
    };
  }
  init();

}]);
