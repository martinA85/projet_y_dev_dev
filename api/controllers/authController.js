'use strict';

var mongoose = require("mongoose");
var Users = mongoose.model("Users");
var server = require('../../server');
var jwt = server.jwt;
var app = server.app;

//check if auth exist and have the right password and give him a token
exports.authentificate = function(request, response){
    Users.findOne({name:request.body.name}, function(err, user){
        if (err) throw err;

        if(!user){
            res.json({success: false, message: 'Auth failed, User not found'});
        }else if(user){

            if (user.password != request.body.password){
                res.json({success: false, message: 'Wrong password'});
            }else{

                const payload = {
                    name: user.name
                }
                var token = jwt.sign(payload, app.get('superSecret'), {
                    expiresIn : '24h' ///expire 24 hours
                });

                user.token = token;
                Users.findOneAndUpdate({_id:user._id}, user, {new: true}, function(err, user){
                    if(err){
                        response.send(err);
                    }
                })

                response.json({
                    success : true,
                    message : 'Auth succeed',
                    token : token
                })
            }
        }
    });
}