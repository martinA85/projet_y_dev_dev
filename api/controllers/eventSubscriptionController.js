//Doc Snippet

/**
 * @apiDefine EventSubscriptionObject
 * @apiSuccess {EventSubscription} EventSubscription EventSubscription Object
 * @apiSuccessExample Success-response
 * Example of eventSubscriptionObject
 * {
 *      dateSub : 30-04-1996,
 *      userSub : "userId",
 *      eventSub : "eventId",
 *      status : "valid / waiting / invalid" //dependaing the event options
 * }
 */

 /**
  * @apiDefine paramEventSubObject
  * @apiParam {String} :eventSubId Event Subscription unique id (_id)
  */

  /**
   * @apiDefine returnMessage
   * @apiSuccess {Boolean} success Success status
   * @apiSuccess {Message} message Message returned
   */

'use strict';

var mongoose =require("mongoose");
var Event = mongoose.model("Event");
var EventSub = mongoose.model("EventSubscription");

// ====================================================
// ======================  CRUD  ======================
// ====================================================

/**
 * @api {POST} /eventSub Creating new EventSubscription
 * @apiName CreateEventSubscription
 * @apiGroup EventSubscription
 * @apiParam {EventSubscription} EventSub Event sub object to create
 * @apiParamExample {EventSubscription} EventSu
 * {
 *      userSub : "userId",
 *      eventSub : "eventId",
 * }
 * 
 * @apiUse EventSubscriptionObject
 */
exports.createEventSubscription = function(request, response){
    let new_subscription = new EventSub(request.body);
    new_subscription.save(function(err, new_subscription){
        if(err){
            response.send(err);
        }
        Event.findById(new_subscription.eventSub, function(err, event){
            if(err){
                response.send(err);
            }
            let response_msg;
            if(event.options.subValided){
                new_subscription.status = "wating";
                response_msg = {success : true, message:"Subscription registered, waiting for organizator validation"}
            }else{
                new_subscription.status = "valid";
                response_msg = {success : true, message:"Subscription registered"}
            }
            new_subscription.save(function(err, subscription){
                response.json(response_msg);
            });
        });
    });
}

/**
 * @api {GET} /eventSub Getting all EventSubscription
 * @apiName GetAllEventSubscription
 * @apiGroup EventSubscription
 * @apiSuccess {ObjectList} EventSubscriptions List of all event subscription
 * @apiSuccessExample Success-Response
 * [{
 *      dateSub : 30-04-1996,
 *      userSub : "userId",
 *      eventSub : "eventId",
 *      status : "valid / waiting / invalid" //dependaing the event options
 * }]
 */
exports.GetAllSubscription = function(request, response){
    EventSub.find({}, function(err, eventSubs){
        if(err){
            response.send(err);
        }
        response.json(eventSubs);
    })
}

/**
 * @api {GET} /eventSub/:eventSubId Getting one eventSubscription by Id
 * @apiName GetEventSubById
 * @apiGroup EventSubscription
 * @apiUse paramEventSubObject
 * @apiUse EventSubscriptionObject
 */
exports.getEventSubById = function(request, response){
    EventSub.findById(request.params.eventSubId, function(err, eventSub){
        if(err){
            response.send(err);
        }
        response.json(eventSub);
    })
}

/**
 * @api {PUT} /eventSub/:eventSubId Updating one eventSubscription
 * @apiName UpdateSubscription
 * @apiGroup EventSubscription
 * @apiUse paramEventSubObject
 * @apiParam {EventSubscription} EventSubscription New data to put into this eventSubscriptionObject
 * @apiUse EventSubscriptionObject
 */
exports.updateEventSubscription = function(request, response){
    EventSub.findByIdAndUpdate({_id:request.params.eventSubId}, {new : true}, function(err, eventSubscription){
        if(err){
            response.send(err);
        }
        response.json(eventSubscription);
    });
}

/**
 * @api {DELETE} /eventSub/:eventSubId Deleting one eventSubscriptionId
 * @apiName DeleteEventSubscription
 * @apiGroup EventSubscription
 * @apiUse paramEventSubObject
 * @apiUse returnMessage
 * @apiSuccessExample Success-response
 * {
 *      success : true,
 *      message : "Subscription deleted"
 * }
 */
exports.deleteEventSubscription = function(request, response){
    EventSub.remove({_id:request.params.eventSubId}, function(err, eventSubscription){
        if(err){
            response.send(err);
        }
        response.json({success:true, message:"Subscription deleted"});
    })
}


// =====================================================
// =================  Other function  ==================
// =====================================================

/**
 * @api {GET} /valid/eventSub/:eventSubId/:userId Valid Subscription
 * @apiName ValidSubscription
 * @apiGroup EventSubscription
 * @apiDescription Function That valid a subscription, must be call by the event creator
 * @apiUse paramEventSubObject
 * @apiParam {String} :userId Must be the event's creator id
 * @apiUse returnMessage
 * @apiSuccessExample Success-Response
 * {
 *      success : True
 *      message : "Subscription valided"
 * }
 */
exports.validSubscription = function(request, response){
    EventSub.findById(request.params.eventSubId, function(err, eventSub){
        if(err){
            response.send(err);
        }
        Event.findById(eventSub.eventSub, function(err, event){
            let response_msg = ""
            if(event.creator == request.params.userId){
                eventSub.status = "valid";
                response_msg = {success:True, message:"Subscription valided"}
            }else{
                response_msg = {success:false, message:"Only event's creator can valid subscription"}
            }
            eventSub.save(function(err, eventSub){
                if(err){
                    response.send(err);
                }
                response.json(response_msg);
            });
        });
    })
}



/**
 * @api {GET} /invalid/eventSub/:eventSubId/:userId Invalid Subscription
 * @apiName InvalidSubscription
 * @apiGroup EventSubscription
 * @apiDescription Function That Invalid a subscription, must be call by the event creator
 * @apiUse paramEventSubObject
 * @apiParam {String} :userId Must be the event's creator id
 * @apiUse returnMessage
 * @apiSuccessExample Success-Response
 * {
 *      success : True
 *      message : "Subscription valided"
 * }
 */
exports.invalidSubscription = function(request, response){
    EventSub.findById(request.params.eventSubId, function(err, eventSub){
        if(err){
            response.send(err);
        }
        Event.findById(eventSub.eventSub, function(err, event){
            let response_msg = ""
            if(event.creator == request.params.userId){
                eventSub.status = "Invalid";
                response_msg = {success:false, message:"Subscription invalided"}
            }else{
                response_msg = {success:false, message:"Only event's creator can invalid subscription"}
            }
            eventSub.save(function(err, eventSub){
                if(err){
                    response.send(err);
                }
                response.json(response_msg);
            });
        });
    })
}