const bodyParser = require("body-parser");
const { request } = require("express");
const express = require("express");
const path = require('path')

let urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = function(app){
    var user = require("../controllers/userController");
    var auth = require("../controllers/authController"); 

    app.post('/user/get', urlencodedParser, auth.checkVisitorPrivilege, function(request, response, next){
        var id = request.body.userId;
        user.get_user_data(request, response, id);   
    })

    app.post('/user/create', urlencodedParser, auth.checkVisitorPrivilege, function(request, response){
        // console.log(request.body);
        var userData = { 
            'email': request.body.email,
            'password': request.body.password
        };
        // response.json(user)
        user.create_new_user(request, response, userData);
    })
    

    app.put('/user/update', urlencodedParser, auth.checkUserPrivilege, function(request, response, next){
        user.update_user(request, response)
        // response.json(request.body);
    })

    // app.post('/api/testpost', urlencodedParser, function(req, res){
    //     console.log(req.body.username);  
    //     res.send("hello");
    // })
    

};