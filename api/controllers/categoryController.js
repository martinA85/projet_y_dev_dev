'use strict';

var mongoose =require("mongoose");
var Category = mongoose.model("Category");

// ====================================================
// ======================  CRUD  ======================
// ====================================================

//return the new category object or error
exports.createCategory = function(request, response){
    let new_category = new Category(request.body);
    new_category.save(function(err, new_category){
        if(err){
            response.send(err);
        }
        response.json(new_category)
    });
}

//return all the categories or error
exports.getAllCategory = function(request, response){
    Category.find({}, function(err, categories){
        if(err){
            response.send(err);
        }
        response.json(categories)
    })
}

//return a category by his id
exports.getCategoryById = function(request, response){
    Category.findById(request.params.categoryId, function(err, category){
        if(err){
            response.send(err);
        }
        response.json(category);
    });
}


//return a category after update
exports.updateCategory = function(request, response){
    Category.findOneAndUpdate({_id:request.params.categoryId}, request.body, {new:true}, function(err, category){
        if(err){
            response.send(err);
        }
        response.json(category);
    });
}

//return message or error
exports.deleteCategory = function(request, response){
    Category.remove({_id:request.params.categoryId}, function(err, event){
        if(err){
            response.send(err);
        }
        response.json({success:true, message:"Category deleted"});
    })
}