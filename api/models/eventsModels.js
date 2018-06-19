'use strict';

// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Declaring Event schema
var EventSchema = new Schema({
    title : {
        type : String,
        required: true
    },
    dateEvent : Date,
    description : String,
    picture : String,
    maxAttendees : String,
    creator : {
        type : Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    comments : [{
        body : String,
        date : {
            type : Date,
            default : Date.now
        },
        author : {
            type : Schema.Types.ObjectId,
            ref: 'Users',
            required: true
        }
    }],
    rates : [{
        rate : Number,
        date : Date,
        author : {
            type : Schema.Types.ObjectId,
            ref: 'Users',
            required: true
        }
    }],
    validations : [{
        user : {
            type : Schema.Types.ObjectId,
            ref: 'Users',
            required: true
        },
        good :{
            type : Boolean,
            default : true
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
        lat : {
            type : Number,
            required: true
        },
        long : {
            type : Number,
            required: true
        }
    },
    localisation : {
        type : Schema.Types.ObjectId,
        ref: 'Localisation' 
    },
    isEnd : {
        type : Boolean,
        default : false
    },
    options : {
        subValided : {
            type : Boolean,
            default : false
        },
        hideAddr : {
            type : Boolean,
            default : false
        },
        subscription : {
            type : Boolean,
            default : false
        },
    }
});

EventSchema.pre('save', function(next){
    console.log("pre save");
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