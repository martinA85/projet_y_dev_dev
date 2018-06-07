'use strict';

module.exports = function(app, jwt){
    var users = require('../controllers/usersController');
    var auth = require('../controllers/authController');
    var event = require('../controllers/eventController')
    
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

}