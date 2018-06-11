'use strict';

// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Declaring EventsTags Schema
var EventsTagsSchema = new Schema({
    event: {
        type: Schema.Types.ObjectId,
        ref: 'Event'
    },
    tags: [{
        tag:{
            type: Schema.Types.ObjectId,
            ref: 'Tag'
        }
    }],
    createDate: Date,
    updateDate: Date
});

EventsTagsSchema.pre('save', function (next) {

    let now = new Date();

    this.updateDate = now;

    next();
});

// =====================================================
// =================  Custom function  =================
// =====================================================

//Export model
module.exports = mongoose.model('EventsTags', EventsTagsSchema);