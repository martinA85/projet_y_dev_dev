'use strict';

var mongoose =require("mongoose");
var Tag = mongoose.model("Tag");

// ====================================================
// ======================  CRUD  ======================
// ====================================================

//Return the tag after his creation or error
exports.createTag = function(request, response){
    let new_tag = new Tag(request.body);
    new_tag.save(function(err, new_tag){
        if(err){
            response.send(err);
        }
        response.json(new_tag);
    });
}

//Return all tags or error
exports.getAllTags = function(request, response){
    Tag.find({}, function(err, tags){
        if(err){
            response.send(err);
        }
        response.json(tags)
    });
}

//Return one tab find by his id or error
exports.getTagById = function(request, response){
    Tag.findById(request.params.tagId, function(err, tag){
        if(err){
            response.send(err);
        }
        response.json(tag);
    });
}

//Return the tag updated or return error
exports.updateTag = function(request, response){
    Tag.findByIdAndUpdate({_id:request.params.tagId}, request.body, {new : true}, function(err, tag){
        if(err){
            response.send(err);
        }
        response.json(tag);
    });
}

// return message if success or error
exports.deleteEvent = function(request, response){
    Tag.remove({_id:request.params.tagId}, function(err, event){
        if(err){
            response.send(err);
        }
        response.json({success:true, message:"Event deleted"});
    });
}

// =====================================================
// =================  Other function  ==================
// =====================================================