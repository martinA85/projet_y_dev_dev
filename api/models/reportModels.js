'use strict';

// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Declaring Report Schema
var ReportSchema = new Schema({
    event: {
        type: Schema.Types.ObjectId,
        ref: 'Event'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    reporter: {
        //user that send the report
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    reportType: {
        type: Schema.Types.ObjectId,
        ref: 'ReportType'
    },
    Description: String,
    createDate: Date,
    updateDate: Date
});

ReportSchema.pre('save', function (next) {

    let now = new Date();

    this.updateDate = now;

    next();
})

// =====================================================
// =================  Custom function  =================
// =====================================================

//Export model
module.exports = mongoose.model('Report', ReportSchema);