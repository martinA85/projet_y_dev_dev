//Package import
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var morgan = require("morgan");
var mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
var server = require('http').createServer(app).listen(8080);
var io = require("socket.io").listen(server);
var config = require("./config");
//TODO : externaliser
var Users = require('./api/models/usersModels');
var Events = require('./api/models/eventsModels');
var Tags = require('./api/models/tagsModels');
var EventSub = require('./api/models/eventSubscriptionModels');
var Interest = require('./api/models/interestModels');
var EventType = require('./api/models/eventTypeModels');
var Localisation = require('./api/models/localisationModels');
var Report = require('./api/models/reportModels');
var ReportType = require('./api/models/reportTypeModels');
var EventsTags = require('./api/models/eventsTagsModels');
var Notification = require('./api/models/notificationModels');


//exporting variable
module.exports = io;
module.exports.jwt = jwt;
module.exports.app = app;

var usersSocket = require('./api/sockets/usersSocket');

//Configuration
var port = process.env.PORT || 3000;
mongoose.Promise = global.Promise;
mongoose.connect(config.database);
app.set('superSecret', config.secret);

//setting up body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Morgan for log
app.use(morgan('dev'));


//Basic route
app.get('/', function (req, res) {
    res.send('vide');
});

//setting up routes
var routes = require('./api/routes/appsRoutes'); //importing route
routes(app, jwt); //register the route

//start server
app.listen(port);
console.log('server started on port : ' + port);
