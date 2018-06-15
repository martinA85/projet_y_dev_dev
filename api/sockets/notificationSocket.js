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
module.exports.sendNotificationToUser = function(socketId, notification, callback){
    var socket = io.sockets.sockets[socketId];
    if(socket){
        socket.emit('new_notification', notification, (data) => {
            callback(data);
        });
    }
}