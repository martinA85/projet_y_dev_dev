'use strict';

// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Creating user Schema
var UsersSchema = new Schema({
    name : String,
    firstName : String,
    isCompany : Boolean,
    companyName : String,
    description : String,
    email : String,
    password : String,
    token : {
        type: String,
        default: ""
    },
    createDate : {
        type : Date,
        default : Date.now
    },
    updateDate : Date,
    connection_type : String,
    status : String

})

//Pre save function : data validation, updating updateDate field
UsersSchema.pre('save', function(next){

    let now = new Date();

    this.updateDate = now;

    next();
})

// =====================================================
// =================  Custom function  =================
// =====================================================

//TODO : ce rappeler à quoi sert cette fonction et la coder
UsersSchema.methods.isValid = function(){

}


module.exports = mongoose.model('Users', UsersSchema);