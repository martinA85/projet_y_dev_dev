'use strict';

var mongoose =require("mongoose");
var Event = mongoose.model("Event");

// ====================================================
// ======================  CRUD  ======================
// ====================================================

//Return the event after his creation or return error
exports.createEvent = function(request, response){
    let new_event = new Event(request.body);
    new_event.save(function(err, new_event){
        if(err){
            response.send(err)
        }
        response.json(new_event);
    });
}

//return a list of event or return error
exports.getAllEvent = function(request, response){
    Event.find({}, function(err, users){
        if(err){
            response.send(err);
        }
        response.json(users);
    });
}

//Return one event find by his id or return error
exports.getEventById = function(request, response){
    Event.findById(request.params.eventId, function(err, event){
        if(err){
            response.send(err);
        }
        response.json(event);
    });
}

//Returne the event updated or return error
exports.updateEvent = function(request, response){
    Event.findByIdAndUpdate({_id:request.params.eventId}, request.body, {new : true}, function(err, event){
        if(err){
            response.send(err);
        }
        response.json(event);
    });
}

//return message if deletion is a success or return error
exports.deleteEvent = function(request, response){
    Event.remove({_id:request.params.eventId}, function(err, event){
        if(err){
            response.send(err);
        }
        response.json({success:true, message:"Event deleted"})
    })
}


// =====================================================
// =================  Other function  ==================
// =====================================================