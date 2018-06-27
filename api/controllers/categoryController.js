//Doc snippet

/**
 * @apiDefine CategObject
 * @apiSuccessExample Success-response
 * Example of categ object
 * {
 *      name : "Example Categ"
 * }
 */

/**
 * @apiDefine paramCategId
 * @apiParam {String} :categoryId Categ unique id (_id)
 */

'use strict';

var mongoose =require("mongoose");
var Category = mongoose.model("Category");

// ====================================================
// ======================  CRUD  ======================
// ====================================================

/**
 * @api {POST} /category Creating new category
 * @apiName CreateCategory
 * @apiGroup Category
 * @apiParam {Category} Category Category object to create
 * @apiParamExample CategoryObject
 * {
 *      name : "Example Categ"
 * }
 * 
 * @apiSuccess {Category} CategoryObject Category object after his creation
 * @apiUse CategObject
 */
exports.createCategory = function(request, response){
    let new_category = new Category(request.body);
    new_category.save(function(err, new_category){
        if(err){
            response.send(err);
        }
        response.json(new_category)
    });
}

/**
 * @api {GET} /category Getting All Category
 * @apiName GetAllCategory
 * @apiGroup Category
 * @apiSuccess {ObjectList} CategList 
 * @apiSuccessExample Success-response
 * [
 *      {
 *          name:"Categ name"
 *      }
 * ]
 */
exports.getAllCategory = function(request, response){
    Category.find({}, function(err, categories){
        if(err){
            response.send(err);
        }
        response.json(categories)
    })
}

/**
 * @api {GET} /category/:categoryId Getting one category
 * @apiName GetOneCategory
 * @apiGroup Category
 * @apiUse CategObject
 * @apiSuccess {Category} Category Category Object
 */
exports.getCategoryById = function(request, response){
    Category.findById(request.params.categoryId, function(err, category){
        if(err){
            response.send(err);
        }
        response.json(category);
    });
}


/**
 * @api {PUT} /category/:categoryId Updating a category
 * @apiName UpdateGategory
 * @apiGroup Category
 * @apiUse CategObject
 * @apiSuccess {Category} Category Object
 */
exports.updateCategory = function(request, response){
    Category.findOneAndUpdate({_id:request.params.categoryId}, request.body, {new:true}, function(err, category){
        if(err){
            response.send(err);
        }
        response.json(category);
    });
}

/**
 * @api {DELETE} /category/:categoryId Deleting a category
 * @apiName DeleteGategory
 * @apiGroup Category
 * @apiUse CategObject
 * @apiSuccess {Boolean} Success Success State
 * @apiSuccess {String} message Message returned
 * @apiSuccessExample Success-Response
 * {
 *      success : true,
 *      message : "Category deleted"
 * }
 */
exports.deleteCategory = function(request, response){
    Category.remove({_id:request.params.categoryId}, function(err, event){
        if(err){
            response.send(err);
        }
        response.json({success:true, message:"Category deleted"});
    })
}