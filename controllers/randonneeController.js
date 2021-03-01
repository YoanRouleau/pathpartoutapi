const { MongoClient } = require("mongodb");

const COLLLECTION_NAME = "randonnee";
// const server = require("../server.js");

exports.list_all_Randonnees = function(req, res) {
  
  db.collection(COLLLECTION_NAME).find({})
                                  .project({ "_id": 0, "gpx": 0 })
                                  .toArray(function(err, result){
    if(err) 
      throw err;
    if(!result.length)
      res.json( { "error" : "Il n'y a pas de randonnée." } );
    else{
      res.json(result);
    }
  });
};

exports.get_Randonnee = function(req, res, id){
  db.collection(COLLLECTION_NAME).find({ "id": parseInt(id) })
                                  .project({ "_id": 0 })
                                  .toArray(function(err, result){
    if(err) 
      throw err;
    if(!result.length)
      res.json( { "error" : "Cette randonnée n'existe pas." } );
    else{
      res.json(result);
    }
  })
};

exports.get_Randonnee_GPX = function(req, res, id){
  db.collection(COLLLECTION_NAME).find({ "id": parseInt(id) })
                                  .toArray(function(err, result){
    if(err) 
      throw err;
    if(!result.length)
      res.json( { "error" : "Cette randonnée n'existe pas ou ne possède pas de GPX." } );
    else{
      res.json(result[0].gpx);
    }
  })
}