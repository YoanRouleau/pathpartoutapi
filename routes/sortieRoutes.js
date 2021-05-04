const bodyParser = require("body-parser");
const { request } = require("express");
const express = require("express");
const path = require('path')

let urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = function(app){
    var sortie = require("../controllers/sortieController");
    var auth = require("../controllers/authController"); 

    app.post("/sortie/all", urlencodedParser, auth.checkUserPrivilege, function(request, response){
        sortie.get_sorties(request, response)
    })

    app.post('/sortie/create', urlencodedParser, auth.checkUserPrivilege, function(request, response){
        var sortieData = {
            'randonneeId': parseInt(request.body.randonneeId),
            'userId': request.body.userId,
            'date': new Date(),
            'performances': request.body.performances
        }

        sortie.create_sortie(request, response, sortieData);
    })

    app.post('/sortie/get/user', urlencodedParser, auth.checkUserPrivilege, function(request, response){
        sortie.get_sorties_by_user(request, response);
    });
};