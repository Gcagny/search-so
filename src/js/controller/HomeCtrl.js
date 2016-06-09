var app = require('../app.js');
var cfg = require('../data/search-config.js');

app
.controller('HomeCtrl', ['$scope', '$http', function ($scope, $http) {

 var getAttributes = function(tree, output, tmp){ // Récupère les attributs
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

 var parseQuery = function(keywords){ // Split le string de la barre de recherche en un tableau, chaque mot séparé par " " prend une case
   keywords = _.uniq(keywords.split(" "));
   return keywords;
 };

 var search = function(keywords,attr,objects, lower, latinize){
    var output = [];
    _.forEach(objects,function(o){
      o.score =0; // Nombre de mot clé différent trouvé dans l'objet
      o.scoreN = 0; // Total du nombre de fois ou chaque mot clé a était trouvé
      o.arrScore = []; // Tableau de stockage des mots clé
      o.arrNumberPerKeyword = {}; // Tableau associatif de stockage de mot clé et leurs valeurs

      _.forEach(keywords,function(k){ // Fonction de création du tableau associatif
        o.arrNumberPerKeyword[k] = 0; // Initialise chaque value a 0

        // Fonction qui vérifie si _a est contenu dans target, si c’est le cas place _o dans output.
        var testObjProp = function(_a, target, _o, _k, _output){
          if(_a !== undefined && _a.name !== undefined){
            var allIndices = String(target[_a.name]).allIndicesOf(_k,true,true).length;
            if(allIndices > 0){ // Si o.attribut comprend le keyword(le reconnait grace a allindicesof)
              _o.arrScore.push(_k); // push du motclé dans le tableau arrScore
              _o.arrNumberPerKeyword[_k] += allIndices ; // fonction d'incrementation de la value du mot clé en key du tableau associatif
              _output.push(_o); // Push dans le tableau output l'objet si il a match
            }
          }
        }

        // Fonction qui parcourt un arbre de sous-propriété ( o.truc.machin → ['truc', 'machin'] ) et test la présence du key word
        var testObjPropTree = function(_a, target, _o, _k, _output){ // Si on est sur une feuille
          console.log('=====');
          console.log('=== _a');
          console.log(_a);
          console.log('=== target');
          console.log(target);


          if(typeof _a.attributes == undefined){
            testObjProp(_a, target, _o, _k, _output);
          }
          else{ //TODO boucler sur _a.attri
            _.forEach(_a.attributes,function(attr){
              testObjPropTree(attr, target[_a.name], _o, _k, _output);

            });
          }
        };

        // _.forEach(attr,function(a){
          testObjPropTree(attr, o, o, k, output);
        // });

        console.log(output);
      });

      // ----- Calcul du score
      o.arrScore = _.uniq(o.arrScore); //Clean les doubles (ne veut que savoir si le keyword  match ou pas)
      o.score = o.arrScore.length;

      // ------ FIn calcul du score
      //----- Calcul du scoreN
      _.forEach(o.arrNumberPerKeyword,function(e){
        o.scoreN += e;
      })
      // Fin Calcul

    });

    output = _.uniq(output); // Clean les doublons
    return output;
 };


 var init = function(){
   $scope.printAttrLabel = function(attr){
     var label = '';
     if(typeof attr.attributes!==undefined){
       _.forEach(attr.attributes, function(a){
         label =  attr.name + '.' + $scope.printAttrLabel(a);
       });
     }
     else{
       label = attr.name;

     }
     return label;
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
  //  $scope.attributes = [];
  //  getAttributes(cfg, $scope.attributes);



   // fonction de recherche
   $scope.search = function(keyword, data){
   keyword = parseQuery(keyword);
   $scope.result = search(keyword, $scope.cfg, $scope.products, true, true);
    //  $scope.result = search(keyword, $scope.attributes, $scope.products, true, true);
   };
 }
 init();

}]);
