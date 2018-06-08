'use strict';

var mongoose =require("mongoose");
var Localisation = mongoose.model("Localisation");

// ====================================================
// ======================  CRUD  ======================
// ====================================================

//Return the localisation after his creation
exports.createLocalisation = function(request, response){
    let new_loc = new Localisation(request.body);
    new_loc.save(function(err, new_loc){
        if(err){
            response.send(err);
        }
        response.json(new_loc);
    })
}

//Return all the location
exports.getAllLocation = function(request, response){
    Localisation.find({}, function(err, localisations){
        if(err){
            response.send(err);
        }
        response.json(localisations);
    });
}

//Return a location or an error
exports.getOneLocation = function(request, response){
    Localisation.findById(request.params.loc, function(err, location){
        if(err){
            response.send(err);
        }
        response.json(location);
    });
}

//Return the localisation after the update or an error
exports.updateLocation = function(request, response){
    Localisation.findOneAndUpdate({_id:request.params.loc}, request.body, {new:true}, function(err, location){
        if(err){
            response.send(err);
        }
        response.json(location);
    })
}