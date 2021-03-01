const { ObjectId } = require("bson");
const { Db } = require("mongodb");
const { MongoClient } = require("mongodb");
const validator = require("email-validator");
const bcrypt = require('bcrypt');

const COLLLECTION_NAME = "user";

exports.get_user_data = function(req, res, id){
    // var o_id = new MongoClient.ObjectID(id)
    db.collection(COLLLECTION_NAME).find({ "_id": new ObjectId(id) })
                                    .toArray(function(err, result){
        if(err) 
            throw err;
        if(!result.length)
            res.json( { "error" : "Cette utilisateur n'existe pas." } );
        else{
            res.json(result);
        }
    })
};

exports.create_new_user = function(req, res, user){
    db.collection(COLLLECTION_NAME).findOne({ mail: user.email }, function(err, userFound){
        if(userFound){
            res.json(403, { 'error': "L'adresse email saisie est déjà utilisée pour un autre compte. Veuillez saisir une nouvelle adresse mail." });
        }else{
            if(!validator.validate(user.email))
                res.json( { "error" : "L'email n'est pas au bon format." } );
            else{
                bcrypt.hash(user.password, 10).then(function(hashedPassword){
                    var newUser = {
                        "firstname":"",
                        "lastname":"",
                        "title":"Nouvel utilisateur de PathPartout",
                        "mail": user.email,
                        "password": hashedPassword,
                        "privilegeLevel": 2,
                        "photoUrl":"",
                        "avatar": [],
                        "userData": []
                    }
                    
                    db.collection(COLLLECTION_NAME).insertOne( newUser, function(err, userInserted){
                        if(err) return;
                        
                        res.json(200, { 
                            "succes" : "Utilisateur crée.",
                            "userID": userInserted.insertedId
                        })
                    })
                })
            }
        }
    })
       
   
        
    

    

    // db.collection(COLLLECTION_NAME).insert()
}