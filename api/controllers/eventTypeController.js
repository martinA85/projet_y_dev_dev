//Doc Snippet

/**
 * @apiDefine EventTypeObject
 * @apiSuccess {EventType} EventType EventType Object
 * @apiSuccessExample Success-response
 * {
 *      title : "EventType"
 * }
 */

 /**
  * @apiDefine paramEventTypeId
  * @apiParam {String} :eventTypeId EventType unique id (_id)
  */

'use strict';

var mongoose = require('mongoose');
var EventType = mongoose.model('EventType');

// ====================================================
// ======================  CRUD  ======================
// ====================================================

/**
 * @api {POST} /eventType Creating new EventType
 * @apiName CreateEventType
 * @apiGroup EventType
 * @apiParam {EventType} EventType EventType object to create
 * @apiParamExample {EventType} EventType
 * {
 *      title : "Event title"
 * }
 * @apiUse EventTypeObject
 */
exports.createEventType = function (request, response) {
    let new_eventType = new EventType(request.body);
    new_eventType.save(function (err, new_eventType) {
        if (err) {
            response.send(err);
        }
        response.json(new_eventType);
    });
};

/**
 * @api {GET} /eventType Getting all EventTypes
 * @apiName GetAllEventTypes
 * @apiGroup EventType
 * @apiSuccess {ObjectList} EventTypes List of all EventTypes
 * @apiSuccessExample Success-response
 * [
*   {
*          title : "Event Title"
*   }
 * ]
 */
exports.getAllEventTypes = function (request, response) {
    EventType.find({}, function (err, eventType) {
        if (err) {
            response.send(err)
        }
        response.json(eventType)
    });
};

/**
 * @api {GET} /eventType/:eventTypeId getting one EventType
 * @apiName GetEventTypeById
 * @apiGroup EventType
 * @apiUse paramEventTypeId
 * @apiUse EventTypeObject
 */
exports.getEventTypeById = function (request, response) {
    EventType.findById(request.parmas.eventTypeId, function (err, eventType) {
        if (err) {
            response.send(err);
        }
        response.json(eventType);
    });
};

/**
 * @api {PUT} /eventType/:eventTypeId Updating one EventType
 * @apiName UpdateEventType
 * @apiGroup EventType
 * @apiUse paramEventTypeId
 * @apiParam {EventType} EventType New data to put in the eventType
 * @apiUse EventTypeObject
 */
exports.updateEventType = function (request, response) {
    EventType.findByIdAndUpdate({ _id: request.parmas.eventTypeId }, request.body, { new: true }, function (err, eventType) {
        if (err) {
            response.send(err);
        }
        response.json(eventType);
    });
};

/**
 * @api {DELETE} /eventType/:eventTypeId getting one EventType
 * @apiName DeleteEventType
 * @apiGroup EventType
 * @apiUse paramEventTypeId
 * @apiSuccess {Boolean} success Success State
 * @apiSuccess {String} message Message Returned
 * @apiSuccessExample Success-Response
 * {
 *      success : True,
 *      message : "Event Type Deleted"
 * }
 */
exports.deleteEventType = function (request, response) {
    EventType.remove({ _id: request.parmas.eventTypeId }, function (err, eventType) {
        if (err) {
            response.send(err);
        }
        response.json({ success: true, message: 'Event Type deleted' });
    });
};