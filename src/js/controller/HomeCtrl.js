var app = require('../app.js');
var cfg = require('../data/search-config.js');

app
.controller('HomeCtrl', ['$scope', '$http', function ($scope, $http) {



  var parseQuery = function(keywords){ // Split le string de la barre de recherche en un tableau, chaque mot séparé par " " prend une case
  keywords = _.uniq(keywords.split(" "));
  return keywords;
};

var search = function(keywords, objects, lower, latinize){
  // === UTILS ====
  // Fonction qui vérifie si _a est contenu dans target, si c’est le cas place _o dans output.
  var testObjProp = function(_a, tgtObj, rootObj, keyword, _output){
    if(_a.name !== undefined){
      var allIndices = String(tgtObj[_a.name]).allIndicesOf(keyword,true,true).length;
      console.log("===> " + allIndices + " matches");
      if(allIndices > 0){ // Si o.attribut comprend le keyword(le reconnait grace a allindicesof)
        rootObj.arrScore.push(keyword); // push du motclé dans le tableau arrScore
        rootObj.arrNumberPerKeyword[keyword] += allIndices ; // fonction d'incrementation de la value du mot clé en key du tableau associatif
        _output.push(rootObj); // Push dans le tableau output l'objet si il a match
      }
    }
  }

  // Fonction qui parcourt un arbre de sous-propriété
  var testObjPropTree = function(_a, tgtObj, rootObj, keyword, _output){
    if(_a.child === undefined){
      testObjProp(_a, tgtObj, rootObj, keyword, _output);
    }
    else{
      testObjPropTree(_a.child, tgtObj[_a.name], rootObj, keyword, _output);
    }
  };
  // === END UTILS ====


  // LOAD CONFIG
  var attr = cfg.attributes;

  // init OUTPUT
  var output = [];

  _.forEach(objects, function(o){
    o.score =0; // Nombre de mot clé différent trouvé dans l'objet
    o.scoreN = 0; // Total du nombre de fois ou chaque mot clé a était trouvé
    o.arrScore = []; // Tableau de stockage des mots clé
    o.arrNumberPerKeyword = {}; // Tableau associatif de stockage de mot clé et leurs valeurs

    _.forEach(keywords,function(k){ // Fonction de création du tableau associatif
      o.arrNumberPerKeyword[k] = 0; // Initialise chaque value a 0
      _.forEach(attr, function(a){
        testObjPropTree(a, o, o, k, output);
      });
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
  // $scope.console = console;
  $scope.copy = angular.copy;


  // == CALL SEARCH FCT
  // ==--- LOAD CFG
  $scope.cfg = cfg;
  // ==--- CALL
  $scope.search = function(keyword, data){
    keyword = parseQuery(keyword);
    $scope.result = search(keyword, $scope.products, true, true);
  };
}
init();

}]);
