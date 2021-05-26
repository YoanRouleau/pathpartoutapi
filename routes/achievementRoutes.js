const bodyParser = require("body-parser");
const { request } = require("express");
const express = require("express");
const path = require('path')

let urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = function(app){
    var achievement = require('../controllers/achievementController');
    var auth = require("../controllers/authController"); 

    app.post('/achievements/list', urlencodedParser, auth.checkUserPrivilege, function(request,response, next){
        achievement.list_achievements(request, response);
    });

    app.post('/achievements/get/user', urlencodedParser, auth.checkUserPrivilege, function(request,response, next){
        achievement.get_completed_achievements(request, response);
    });


}