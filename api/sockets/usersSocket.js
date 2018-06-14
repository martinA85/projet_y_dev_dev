'use strict';

var io = require('../../server');
var app = io.app;

var mongoose = require('mongoose');
var Users = mongoose.model('Users');

io.set('transports', ['websocket']);

io.on('connection', function (socket) {
    var query = socket.request._query; // Get all query
    var action = query['action'];
    switch (action) {
        // Connection via G+, FB, Twitter
        case 'auth':
            var email = query['email'];
            var token = jwt.sign(payload, app.get('superSecret'), {
                expiresIn : '24h' ///expire 24 hours
            });
            // Create connection, if user doesn't existe, it created
            Users.findOne({email:email}, function(err, user){
                if(err){
                    var user = new Users();
                    user.email = email;
                    user.name = query['name'];
                    user.firstname = query['firstname'];
                    user.socketId = socket.id;
                    user.token = token;
                }else{
                    user.socketId = socket.id;
                    user.token = token;
                }
                user.save();
                socket.emit('auth', {
                    success : true,
                    message : 'Auth succeed',
                    token : token,
                    _id : user._id
                });
            });
            break;

        default:
            var userId = socket.request._query['userId'];
            if (userId) {
                var socketId = socket.id;
                Users.findById(userId, function (err, user) {
                    if (err) {
                        socket.emit('cnx_state', { success: false });
                    } else {
                        user.socketId = socketId;
                        user.save();
                        socket.emit('cnx_state', { success: true });
                    }
                })
            }
            break;
    }
});