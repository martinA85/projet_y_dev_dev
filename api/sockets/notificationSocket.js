'use strict';

var io = require('../../server');

var mongoose = require('mongoose');
var Users = mongoose.model('Users');

/**
 * @description function that send a notification object to a socket
 * @param {String} socketId 
 * @param {Notification} notification
 * @author Martin Allimonier <martin@noosys.fr>
 */
module.exports.sendNotificationToUser = function (socketId, notification, callback) {
    var socket = io.sockets.sockets[socketId];
    if (socket) {
        socket.emit('new_notification', notification, (data) => {
            callback(data);
        });
    }
}

/**
 * @description function that send a notification to all users
 * @param {String} notification 
 * @param {return} callback 
 */
module.exports.sendNotificationToAll = function (notification, callback) {
    socket.broadcast.emit('all_users', notification, (data) => {
        callback(data);
    })
}