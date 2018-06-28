//Doc Snippet

/**
 * @apiDefine EventTagObject
 * @apiSuccess {EventTags} EventTags EventTags object
 * @apiSuccessExample Success-Response
 * {
 *      event : "eventId",
 *      tags : [
 *                  tag : "tagid"
 *             ]
 * }
 */

/**
 * @apiDefine paramEventTagId
 * @apiParam {String} :eventTagId EventTag unique id (_id)
 */

'use strict';

var mongoos = require('mongoose');
var EventsTags = mongoos.model('EventsTags');


// ====================================================
// ======================  CRUD  ======================
// ====================================================

/**
 * @api {POST} /eventsTags Creating new EventTag
 * @apiName CreateEventTag
 * @apiGroup EventTag
 * @apiParam {EventTag} EventTag
 * @apiParamExample {json} EventTag
 * {
 *      event : "eventId",
 *      tags : [
 *                  tag : "tagid"
 *             ]
 * }
 */
exports.createEventsTags = function (request, response) {
    let new_eventsTags = new EventsTags(request.body);
    new_eventsTags.save(function (err, new_eventsTags) {
        if (err) {
            response.send(err);
        }
        response.json(new_eventsTags);
    });
};

/**
 * @api {GET} /eventsTags Getting all EventsTags
 * @apiName GetAllEventTags
 * @apiGroup EventTag
 * 
 * @apiSuccess {ObjectList}  EventTags List of all EventTags object
 * @apiSuccessExample Success-Response
 * [{
 *      event : "eventId",
 *      tags : [
 *                  tag:"tagid"
 *             ]
 * }]
 */
exports.getAllEventsTags = function (request, response) {
    EventsTags.find({}, function (err, eventsTags) {
        if (err) {
            response.send(err);
        }
        response.json(eventsTags);
    });
};

/**
 * @api {GET} /eventsTags/:eventsTagsId Get EventTags by id
 * @apiName GetEventsTagsById
 * @apiGroup EventTag
 * @apiUse paramEventTagId
 * @apiUse EventTagObject
 */
exports.getEventsTagsById = function (request, response) {
    EventsTags.findById(request.params.eventsTagsId, function (err, eventsTags) {
        if (err) {
            response.send(err);
        }
        response.json(eventsTags);
    })
}

/**
 * @api {PUT} /eventsTags/:eventsTagsId Update Event Tags
 * @apiName UpdateEventTags
 * @apiGroup EventTag
 * @apiUse paramEventTagId
 * @apiParam {EventTags} new eventTags Object
 * @apiUse EventTagObject
 */
exports.updateEventsTags = function (request, response) {
    EventsTags.findByIdAndUpdate({ _id: request.params.eventsTagsId }, request.body, { new: true }, function (err, eventsTags) {
        if (err) {
            response.send(err);
        }
        response.json(eventsTags);
    });
};

/**
 * @api {DELETE} /eventsTags/:eventsTagsId Delete Event Tags
 * @apiName DeleteEventTags
 * @apiGroup EventTag
 * @apiUse paramEventTagId
 * @apiSuccess {Boolean} success Success state
 * @apiSuccess {String} message Message returned
 * @apiSuccessExample Success-Response
 * {
 *      success : true,
 *      message : "EventTags deleted"
 * }
 */
exports.deleteEventsTags = function (request, response) {
    EventsTags.findByIdAndRemove({ _id: request.params.eventsTagsId }, function (err, eventsTags) {
        if (err) {
            response.send(err);
        }
        response.json({ success: true, message: 'EventTags deleted' });
    });
};
