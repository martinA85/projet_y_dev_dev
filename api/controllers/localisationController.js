//Doc Snippet

/**
 * @apiDefine LocalisationObject
 * @apiSuccess {Interest} Interest Interest Object
 * @apiSuccessExample Success-Response
 * {
 *      lat : "47.0507907",
 *      long : "-1.6308937",
 *      name : "B'Mousse",
 * }
 */

/**
 * @apiDefine paramLocalisationId
 * @apiParam {String} :locId Localisation unique id (_id)
 */

'use strict';

var mongoose =require("mongoose");
var Localisation = mongoose.model("Localisation");

// ====================================================
// ======================  CRUD  ======================
// ====================================================

/**
 * @api {POST} /localisation Create Localisation
 * @apiName CreateLocalisation
 * @apiGroup Localisation
 * @apiParam {Localisation} Localisation Localisation object to create
 * @apiParamExample {Localisation} Localisation
 * {
 *      lat : "47.0507907",
 *      long : "-1.6308937",
 *      name : "New Loc",
 * }
 * @apiUse LocalisationObject
 */
exports.createLocalisation = function(request, response){
    let new_loc = new Localisation(request.body);
    new_loc.save(function(err, new_loc){
        if(err){
            response.send(err);
        }
        response.json(new_loc);
    })
}

/**
 * @api {GET} /localisation Get All Localisation
 * @apiName GetAllLocalisation
 * @apiGroup Localisation
 * @apiSuccess {ObjectList} Localisations List of all localisations
 * @apiSuccessExample Success-Response
 * [
 *  {
 *      lat : "47.0507907",
 *      long : "-1.6308937",
 *      name : "New Loc",
 *  }
 * ]
 */
exports.getAllLocation = function(request, response){
    Localisation.find({}, function(err, localisations){
        if(err){
            response.send(err);
        }
        response.json(localisations);
    });
}

/**
 * @api {GET} /localisation/:locId Get localisation by id
 * @apiName GetLocationById
 * @apiGroup Localisation
 * @apiUse paramLocalisationId
 * @apiUse LocalisationObject
 */
exports.getOneLocation = function(request, response){
    Localisation.findById(request.params.locId, function(err, location){
        if(err){
            response.send(err);
        }
        response.json(location);
    });
}

/**
 * @api {PUT} /localisation/:locId Update localisation
 * @apiName UpdateLocalisation
 * @apiGroup Localisation
 * @apiUse paramLocalisationId
 * @apiUse LocalisationObject
 */
exports.updateLocation = function(request, response){
    Localisation.findOneAndUpdate({_id:request.params.locId}, request.body, {new:true}, function(err, location){
        if(err){
            response.send(err);
        }
        response.json(location);
    })
}

/**
 * @api {DELETE} /localisation/:locId Delete localisation
 * @apiName DeleteLocalisation
 * @apiGroup Localisation
 * @apiUse paramLocalisationId
 * @apiSuccess {Boolean} success Success state
 * @apiSuccess {String} message Message returned
 * @apiSuccessExample Success Response
 * {
 *      success : true,
 *      message : "Location deleted"
 * }
 */
exports.deleteLocation = function(request, response){
    Localisation.remove({_id:request.params.locId}, function(err, event){
        if(err){
            response.send(err);
        }
        response.json({success:true, message:"Location deleted"});
    });
}


// =====================================================
// =================  Other function  ==================
// =====================================================