const { ObjectId } = require("bson");
const { Db } = require("mongodb");
const { MongoClient } = require("mongodb");
const validator = require("email-validator");
const bcrypt = require('bcrypt');

const COLLLECTION_NAME = "sortie";

exports.get_sorties = function(req, res){
   
    db.collection(COLLLECTION_NAME).aggregate(
        [ 
            {
                '$addFields' : {
                    "userId": { "$toObjectId": "$userId" }
                }
            },
            { 
                '$lookup' : {
                    from: 'randonnee',
                    localField: 'randonneeId',
                    foreignField: 'id',
                    as: 'randonnee' 
                }
            },
            {
                '$lookup' : {
                    from: 'user',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                '$project' : {
                    '_id': 1,
                    'randonneeId': 1,
                    'userId': 1,
                    'date': 1,
                    'performances': 1,
                    'randonnee.name': 1,
                    'randonnee.images': 1,
                    'randonne.startpoint.coordinates': 1,
                    'user.firstname': 1,
                    'user.lastname': 1,
                    'user.mail': 1,
                    'user.photoUrl': 1,
                }
            }
        ]).toArray(function(err, results){
            if(err) 
                res.send(err)
            else
                res.send(results);
    })
}

exports.create_sortie = function(req, res, sortieData){
    db.collection(COLLLECTION_NAME).insertOne(sortieData, function(err, sortieInserted){
        if(err)
            res.send(err)
        else
            res.json(200, {
                "success": "Sortie créée"
            })
    })
}