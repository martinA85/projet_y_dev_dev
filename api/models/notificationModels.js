'use strict';

// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Creating Notification Schema
var NotificationsSchema = new Schema({
    message : String,
    user : {
        type : Schema.Types.ObjectId,
        ref: 'Users'
    },
    event : {
        type : Schema.Types.ObjectId,
        ref : 'Event'
    },
    createDate : {
        type : Date,
        default : Date.now
    },
    updateDate : Date
});

NotificationsSchema.pre('save', function(next){
    let now = new Date();

    this.updateDate = now;

    next();
})

// =====================================================
// =================  Custom function  =================
// =====================================================



//Export model
module.exports = mongoose.model('Notification', NotificationsSchema);