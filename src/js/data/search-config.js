module.exports = (function(){

  // TODO : trouver un "modèle" de donnée de config
  var cfg = {
    "attributes" : [
      {
        "name" : "number"
      },
      {
        "name" : "text"
      },
      {
        "name" : "tips",
        "attributes" : [
          {
            "name" : "s"
          },
          {
            "name" : "ps"
          },
          {
            "name" : "ns"
          },
          {
            "name" : "so"
          }
        ]
      },
      {
        "name" : "testing"
      },
      {
        "name" : "ccp"
      },
      {
        "name" : "md"
      }

    ]
  };
  return cfg;
})();
