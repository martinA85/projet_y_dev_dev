'use strict';

var mongoose =require("mongoose");
var EventSub = mongoose.model("EventSubscription");

// ====================================================
// ======================  CRUD  ======================
// ====================================================

//Return the subscription after his creation or error
exports.createEventSubscription = function(request, response){
    let new_subscription = new EventSub(request.body);
    new_subscription.save(function(err, new_subscription){
        console.log("sav done");
        if(err){
            console.log(err)
            response.send(err);
        }
        console.log(new_subscription);
        response.json(new_subscription);
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