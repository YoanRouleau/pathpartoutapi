const { ObjectId } = require("bson");
const { Db } = require("mongodb");
const { MongoClient } = require("mongodb");
const validator = require("email-validator");
const bcrypt = require('bcrypt');


exports.check_after_sortie = function(req, res, sortieData){
    db.collection("sortie").countDocuments({ 'userId': sortieData.userId }, function(err, counter){
        switch(counter){
            case 1:
                db.collection("achievement").findOne({ _id: new ObjectId("60998f2649627d1a70194099") }, function(err, achivement){
                    db.collection("achievementUnlocked").insertOne({
                        "userId": sortieData.userId,
                        "achievementId": achivement._id.toString()
                    }, function(err, result){
                        res.end(`[Bravo ! Tu as débloqué le titre "${achivement.title}" !]`);
                    })
                })
                break;
            case 3:
                db.collection("achievement").findOne({ _id: new ObjectId("6099839249627d1a70194094") }, function(err, achivement){
                    db.collection("achievementUnlocked").insertOne({
                        "userId": sortieData.userId,
                        "achievementId": achivement._id.toString()
                    }, function(err, result){
                        res.end(`[Bravo ! Tu as débloqué le titre "${achivement.title}" !]`);
                    })
                })
                break;
            case 5:
                db.collection("achievement").findOne({ _id: new ObjectId("6099839249627d1a70194095") }, function(err, achivement){
                    db.collection("achievementUnlocked").insertOne({
                        "userId": sortieData.userId,
                        "achievementId": achivement._id.toString()
                    }, function(err, result){
                        res.end(`[Bravo ! Tu as débloqué le titre "${achivement.title}" !]`);
                    })
                })
                break;
            case 10:
                db.collection("achievement").findOne({ _id: new ObjectId("6099839249627d1a70194096") }, function(err, achivement){
                    db.collection("achievementUnlocked").insertOne({
                        "userId": sortieData.userId,
                        "achievementId": achivement._id.toString()
                    }, function(err, result){
                        res.end(`[Bravo ! Tu as débloqué le titre "${achivement.title}" !]`);
                    })
                })
                break;
            default:
                res.end();
        }  
        // res.end(`[${counter.toString()}]`);
    });
    // res.end()
}

exports.list_achievements = function(req, res){
    db.collection("achievement").find({})
                                  .toArray(function(err, result){
    if(err) 
      throw err;
    if(!result.length)
      res.json( { "error" : "Il n'y a pas d'achievements." } );
    else{
      res.json(result);
    }
  });
}

exports.get_completed_achievements = function(req, res){
    db.collection('achievementUnlocked').aggregate(
        [
            {
                '$addFields' : {
                    "achievementId": { "$toObjectId": "$achievementId" },
                    "userId": { "$toObjectId": '$userId' }
                }
            },
            {
                '$lookup' : {
                    from: 'achievement',
                    localField: 'achievementId',
                    foreignField: '_id',
                    as: 'achievementUnlocked'
                }
            },
            {
                '$match' : {
                    'userId' : ObjectId(req.body.userId)
                }
            }
        ]).toArray(function(err, results){
            if(err) 
                res.send(err)
            else
                res.send(results);
        })
}