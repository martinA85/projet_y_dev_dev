//Doc snippet

/**
 * @apiDefine NotificationObject
 * @apiSuccess {Notification} Notification Notification Object
 * @apiSuccessExample Success-Response
 * {
 *      message : "MESSAGE",
 *      event : "eventId"
 * }
 */

/**
 * @apiDefine paramNotificationId
 * @apiParam {String} :notificationId Notification unique id (_id)
 */


'use strict';

var mongoose =require("mongoose");
var Notification = mongoose.model("Notification");
var notifSocket = require('../sockets/notificationSocket');

// ====================================================
// ======================  CRUD  ======================
// ====================================================

/**
 * @api {POST} /notification Creating Notification
 * @apiDescription Note : Route inutile (c'est le serveur qui crée les notif pas le clients qui demande à les créer)
 * @apiName CreateNotification
 * @apiGroup Notification
 * @apiParam {Notification} Notification Notification Object to create
 * @apiParamExample Notifiaction
 * {
 *      message : "MESSAGE",
 * }
 * @apiUse NotificationObject
 */
exports.createNotification = function(request, response){
    let new_notification = new Notification(request.body);
    new_notification.save(function(err, new_notification){
        if(err){
            response.send(err);
        }
        response.json(new_notification);
    });
}

/**
 * @api {GET} /notification Getting all notification
 * @apiName GetAllNotification
 * @apiGroup Notification
 * @apiSuccess {ObjectList} Notifications List of all Notifications
 * @apiSuccessExample Success-response
 * [
 *  {
 *      message : "MESSAGE",
 *      event : "eventId"
 *  }
 * ]
 */
exports.getAllNotification = function(request, response){
    Notification.find({}, function(err, notifications){
        if(err){
            response.send(err);
        }
        response.json(notifications);
    })
}

/**
 * @api {GET} /notification/:notificationId Getting one notification
 * @apiName GetNotificationById
 * @apiGroup Notification
 * @apiUse paramNotificationId
 * @apiUse NotificationObject
 */
exports.getOneNotificationById = function(request, response){
    Notification.findById(request.params.notificationId, function(err, notification){
        if(err){
            response.send(err);
        }
        response.json(notification);
    });
}

/**
 * @api {PUT} /notification/:notificationId Update Notification
 * @apiName UpdateNotification
 * @apiGroup Notification
 * @apiUse paramNotificationId
 * @apiUse NotificationObject
 */
exports.updateNotification = function(request, response){
    Notification.findByIdAndUpdate({_id:request.params.notificationId}, request.body, {new : true}, function(err, notification){
        if(err){
            response.send(err);
        }
        response.json(notification);
    });
}

/**
 * @api {DELETE} /notification/:notificationId Delete notification
 * @apiName DeleteNotification
 * @apiGroup Notification
 * @apiUse paramNotificationId
 * @apiSuccess {Boolean} success Success Status
 * @apiSuccess {string} message Message returned
 * @apiSuccessExample Success-Response
 * {
 *      success : true
 *      message : "Notification deleted"
 * }
 */
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

exports.testNotif = function(request, response){
    var socketsId = request.body.socketsId;
    var notif = "hello world 3.0";
    notifSocket.sendNotificationToUser(socketsId,notif, function(result){
        if(result){
            response.send('notif not recieve.');
        }else{
            response.send('notif send succefully.');
        }
    });
}