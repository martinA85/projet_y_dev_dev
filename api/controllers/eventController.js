//Doc snippet

/**
 * @apiDefine EventObject
 * @apiSuccessExample Sucess-response
 * Example of event object
 * {
        "coordinates": {
            "lat": 47,
            "long": -1
        },
        "options": {
            "subValided": false,
            "hideAddr": false,
            "subscription": false
        },
        "isEnd": false,
        "_id": "5b2212a502d86b09906d2a92",
        "title": "Event 1",
        "creator": "5b1e4459b7b49e2d8cadae4a",
        "comments": [],
        "rates": [],
        "validations": [],
        "createDate": "2018-06-14T07:00:53.021Z",
        "updateDate": "2018-06-14T07:00:53.027Z",
        "__v": 0
    }
 */

 /**
  * @apiDefine paramEventId
  * @apiParam {String} :eventId Event unique id (_id)
  */



'use strict';

var mongoose =require("mongoose");
var Event = mongoose.model("Event");
var rad2deg = require('rad2deg');
var deg2rad = require('deg2rad');
var geoUtils = require('../utilis/geoUtils')
var fs = require('fs');
var eventUtils = require('../utilis/eventUtils');

// ====================================================
// ======================  CRUD  ======================
// ====================================================

/**
 * @api {POST} /event Creating new Event
 * @apiName CreateEvent
 * @apiGroup Event
 * @apiParam {Event} Event
 * @apiParamExample {json} Event
 * {
        "coordinates": {
            "lat": 47,
            "long": -1
        },
        "options": {
            "subValided": false,
            "hideAddr": false,
            "subscription": false
        },
        "isEnd": false,
        "title": "Event 1",
        "comments": [],
        "rates": [],
        "validations": [],
        "createDate": "2018-06-14T07:00:53.021Z",
        "updateDate": "2018-06-14T07:00:53.027Z",
        "__v": 0
    }
 *
 * @apiSuccess {Event} new_event after it creation
 * @apiUse EventObject
 */

exports.createEvent = function(request, response){
    let new_event = new Event(request.body);
    new_event.save(function(err, new_event){
        if(err){
            response.send(err)
        }
        response.json(new_event);
    });
}

/**
 * @api {GET} /event Get all events
 * @apiName GetAllEvents
 * @apiGroup Event
 * 
 * @apiSuccess {ObjectList} Events List of all Events
 * @apiSuccessExample Sucess-Response
 * [{
        "coordinates": {
            "lat": 47,
            "long": -1
        },
        "options": {
            "subValided": false,
            "hideAddr": false,
            "subscription": false
        },
        "isEnd": false,
        "title": "Event 1",
        "comments": [],
        "rates": [],
        "validations": [],
        "createDate": "2018-06-14T07:00:53.021Z",
        "updateDate": "2018-06-14T07:00:53.027Z",
        "__v": 0
    }]
 */
exports.getAllEvent = function(request, response){
    Event.find({}, function(err, events){
        if(err){
            response.send(err);
        }
        response.json(events);
    });
}

/**
 * @api {GET} /event/:eventId Get one event by his id 
 * @apiName GetEventById
 * @apiGroup Event
 * @apiUse paramEventId
 * 
 * @apiUse EventObject
 */
exports.getEventById = function(request, response){
    Event.findById(request.params.eventId, function(err, event){
        if(err){
            response.send(err);
        }
        response.json(event);
    });
}

/**
 * @api {PUT} /event/:eventId Update one event by his id 
 * @apiName UpdateEvent
 * @apiGroup Event
 * @apiUse paramEventId
 * 
 * @apiUse EventObject
 */
exports.updateEvent = function(request, response){
    Event.findByIdAndUpdate({_id:request.params.eventId}, request.body, {new : true}, function(err, event){
        if(err){
            response.send(err);
        }
        response.json(event);
    });
}

/**
 * @api {DELETE} /event/:eventId Delete one event by his id 
 * @apiName DeleteEvent
 * @apiGroup Event
 * @apiUse paramEventId
 * 
 * @apiSuccess {Boolean} success success state
 * @apiSuccess {String} message Message with the success
 * 
 * @apiSuccessExample Success-Response:
 *  {
 *      success : true,
 *      message : "Event deleted"
 *  }
 */
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


/**
 * @api {GET} /event/:lat/:long/:radius get all event in certain radius
 * @apiName GetEventWithRadius
 * @apiGroup Event
 * @apiParam {Int} :radius radius for event
 * @apiParam {Int} :lat user latitude
 * @apiParam {Int} :long user longitude
 * 
 * @apiSuccess {ObjectList} Events List of Events
 * @apiSuccessExample Sucess-Response
 * [{
        "coordinates": {
            "lat": 47,
            "long": -1
        },
        "options": {
            "subValided": false,
            "hideAddr": false,
            "subscription": false
        },
        "isEnd": false,
        "title": "Event 1",
        "comments": [],
        "rates": [],
        "validations": [],
        "createDate": "2018-06-14T07:00:53.021Z",
        "updateDate": "2018-06-14T07:00:53.027Z",
        "__v": 0
    }]
 */
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
        { 'coordinates.long' : {$gte: minLong, $lte: maxLong}},
        { 'isEnd' : false}
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

/**
 * @api {POST} /event/comment/:userId/:eventId add a comment to an event
 * @apiName CommentEvent
 * @apiGroup Event
 * @apiParam {String} :userId id of the user that post the comment
 * @apiParam {String} :eventId id of the event to comment
 * @apiParam {Comment} comment Comment object to post
 * @apiParamExample {Comment} Comment
 * {
 *      body : "ceci est un commentaire",
 *      author : "_id author"
 * }
 * 
 * @apiSuccess {String} message Sucess Message
 * @apiSuccessExample Success-Response:
 * {
 *      success : true,
 *      message : "comment added"
 * }
 */
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

/**
 * @TODO : faire en sorte que le nom de l'image soit eventId.format
 * @api {POST} /event/image/:eventId upload image for one event
 * @apiName UploadImageEvent
 * @apiGroup Event
 * @apiUse paramEventId
 * @apiParam {Binary} image Image to upload as event image
 * 
 * @apiSuccess {Boolean} success success state
 * @apiSuccess {String} message Message with the success
 * @apiSuccessExample Success-Response:
 *  {
 *      success : true,
 *      message : "Image uploaded"
 *  }
 */
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


/**
 * @api {GET} /event/image/:userId Get image for one event
 * @apiName GetEventImage
 * @apiGroup Event
 * @apiUse paramEventId
 * 
 * @apiSuccess {Binary} Image user's Image
 */
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

/**
 * @TODO faire en sorte qu'un utilisateur ne puisse pas valider 2 fois le même event
 * @api {GET} /valid/event/:userId/:eventId Add a validation to an event
 * @apiName ValidEvent
 * @apiGroup Event
 * @apiUse paramEventId
 * @apiParam {String} :userId user's id
 * 
 * @apiSuccess {Boolean} success success state
 * @apiSuccess {String} message Message returned
 * @apiSuccessExample Success-Response:
 * {
 *      success : true,
 *      message : "Validation registered"
 * }
 */
exports.validEvent = function(request, response){
    Event.findById(request.params.eventId, function(err, event){
        if(err){
            response.send(err);
        }
        event.validations.push({user : request.params.userId, good : true});
        event.save(function(err, event){
            if(err){
                response.send(err);
            }
            response.json({success:true, message:"Validation registerd"});
        })
    });
}


/**
 * @TODO faire en sorte qu'un utilisateur ne puisse pas invalider 2 fois le même event
 * @api {GET} /invalid/event/:userId/:eventId Add a validation to an event
 * @apiName InvalidEvent
 * @apiGroup Event
 * @apiUse paramEventId
 * @apiParam {String} :userId user's id
 * 
 * @apiSuccess {Boolean} success success state
 * @apiSuccess {String} message Message returned
 * @apiSuccessExample Success-Response:
 * {
 *      success : true,
 *      message : "Invalidation registered"
 * }
 */
exports.invalidEvent = function(request, response){
    Event.findById(request.params.eventId, function(err, event){
        if(err){
            response.send(err);
        }
        event.validations.push({user : request.params.userId, good : false});
        event.save(function(err, event){
            if(err){
                response.send(err);
            }
            if(!eventUtils.checkIfValid(event.validations)){
                console.log('eventInvalid');
                event.isEnd = true;
                event.save(function(err, event){
                    if(err){
                        response.send(err);
                    }
                })
            }
            response.json({success:true, message:"invalidation registerd"});
        })
    });
}


/**
 * @api {GET} /end/event/:eventId/:userId Set an event as finished
 * @apiName FinishEvent
 * @apiGroup Event
 * @apiUse paramEventId
 * @apiParam {String} :userId user's id, must be the event's creator id
 * 
 * @apiSuccess {Boolean} success Success status
 * @apiSuccess {String} message Message returned
 * {
 *      success : true,
 *      message : "Event Set as finish"
 * }
 */
exports.finishEvent = function(request, response){
    let eventId = request.params.eventId;
    let userId = request.params.userId;

    Event.findById(eventId, function(err, event){
        if(err){
            res.send(err);
        }
        if(event.creator == userId){
            event.isEnd = true;
            event.save(function(err, event){
                if(err){
                    res.send(err);
                }
                response.json({success:true,message:'Event set as finish'});
            });
        }
    });
}