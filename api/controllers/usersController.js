'use strict';

var mongoose = require("mongoose");
var Users = mongoose.model("Users");

exports.createUser = function(request, response){
    let new_user = new Users(request.body);
    console.log(new_user);
    new_user.save(function(err, new_user){
        if(err){
            response.send(err);
        }
        response.json(new_user);
    });
};

exports.getAllUsers = function(request, response){
    Users.find({}, function(err, users){
        if(err){
            response.send(err);
        }
        response.json(users);
    });
};
