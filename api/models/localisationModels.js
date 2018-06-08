'use strict';

// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Declaring Localisation shcema
var LocalisationSchema = new Schema({
    lat : String,
    Long : String,
    adress : String,
    zip : String,
    city : String,
    country : String,
    name : String,
})


//TODO : ajouter les validations de données
LocalisationSchema.pre('save', function(next){
    next();
});

// =====================================================
// =================  Custom function  =================
// =====================================================


//Export model
module.exports = mongoose.model('Localisation', LocalisationSchema);