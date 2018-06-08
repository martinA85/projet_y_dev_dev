'use strict';

// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Declaring Interest schema
var InterestSchema = new Schema({
    user : {
        type : Schema.Types.ObjectId,
        ref : 'Users'
    },
    tag : {
        type : Schema.Types.ObjectId,
        ref : 'Tag'
    }
});

//TODO : ajouter les vérifications
InterestSchema.pre('save', function(next){
    next();
})

// =====================================================
// =================  Custom function  =================
// =====================================================



//Export model
module.exports = mongoose.model('Interest', InterestSchema);