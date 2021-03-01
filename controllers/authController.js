const { MongoClient } = require("mongodb");

const COLLLECTION_NAME = "token";

exports.checkVisitorPrivilege = function(req, res, next){
    var token = req.body.token;
    db.collection(COLLLECTION_NAME).findOne({ "token": token }, function(err, result){
        if(!result){
            res.send(404, { error: "The provided API token is unknown." });
        }
        else if(result.privilege < 1){
            res.send(404, { error: "The provided API token does not allows you to proceed." });
        }
        else next();
    })
}

exports.checkUserPrivilege = function(req, res, next){
    var token = req.body.token;
    db.collection(COLLLECTION_NAME).findOne({ "token": token }, function(err, result){
        if(!result){
            res.send(404, { error: "The provided API token is unknown." });
        }
        else if(result.privilege < 2){
            res.send(404, { error: "The provided API token does not allows you to proceed." });
        }
        else next();
    })
}

