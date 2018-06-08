'use strict';

var mongoose =require("mongoose");
var Notification = mongoose.model("Notification");

// ====================================================
// ======================  CRUD  ======================
// ====================================================

//Return the notification after his creation or return error
exports.createNotification = function(request, response){
    let new_notification = new Notification(request.body);
    new_notification.save(function(err, new_notification){
        if(err){
            response.send(err);
        }
        response.json(new_notification);
    });
}

//Return all the notification or an error
exports.getAllNotification = function(request, response){
    Notification.find({}, function(err, notifications){
        if(err){
            response.send(err);
        }
        response.json(notifications);
    })
}

//Return the notification find by id or an error
exports.getOneNotificationById = function(request, response){
    Notification.findById(request.params.notificationId, function(err, notification){
        if(err){
            response.send(err);
        }
        response.json(notification);
    });
}

//Return a notification after it update
exports.updateNotification = function(request, response){
    Notification.findByIdAndUpdate({_id:request.params.notificationId}, request.body, {new : true}, function(err, notification){
        if(err){
            response.send(err);
        }
        response.json(notification);
    });
}


exports.deleteNotification = function(request, response){
    Notification.remove({_id:request.params.notificationId}, function(err, notification){
        if(err){
            response.send(err);
        }
        response.json({success:true, message:"Notification deleted"});
    });
}

// =====================================================
// =================  Other function  ==================
// =====================================================