'use strict';

// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Creating user Schema
var UsersSchema = new Schema({
    name : String,
    password : String,
    token : {
        type: String,
        default: ""
    }
})

module.exports = mongoose.model('Users', UsersSchema);

var User = mongoose.model('Users')

module.exports.createUser = function(data){
    let new_user = new User(data);
    new_user.save(function(err, user){
        if(err){
            return err;
        }
        return user;
    });
}