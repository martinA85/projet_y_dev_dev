'use strict';

// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// Declariong Report Type Schema
var ReportTypeSchema = Schema({
    title: String,
    createDate: Date,
    updateDate: Date
});

ReportTypeSchema.pre('save', function (next) {
    
    let now = new Date();
    
    this.updateDate = now;
    
    next();
});

// =====================================================
// =================  Custom function  =================
// =====================================================

// Export mode
module.exports = mongoose.model('ReportType', ReportTypeSchema);