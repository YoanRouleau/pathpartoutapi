const bodyParser = require("body-parser");
const { request } = require("express");
const express = require("express");
const path = require('path')

let urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = function(app){

    app.use(express.static("doc"));
    app.get('/', function(request, response){
        response.sendFile('index.html', { root: 'doc' });
    })
}