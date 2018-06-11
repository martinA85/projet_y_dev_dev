'use strict';

var mongoose = require('mongoose');
var EventType = mongoose.model('EventType');

// ====================================================
// ======================  CRUD  ======================
// ====================================================

// Return the eventType after his creation or return error
exports.createEventType = function (request, response) {
    let new_eventType = new EventType(request.body);
    new_eventType.save(function (err, new_eventType) {
        if (err) {
            response.send(err);
        }
        response.json(new_eventType);
    });
};

// Return a liste of eventType or return error
exports.getAllEventTypes = function (request, response) {
    EventType.find({}, function (err, eventType) {
        if (err) {
            response.send(err)
        }
        response.json(eventType)
    });
};

// Return one eventType find by his id or return error
exports.getEventTypeById = function (request, response) {
    EventType.findById(request.parmas.eventTypeId, function (err, eventType) {
        if (err) {
            response.send(err);
        }
        response.json(eventType);
    });
};

// Returne the evnetType updated or error
exports.updateEventType = function (request, response) {
    EventType.findByIdAndUpdate({ _id: request.parmas.eventTypeId }, request.body, { new: true }, function (err, eventType) {
        if (err) {
            response.send(err);
        }
        response.json(eventType);
    });
};

// Return message if deletion is a success or return error
exports.deleteEventType = function (request, response) {
    EventType.remove({ _id: request.parmas.eventTypeId }, function (err, eventType) {
        if (err) {
            response.send(err);
        }
        response.json({ success: true, message: 'Event Type deleted' });
    });
};