'use strict';

var io = require('../../server');
var app = io.app;

var mongoose = require('mongoose');
var Users = mongoose.model('Users');

io.set('transports', ['websocket']);

io.on('connection', function (socket) {
    var query = socket.request._query; // Get all query
    var userId = query['userId'];
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
        });
    }
});