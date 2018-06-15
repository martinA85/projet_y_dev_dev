'use strict';

var mongoose = require("mongoose");
var Users = mongoose.model("Users");
var fs = require('fs');
// ====================================================
// ======================  CRUD  ======================
// ====================================================

//Return the user object after creation or return error
exports.createUser = function(request, response){
    let new_user = new Users(request.body);
    new_user.save(function(err, new_user){
        if(err){
            response.send(err);
        }
        response.json(new_user);
    });
};

//Return all users or return error
exports.getAllUsers = function(request, response){
    Users.find({}, function(err, users){
        if(err){
            response.send(err);
        }
        response.json(users);
    });
};

//return an user object find by his id or return error
exports.getUserById = function(request, response){
    Users.findById(request.params.userId, function(err, user){
        if(err){
            response.send(err);
        }
        response.json(user);
    })
}


//return the new user after update or return error
exports.updateUser = function(request, response){
    Users.findOneAndUpdate({_id: request.params.userId}, request.body, {new: true}, function(err, user){
        if(err){
            response.send(err);
        }
        response.json(user);
    });
}

//Return message if deletion is a success or return error
exports.deleteUser = function(request, response){
    Users.remove({_id:request.params.userId},function(err, user){
        if(err){
            response.send(err)
        }
        response.json({success:true, message:"User deleted"})
    });
}

// =====================================================
// =================  Other function  ==================
// =====================================================

//function that change user image
exports.uploadImage = function(request, response){
    let image = request.files.image;
    let userId = request.params.userId;
    
    Users.findById(userId, function(err, user){
        if(err){
            response.send(err);
        }
        image.mv('./ressource/image/'+image.name, function(err){
            if(err){
                response.send(err);
            }
            user.image = image.name;
            user.save(function(err, user){
                if(err){
                    response.send(err);
                }
                response.json({success : true, message:"Image uploaded"})
            });
        });
    });
}


//Return the users image
exports.getUserImage = function(request, response){
    Users.findById(request.params.userId, function(err, user){
        if(err){
            response.send(err);
        }
        if(user){
            let img = false;
            try{
                img = fs.readFileSync('./ressource/image/'+user.image);
            }catch (err){
                response.send(err);
            }
            if(img){
                response.writeHead(200, {'Content-Type': 'image/gif' });
                response.end(img, 'binary');
            }
        }  
    });
}
