'use strict';

var mongoose =require("mongoose");
var Event = mongoose.model("Event");
var EventSub = mongoose.model("EventSubscription");

// ====================================================
// ======================  CRUD  ======================
// ====================================================

//Return the subscription after his creation or error
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

//Return evry subscriptions to event or error
exports.GetAllSubscription = function(request, response){
    EventSub.find({}, function(err, eventSubs){
        if(err){
            response.send(err);
        }
        response.json(eventSubs);
    })
}

//Retrun one event subscription by his id or error
exports.getEventSubById = function(request, response){
    EventSub.findById(request.params.eventSubId, function(err, eventSub){
        if(err){
            response.send(err);
        }
        response.json(eventSub);
    })
}

//return eventSubscription after his update or error
exports.updateEventSubscription = function(request, response){
    EventSub.findByIdAndUpdate({_id:request.params.eventSubId}, {new : true}, function(err, eventSubscription){
        if(err){
            response.send(err);
        }
        response.json(eventSubscription);
    });
}

//Return message if success or error
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

//function that valid a subscription to an event
exports.validSubscription = function(request, response){
    EventSub.findById(request.params.eventSubId, function(err, eventSub){
        if(err){
            response.send(err);
        }
        Event.findById(eventSub.eventSub, function(err, event){
            let response_msg = ""
            if(event.creator == request.params.userId){
                eventSub.status = "valid";
                response_msg = {success:false, message:"Subscription valided"}
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



//function that invalid a subscription to an event
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