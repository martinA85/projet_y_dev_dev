'use strict';

var io = require('../../server');

var mongoose = require('mongoose');
var Users = mongoose.model('Users');

io.on('connection', function (socket) {
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
});