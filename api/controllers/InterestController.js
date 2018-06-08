'use strict';

var mongoose =require("mongoose");
var Interest = mongoose.model("Interest");

// ====================================================
// ======================  CRUD  ======================
// ====================================================

//Return the interest after his creation or an error
exports.createInterest = function(request, response){
    let new_interest = new Interest(request.body);
    new_interest.save(function(err, new_interest){
        if(err){
            response.send(err);
        }
        response.json(new_interest);
    })
}

//Return all the interest or an error
exports.getAllInterest = function(request, response){
    Interest.find({}, function(err, interests){
        if(err){
            response.send(err);
        }
        response.json(interests);
    });
}

//Return the interest find by his id
exports.getInterestById = function(request, response){
    Interest.findById(request.params.interestId, function(err, interest){
        if(err){
            response.send(err);
        }
        response.json(interest);
    })
}

//TODO : voire si utile
exports.updateInterest = function(request, response){

}

//Return message if success or error
exports.deleteInterest = function(request, response){
    Interest.remove({_id:request.params.interestId}, function(err, event){
        if(err){
            response.send(err);
        }
        response.json({success:true, message:"Interest deleted"});
    })
}