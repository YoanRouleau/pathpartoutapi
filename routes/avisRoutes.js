const bodyParser = require("body-parser");
const { request } = require("express");
const express = require("express");
const path = require('path')

let urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = function(app){
    var avis = require('../controllers/avisController');
    var auth = require("../controllers/authController"); 

    app.post('/avis/create', urlencodedParser, auth.checkUserPrivilege, function(request,response, next){
        avis.create_avis(request, response);
    });

    app.post('/avis/create/withimage', urlencodedParser, auth.checkUserPrivilege, function(request,response, next){
        avis.create_avis_with_photo(request, response);
    });

    app.post('/avis/get/randonnee', urlencodedParser, auth.checkUserPrivilege, function(request, response, next){
        avis.get_avis_by_randonnee(request, response);
    })

    app.post('/avis/get/user', urlencodedParser, auth.checkUserPrivilege, function(request, response, next){
        avis.get_avis_by_user(request, response);
    });


}