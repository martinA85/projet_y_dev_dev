'use strict';

var mongoose =require("mongoose");
var Event = mongoose.model("Event");
var rad2deg = require('rad2deg');
var deg2rad = require('deg2rad');
var geoUtils = require('../utilis/geoUtils')
var fs = require('fs');

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
    Event.find({}, function(err, events){
        if(err){
            response.send(err);
        }
        response.json(events);
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
        response.json({success:true, message:"Event deleted"});
    })
}


// =====================================================
// =================  Other function  ==================
// =====================================================


//Function that return a list of event found by the position of the user and a radius
exports.getEventWithRadius = function(request, response){
    const ER = 6371;
    var radius = Number(request.params.radius);
    var lat = Number(request.params.lat);
    var long = Number(request.params.long);

    //Math var
    var acos = Math.acos;
    var cos = Math.cos;
    var sin = Math.sin;
    var asin = Math.asin

    var maxLat = lat + rad2deg(radius / ER);
    var minLat = lat - rad2deg(radius / ER);
    var maxLong = long + rad2deg(asin(radius/ER) / cos(deg2rad(lat)));
    var minLong = long - rad2deg(asin(radius/ER) / cos(deg2rad(lat)));

    Event.find({$and : [
        {'coordinates.lat' : {$gte: minLat, $lte: maxLat}},
        { 'coordinates.long' : {$gte: minLong, $lte: maxLong}}
    ]}, function(err, events){
        if(err){
            response.send(err);
        }
        var results = [];
        for(var i in events){
            let latEv = events[i].coordinates.lat;
            let longEv = events[i].coordinates.long;
            let dist = geoUtils.computeDistanceBetween2Point(lat, latEv, long, longEv);

            if(dist < radius){
                results.push(events[i])
            }
        }
        response.send(results);
    });
}

//return a message or error
exports.commentEvent = function(request, response){
    var userId = request.params.userId;
    var eventId = request.params.eventId;

    Event.findById(eventId, function(err, event){
        if(err){
            response.send(err);
        }
        if(event){
            let new_comment = {body : request.body.text,author : userId};
            event.comments.push(new_comment);
            event.save(function(err, event){
                if(err){
                    response.send(err);
                }
                response.json({success:true, message:"comment added"});
            });
        }
    })
}

//function that change Event image
exports.uploadEventImage = function(request, response){
    let image = false;
    try{
        image = request.files.image;
    }catch(err){
        response.send(err);
    }
    let eventId = request.params.eventId;

    Event.findById(eventId, function(err, event){
        if(err){
            response.send(err);
        }
        image.mv('./ressource/image/'+image.name, function(err){
            if(err){
                response.send(err);
            }
            event.picture = image.name;
            event.save(function(err, user){
                if(err){
                    response.send(err);
                }else{
                    response.json({success:true, message:"Image uploaded"});
                }
            });
        })
    });
}


//return the event image or error
exports.getEventImage = function(request, response){
    Event.findById(request.params.eventId, function(err, event){
        if(err){
            response.send(err);
        }
        if(event){
            let img = false;
            try{
                img = fs.readFileSync('./ressource/image/'+event.picture);
            }catch (err){
                response.send(err);
            }
            if(img){
                response.writeHead(200, {'Content-Type': 'image/gif' });
                response.end(img, 'binary');
            }
        }
    });
}