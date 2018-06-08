'use strict';

// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//creating Tags schema
var TagsSchema = new Schema({
    tagName : String
});

//Export model
module.exports = mongoose.model('Tag', TagsSchema);