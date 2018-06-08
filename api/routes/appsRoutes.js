'use strict';

module.exports = function(app, jwt){
    var users = require('../controllers/usersController');
    var auth = require('../controllers/authController');
    var event = require('../controllers/eventController')
    var tag = require('../controllers/tagsController')
    var eventSub = require('../controllers/eventSubscriptionController');
    var interest = require('../controllers/InterestController');
    var localisation = require('../controllers/localisationController');
    var notification = require('../controllers/NotificationControllers');
    
    //route before middleware
    app.route('/auth').post(auth.authentificate);
    app.route('/users').post(users.createUser);

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

    //Event routes
    app.route('/event').post(event.createEvent).get(event.getAllEvent);
    app.route('/event/:eventId').get(event.getEventById).put(event.updateEvent).delete(event.deleteEvent);

    //Tags routes
    app.route('/tag').post(tag.createTag).get(tag.getAllTags);
    app.route('/tag/:tagId').get(tag.getTagById).put(tag.updateTag).delete(tag.deleteEvent);

    //Event Subscription routes
    app.route('/eventSub').post(eventSub.createEventSubscription).get(eventSub.GetAllSubscription);
    app.route('/eventSub/:eventSubId').get(eventSub.getEventSubById).put(eventSub.updateEventSubscription).delete(eventSub.deleteEventSubscription);

    //Interest routes
    app.route('/interest').post(interest.createInterest).get(interest.getAllInterest);
    app.route('/interest/:interestId').get(interest.getInterestById).delete(interest.deleteInterest);

    //Localisation routes
    app.route('/localisation').post(localisation.createLocalisation).get(localisation.getAllLocation);
    app.route('/localisation/:locId').get(localisation.getOneLocation).put(localisation.updateLocation).delete(localisation.deleteLocation);

    app.route('/notification').post(notification.createNotification).get(notification.getAllNotification);
    app.route('/notification/:notificationId').get(notification.getOneNotificationById).put(notification.updateNotification).delete(notification.deleteNotification);
}