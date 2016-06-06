var app = require('../app.js');
app
.controller('CoreCtrl', ['$scope', '$http', 'localStorageService', function ($scope, $http, localStorageService) {

  var ls = localStorageService;
  $scope.me = ls.get('me');
  // ==============================================
  // === TODO : SET YOUR STRAPI APP ADRESS HERE ===
  // ==============================================
  $scope.server = 'http://localhost:2999';
  // ==============================================

  // Chargement des produits
  $http.get($scope.server+'/product')
  .then(
    function(res){
      console.log('OK : products loaded');
      $scope.products = res.data;
    },
    function(err){
      console.log('ERR : ' + err.data);
    }
  );



}]);
