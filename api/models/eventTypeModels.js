// QUESTION : Type d'évenement "pro" ou "particulier" ? Si oui, booleen eventModel ?
'use strict';

// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// Declaring Event schema
var EventTypeSchema = new Schema({
    title: String,
    createDate: Date,
    updateDate: Date
});

EventTypeSchema.pre('save', function (next) {

    let now = new Date();

    this.updateDate = now;

    next();
});

// =====================================================
// =================  Custom function  =================
// =====================================================

// Export mode
module.exports = mongoose.model('EventType', EventTypeSchema);