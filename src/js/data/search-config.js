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
        "child" :
          {
            "name" : "s"
          }
      },
      {
        "name" : "tips",
        "child" :
          {
            "name" : "ps"
          }
      },
      {
        "name" : "tips",
        "child" :
          {
            "name" : "ns"
          }
      },
      {
        "name" : "tips",
        "child" :
          {
            "name" : "so"
          }
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
