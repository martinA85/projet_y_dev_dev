//Package import
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var morgan = require("morgan");
var mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
var config = require("./config");
var Users = require('./api/models/usersModels')

//exporting variable
module.exports.jwt = jwt;
module.exports.app = app;

//Configuration
var port = process.env.PORT || 3000;
mongoose.Promise = global.Promise;
mongoose.connect(config.database);
app.set('superSecret', config.secret);

//setting up body-parser
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(function(request, response, next){
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Morgan for log
app.use(morgan('dev'));

//Basic route
app.get('/', function(req, res) {
    res.send('Hello, there is nothing here ;)');
});

//setting up routes
var routes = require('./api/routes/usersRoutes'); //importing route
routes(app, jwt); //register the route

//start server
app.listen(port);
console.log(Date.now + ': server started on port : ' + port)
