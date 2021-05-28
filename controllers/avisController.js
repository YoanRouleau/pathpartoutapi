const { ObjectId } = require("bson");
const { Db } = require("mongodb");
const { MongoClient } = require("mongodb");
const validator = require("email-validator");
const bcrypt = require('bcrypt');

const COLLLECTION_NAME = "avis";

exports.create_avis = function(req, res){
    db.collection(COLLLECTION_NAME).find({ "userId": req.body.userId }).toArray(function(err, userFound){
        console.log(userFound.length);
        if(err) throw err;
        if(userFound.length !== 0)
            res.json( { "error": "Cet utilisateur a déjà écrit un avis pour cette randonnée."});
        else{
            var newAvis = {
                "userId": req.body.userId,
                "randonneeId": req.body.randonneeId,
                "note": req.body.note,
                "avis": req.body.avis,
            }
            db.collection(COLLLECTION_NAME).insertOne(newAvis, function(err, avisInserted){
                if(err) throw err;

                res.json(200, {
                    "success": "L'avis a bien été crée."
                })
            })
        }
    })
}

exports.create_avis_with_photo = function(req, res){
    db.collection(COLLLECTION_NAME).find({ "userId": req.body.userId }).toArray(function(err, userFound){
        console.log(userFound.length);
        if(err) throw err;
        if(userFound.length !== 0)
            res.json( { "error": "Cet utilisateur a déjà écrit un avis pour cette randonnée."});
        else{
            var newAvis = {
                "userId": req.body.userId,
                "randonneeId": req.body.randonneeId,
                "note": req.body.note,
                "avis": req.body.avis,
                "imageUrl": req.body.imageUrl,
            }
            db.collection(COLLLECTION_NAME).insertOne(newAvis, function(err, avisInserted){
                if(err) throw err;

                res.json(200, {
                    "success": "L'avis a bien été crée."
                })
            })
        }
    })
}

exports.get_avis_by_randonnee = function(req, res){
    db.collection(COLLLECTION_NAME).aggregate([
        {
            '$match' : {
                "randonneeId": req.body.randonneeId,
            }
        },
        {
            '$addFields' : {
                "userId": { "$toObjectId": "$userId" }
            }
        },
        {
            '$lookup': {
                from: 'user',
                localField: 'userId',
                foreignField: '_id',
                as: 'userData'
            }
        },
        {
            '$project' : {
                "_id": 1,
                "userId": 1,
                "randonneeId": 1,
                "note": 1,
                "avis": 1,
                "userData.firstname": 1,
                "userData.lastname": 1,
                "userData.title": 1,
                "userData.photoUrl": 1,
            }
        }
    ]).toArray(function(err, results){
        if(err) 
            res.send(err)
        if(!results.length)
            res.json("Cette randonnee n'a pas encore d'avis.")
        else
            res.json(results);
    })
}

exports.get_avis_by_user = function(req, res){
    db.collection(COLLLECTION_NAME).find({ "userId": req.body.userId }).toArray(function(err, results){
        if(err) throw err;
        if(!results.length)
            res.json("Vous n'avez pas encore donné d'avis")
        else
            res.json(results);
    })
}