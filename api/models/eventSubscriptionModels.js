'use strict';

// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Declaring EventSubscription schema
var EventSubSchema = new Schema({
    dateSub : {
        type : Date,
        default : Date.now
    },
    userSub : {
        type : Schema.Types.ObjectId,
        ref : 'Users'
    },
    eventSub : {
        type : Schema.Types.ObjectId,
        ref : 'Event'
    },
    status : String
});

//TODO : ajouter une vérification que l'utilisateur n'est pas inscrit à un event au même moment
EventSubSchema.pre('save', function(next){
    next();
});

// =====================================================
// =================  Custom function  =================
// =====================================================

//Function that valid a subscription to an event
//TODO : coder la fonction de validation d'une inscription
EventSubSchema.validSubscription = function(){

}

//Function that cancel a subscription
//TODO : coder la fonction d'annulation d'une inscription
EventSubSchema.CancelSubscription = function(){

}

//Export model
module.exports = mongoose.model('EventSubscription', EventSubSchema);