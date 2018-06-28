//Doc Snippet

/**
 * @apiDefine InterestObject
 * @apiSuccess {Interest} Interest Interest Object
 * @apiSuccessExample Success-Response
 * {
 *      user : "userId",
 *      tag : "tagId"
 * }
 */

 /**
  * @apiDefine paramInterestId
  * @apiParam {String} :interestId Interest unique id (_id)
  */


'use strict';

var mongoose =require("mongoose");
var Interest = mongoose.model("Interest");

// ====================================================
// ======================  CRUD  ======================
// ====================================================

/**
 * @api {POST} Creating Interest Object
 * @apiName CreateInterest
 * @apiGroup Interest
 * @apiParam {Interest} Interest
 * @apiParamExample {Interest} Interest
 * {
 *      user : "userId",
 *      tag : "tagId"
 * }
 * @apiUse InterestObject
 */
exports.createInterest = function(request, response){
    let new_interest = new Interest(request.body);
    new_interest.save(function(err, new_interest){
        if(err){
            response.send(err);
        }
        response.json(new_interest);
    })
}

/**
 * @api {GET} Getting all Interest Object
 * @apiName GetAllInterest
 * @apiGroup Interest
 * @apiSuccess {ObjectList} Interests List of all Interest objects
 * @apiSuccessExample Success-Response
 * [
 *  {
 *      user : "userId",
 *      tag : "tagId"
 *  }
 * ]
 */
exports.getAllInterest = function(request, response){
    Interest.find({}, function(err, interests){
        if(err){
            response.send(err);
        }
        response.json(interests);
    });
}

/**
 * @api {GET} Getting one Interest by id
 * @apiName GetInterestById
 * @apiGroup Interest
 * @apiUse paramInterestId
 * @apiUse InterestObject
 */
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

/**
 * @api {DELETE} Deleting one interest
 * @apiName DeleteInterest
 * @apiGroup Interest
 * @apiUse paramInterestId
 * @apiSuccess {Boolean} success Success State
 * @apiSuccess {String} message Message Returned
 * @apiSuccessExample Success-Response
 * {
 *      success : true,
 *      message : "Interest Deleted"
 * }
 */
exports.deleteInterest = function(request, response){
    Interest.remove({_id:request.params.interestId}, function(err, event){
        if(err){
            response.send(err);
        }
        response.json({success:true, message:"Interest deleted"});
    })
}