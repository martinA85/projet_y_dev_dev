'use strict';

module.exports = function(app, jwt){
    var users = require('../controllers/usersController');
    var auth = require('../controllers/authController');
    var event = require('../controllers/eventController')
    var tag = require('../controllers/tagsController')
    var eventSub = require('../controllers/eventSubscriptionController');
    var interest = require('../controllers/InterestController');
    var localisation = require('../controllers/localisationController');
    var eventType = require('../controllers/eventTypeController');
    var report = require('../controllers/reportController');
    var reportType = require('../controllers/reportTypeController');
    var eventsTags = require('../controllers/eventsTagsController');
    var notification = require('../controllers/NotificationControllers');
    var category = require('../controllers/categoryController');
    
    //route before middleware
    app.route('/auth').post(auth.authentificate);
    app.route('/users').post(users.createUser);
    app.route('/sendNotif').post(notification.testNotif);
    
    //Middleware : check token
    //TODO : find a way to export it to a middleware file
    app.use(function(request, response, next){

        var token = request.body.token || request.query.token || request.headers['x-access-token'];

        if(token){
            jwt.verify(token, app.get('superSecret'), function(err, decoded){
                if(err){
                    return response.json({success: false, message: 'Failed to authentificate token.'});
                } else {
                    request.decoded = decoded;
                    next();
                }
            });
        }else{

            return response.status(403).send({
                success: false,
                message: 'No token provided'
            })
        }

    });

    //routes under middleware
    //User routes
    app.route('/users').get(users.getAllUsers);
    app.route('/users/:userId').get(users.getUserById).put(users.updateUser).delete(users.deleteUser);
    app.route('/users/image/:userId').post(users.uploadImage).get(users.getUserImage);

    //Event routes
    app.route('/event').post(event.createEvent).get(event.getAllEvent);
    app.route('/event/:eventId').get(event.getEventById).put(event.updateEvent).delete(event.deleteEvent);
    app.route('/event/:lat/:long/:radius').get(event.getEventWithRadius);
    app.route('/event/comment/:userId/:eventId').post(event.commentEvent);
    app.route('/event/image/:eventId').post(event.uploadEventImage).get(event.getEventImage);
    app.route('/valid/event/:userId/:eventId').get(event.validEvent);
    app.route('/invalid/event/:userId/:eventId').get(event.invalidEvent);
    app.route('/end/event/:eventId/:userId').get(event.finishEvent);

    //Tags routes
    app.route('/tag').post(tag.createTag).get(tag.getAllTags);
    app.route('/tag/:tagId').get(tag.getTagById).put(tag.updateTag).delete(tag.deleteEvent);

    //Event Subscription routes
    app.route('/eventSub').post(eventSub.createEventSubscription).get(eventSub.GetAllSubscription);
    app.route('/eventSub/:eventSubId').get(eventSub.getEventSubById).put(eventSub.updateEventSubscription).delete(eventSub.deleteEventSubscription);
    app.route('/valid/eventSub/:eventSubId/:userId').get(eventSub.validSubscription);
    app.route('/invalid/eventSub/:eventSubId/:userId').get(eventSub.invalidSubscription);

    //Interest routes
    app.route('/interest').post(interest.createInterest).get(interest.getAllInterest);
    app.route('/interest/:interestId').get(interest.getInterestById).delete(interest.deleteInterest);

    //Localisation routes
    app.route('/localisation').post(localisation.createLocalisation).get(localisation.getAllLocation);
    app.route('/localisation/:locId').get(localisation.getOneLocation).put(localisation.updateLocation).delete(localisation.deleteLocation);

    //EventType routes
    app.route('/eventType').post(eventType.createEventType).get(eventType.getAllEventTypes);
    app.route('/eventType/:eventTypeId').get(eventType.getEventTypeById).put(eventType.updateEventType).delete(eventType.deleteEventType);

    // Report routes
    app.route('/report').post(report.createReport).get(report.getAllReports);
    app.route('/report/:reportId').get(report.getReportById).put(report.updateReport).delete(report.deleteReport);

    // ReportType routes
    app.route('/reportType').post(reportType.createReportType).get(reportType.getAllReportType);
    app.route('/reportType/:reportTypeId').get(reportType.getReportTypeById).put(reportType.updateReportType).delete(reportType.deleteReportType);

    // EventsTags routes
    app.route('/eventsTags').post(eventsTags.createEventsTags).get(eventsTags.getAllEventsTags);
    app.route('/eventsTags/:eventsTagsId').get(eventsTags.getEventsTagsById).put(eventsTags.updateEventsTags).delete(eventsTags.deleteEventsTags);

    // Notificaiton routes
    app.route('/notification').post(notification.createNotification).get(notification.getAllNotification);
    app.route('/notification/:notificationId').get(notification.getOneNotificationById).put(notification.updateNotification).delete(notification.deleteNotification);

    //category routes
    app.route('/category').post(category.createCategory).get(category.getAllCategory);
    app.route('/category/:categoryId').get(category.getCategoryById).put(category.updateCategory).delete(category.deleteCategory);
}