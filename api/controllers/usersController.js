//Doc snipet :

/**
 * @apiDefine UserObject
 * 
 * @apiSuccessExample Success-response
 *  {
        "token": "TOKEN",
        "_id": "ID",
        "name": "MartinAllimonier",
        "password": "*********",
        "email": "martin@noosys.fr",
        "createDate": "2018-06-11T09:43:53.145Z",
        "updateDate": "2018-06-15T07:16:36.078Z",
        "__v": 0,
        "socketId": "SOCKETID",
        "image": "IMAGEURL"
    }
 */

 /**
  * @apiDefine paramUserId
  * 
  * @apiParam {String} :userId User unique id (_id)
  */


'use strict';

var mongoose = require("mongoose");
var Users = mongoose.model("Users");
var fs = require('fs');
// ====================================================
// ======================  CRUD  ======================
// ====================================================

/**
 * @api {POST} /users Creating new user
 * @apiName CreateUser
 * @apiGroup User
 * @apiParam {Users} User
 * @apiParamExample {json} User
 *  {
        "name": "MartinAllimonier changer",
        "password": "*********",
        "email": "martin@noosys.fr"
    }
 * 
 * @apiSuccess {Users} new_user User after his creation
 * @apiUse UserObject
 */
exports.createUser = function(request, response){
    let new_user = new Users(request.body);
    new_user.save(function(err, new_user){
        if(err){
            response.send(err);
        }
        response.json(new_user);
    });
};

/**
 * @api {GET} /users Get all Users
 * @apiName GetAllUsers
 * @apiGroup User
 * 
 * @apiSuccess {ObjectList} users List of all users
 * @apiSuccessExample Success-Response:
 *  [
        {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibWFydGluQG5vb3N5cy5mciIsImlhdCI6MTUyOTA0NzUyNSwiZXhwIjoxNTI5MTMzOTI1fQ.XLgferKGjW2UHyOgpSE7f1ozZsYyA6jRpYqFcYnk8Qg",
            "_id": "5b1e4459b7b49e2d8cadae4a",
            "name": "MartinAllimonier changer",
            "password": "*********",
            "email": "martin@noosys.fr",
            "createDate": "2018-06-11T09:43:53.145Z",
            "updateDate": "2018-06-15T07:16:36.078Z",
            "__v": 0,
            "socketId": "JPCT9AbI-p3fmK23AAAA",
            "image": "hqdefault.jpg"
        }
    ] 
 */
exports.getAllUsers = function(request, response){
    Users.find({}, function(err, users){
        if(err){
            response.send(err);
        }
        response.json(users);
    });
};

/**
 * @api {GET} /users/:userId Get one user by his id
 * @apiName GetUserById
 * @apiGroup User
 * @apiUse paramUserId
 * 
 * @apiUse UserObject
 * 
 */
exports.getUserById = function(request, response){
    Users.findById(request.params.userId, function(err, user){
        if(err){
            response.send(err);
        }
        response.json(user);
    })
}


/**
 * @api {PUT} /users/userId Update one user
 * @apiName UpdateUser
 * @apiGroup User
 * @apiUse paramUserId
 * 
 * @apiUse UserObject
 */
exports.updateUser = function(request, response){
    Users.findOneAndUpdate({_id: request.params.userId}, request.body, {new: true}, function(err, user){
        if(err){
            response.send(err);
        }
        response.json(user);
    });
}

/**
 * @api {DELETE} /users/userId Delete one user
 * @apiName DeleteUser
 * @apiGroup User
 * @apiUse paramUserId
 * 
 * @apiSuccess {Boolean} success success state
 * @apiSuccess {String} message Message with the success
 * 
 * @apiSucessExample Success-Response:
 *  {
 *      success : true,
 *      message : "User deleted"
 *  }
 */
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

/**
 * @TODO : faire en sorte que le nom de l'image soit userId.format
 * @api {POST} /users/image/:userId upload image for one user
 * @apiName UploadImage
 * @apiGroup User
 * @apiUse paramUserId
 * @apiParam {Binary} image Image to upload as user image
 * 
 * @apiSuccess {Boolean} success success state
 * @apiSuccess {String} message Message with the success
 * @apiSucessExample Success-Response:
 *  {
 *      success : true,
 *      message : "Image uploaded"
 *  }
 */
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


/**
 * @api {POST} /users/image/:userId Get image for one user
 * @apiName GetUserImage
 * @apiGroup User
 * @apiUse paramUserId
 * 
 * @apiSuccess {Binary} Image user's Image
 */
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
