var app = require('../app.js');
var cfg = require('../data/search-config.js');

app
.controller('HomeCtrl', ['$scope', '$http', function ($scope, $http) {



 var getAttributes = function(tree, output, tmp){
   if(tree.attributes === undefined){
     if(tmp===undefined){
       output.push(tree.name);
     }
     else {
       tmp.push(tree.name)
       output.push(tmp);
     }
   }
   else {
     _.forEach(tree.attributes, function(a){
       var _tmp = tree.name === undefined ? undefined : [tree.name];
       getAttributes(a, output, _tmp);
     })
   }
 }

 var parseQuery = function(keyword){
   keyword = keyword.split(" ");
   return keyword;
 }

 var search = function(keywords,attr,objects, lower, latinize){ //accepte un seul mot clé
    var output = [];
    _.forEach(objects,function(o){
      o.score =0;
      _.forEach(keywords,function(k){
        _.forEach(attr,function(a){
          // a = String(a);
          if(String(o[a]).allIndicesOf(k,true,true).length > 0){
            o.score += 1;
            output.push(o);
          }
        });
      });
    });
    output = _.uniq(output); // Clean les doublons
    return output;
 };


 var init = function(){
   $scope.printAttrLabel = function(attr){
     if(typeof attr==='object'){
       return $scope.printAttrLabel(attr[1]);
     }
     return attr;
   };

   $scope.printAttrVal = function(attr, obj){
     if(obj!==undefined){
       if(typeof attr==='object'){
         return $scope.printAttrVal(attr[1], obj[attr[0]]);
       }
       return obj[attr];
     }
   };

   $scope.cfg = cfg;
   $scope.attributes = [];
   getAttributes(cfg, $scope.attributes);


   // fonction de recherche
   $scope.search = function(keyword, data){
     keyword = parseQuery(keyword);
     $scope.result = search(keyword, $scope.attributes, $scope.products, true, true);
   };
 }
 init();

}]);
