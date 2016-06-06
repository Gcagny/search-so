module.exports = (function(){

  // TODO : trouver un "modèle" de donnée de config
  var cfg = {
    "attributes" : [
      {"name" : "id"},
      {"name" : "kind"},
      {"name" : "name"},
      {"name" : "labo"},
      {
        "name" : "qsp",
        "attributes" : [
          {"name" : "unit"},
          {
            "name" : "unautre",
            "attributes": [
              {"name":"test"}
            ]
          }

        ]
      }
    ]
  };
  return cfg;
})();
