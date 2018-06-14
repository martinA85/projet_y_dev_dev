'use strict';

// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Declaring Event schema
var EventSchema = new Schema({
    title : String,
    dateEvent : Date,
    subscription : Boolean,
    description : String,
    picture : String,
    maxAttendees : String,
    creator : {
        type : Schema.Types.ObjectId,
        ref: 'Users'
    },
    comments : [{
        body : String,
        date : Date,
        author : {
            type : Schema.Types.ObjectId,
            ref: 'Users'
        }
    }],
    rates : [{
        rate : Number,
        date : Date,
        author : {
            type : Schema.Types.ObjectId,
            ref: 'Users'
        }
    }],
    validations : [{
        user : {
            type : Schema.Types.ObjectId,
            ref: 'Users'
        }
    }],
    isEnd : {
        type : Boolean,
        default : false
    },
    startDate : Date,
    endDate : Date,
    createDate : {
        type : Date,
        default : Date.now
    },
    updateDate : Date,
    coordinates : {
        lat : Number,
        long : Number
    },
    localisation : {
        type : Schema.Types.ObjectId,
        ref: 'Localisation' 
    }

});

EventSchema.pre('save', function(next){

    let now = new Date();

    this.updateDate = now;

    next();
})

// =====================================================
// =================  Custom function  =================
// =====================================================

//Function that add a validation to the event
//TODO : coder la fonction d'ajout d'une validation à un event
EventSchema.validEvent = function(){

}

//function that end the event
//TODO : coder la fonction de fin d'un event
EventSchema.finishEvent = function(){

}

//Function that add a rate to an event
//TODO : coder la fonction d'ajout d'une notation à un event
EventSchema.rateEvent = function(){

}

//function that add a comment to an event
//TODO : coder la fonction d'ajout d'un commentaire à un event
EventSchema.commentEvent = function(){

}

//function that add an event's pic
//TODO : coder la fonction
EventSchema.uploadPic = function(){

}

//Export model
module.exports = mongoose.model('Event', EventSchema);