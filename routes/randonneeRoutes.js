const bodyParser = require("body-parser");
const { request } = require("express");

let urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = function(app){
    var randonnee = require("../controllers/randonneeController");
    var user = require("../controllers/userController");
    var auth = require("../controllers/authController");

    app.post('/randonnees', urlencodedParser, auth.checkVisitorPrivilege, function(request, response, next){
        randonnee.list_all_Randonnees(request, response);        
    })
    
    app.post('/randonnee/:id', urlencodedParser, auth.checkVisitorPrivilege, function(request, response, next){
        // console.log("id: " + request.params.id);
        var id = request.params.id;
        randonnee.get_Randonnee(request, response, id);        
    })

    app.post('/randonnee/:id/gpx', urlencodedParser, auth.checkVisitorPrivilege, function(request, response, next){
        var id = request.params.id;
        randonnee.get_Randonnee_GPX(request, response, id);
    })

    app.post('/randonnee/add/photo', urlencodedParser, auth.checkUserPrivilege, function(request, response, next){
        randonnee.add_randonnee_photo(request, response);
    })

      
};