'use strict';

var mongoos = require('mongoose');
var EventsTags = mongoos.model('EventsTags');


// ====================================================
// ======================  CRUD  ======================
// ====================================================

// Return the EventsTags after his creation or return error
exports.createEventsTags = function (request, response) {
    let new_eventsTags = new EventsTags(request.body);
    new_eventsTags.save(function (err, new_eventsTags) {
        if (err) {
            response.send(err);
        }
        response.json(new_eventsTags);
    });
};

// Return a liste of EventsTags or return error
exports.getAllEventsTags = function (request, response) {
    EventsTags.find({}, function (err, eventsTags) {
        if (err) {
            response.send(err);
        }
        response.json(eventsTags);
    });
};

// Return one EventsTags find by his id or return error
exports.getEventsTagsById = function (request, response) {
    EventsTags.findById(request.params.eventsTagsId, function (err, eventsTags) {
        if (err) {
            response.send(err);
        }
        response.json(eventsTags);
    })
}

// Returne the EventsTags updated or error
exports.updateEventsTags = function (request, response) {
    EventsTags.findByIdAndUpdate({ _id: request.params.eventsTagsId }, request.body, { new: true }, function (err, eventsTags) {
        if (err) {
            response.send(err);
        }
        response.json(eventsTags);
    });
};

// Return message if deletion is a success or return error
exports.deleteEventsTags = function (request, response) {
    EventsTags.findByIdAndRemove({ _id: request.params.eventsTagsId }, function (err, eventsTags) {
        if (err) {
            response.send(err);
        }
        response.json({ success: true, message: 'Report Type deleted' });
    });
};
