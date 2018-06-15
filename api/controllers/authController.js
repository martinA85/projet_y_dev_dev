'use strict';

var mongoose = require("mongoose");
var Users = mongoose.model("Users");
var server = require('../../server');
var jwt = server.jwt;
var app = server.app;

var new_token = function (str) {
    const payload = {
        name: str
    }
    var token = jwt.sign(payload, app.get('superSecret'), {
        expiresIn: '24h' ///expire 24 hours
    });

    return token;
}

//check if auth exist and have the right password and give him a token
exports.authentificate = function (request, response) {
    if (request.body.idUserNetwork) {
        Users.findOneAndUpdate({ idUserNetwork: request.body.idUserNetwork }, request.body, { new: true }, function (err, user) {
            if (err) throw err;

            if (!user) {
                user = new Users(request.body);
                user.save(function (err) {
                    if (err) {
                        response.send(err);
                    }
                });
            }
            user.token = new_token(user.idUserNetwork);
            user.save();
            response.json({
                success: true,
                message: 'Auth succeed',
                token: user.token,
                _id: user._id
            });
        });
    } else {
        console.log('Connexion basic');
        Users.findOne({ email: request.body.email }, function (err, user) {
            if (err) throw err;

            if (!user) {
                response.json({ success: false, message: 'Auth failed, User not found' });
            } else if (user) {

                if (user.password != request.body.password) {
                    console.log(user.password);
                    response.json({ success: false, message: 'Wrong password' });
                } else {

                    var token = new_token(user.email);

                    user.token = token;
                    user.save();

                    response.json({
                        success: true,
                        message: 'Auth succeed',
                        token: token,
                        _id: user._id
                    });
                }
            }
        });
    }
}