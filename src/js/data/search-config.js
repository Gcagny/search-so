module.exports = (function(){

  // TODO : trouver un "modèle" de donnée de config
  var cfg = {
    "attributes" : [
      {
        "name" : "id",
        "score" : 0
      },
      {
        "name" : "kind",
        "score" : 2
      },
      {
        "name" : "name",
        "score" : 4
      },
      {
        "name" : "labo",
        "score" : 2
      },
      {
        "name" : "qsp",
        "attributes" : [
          {
            "name" : "unit",
            "score" : 1
          },
            ]
          }

        ]
  };
  return cfg;
})();
