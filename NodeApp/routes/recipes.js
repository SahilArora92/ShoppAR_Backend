var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); 

var Products=require('../models/products');
var Recipes=require('../models/recipes');
var Checklist=require('../models/checklist');

/* GET recipes listing and populate product. */
router.get('/',(req, res, next)=> {
  Recipes.find()
  .populate('products.product')
  .then(function(doc){
    res.send(doc);
  });
});
  function formChecklist(recipes){
    var tempProducts=[];
    recipes.forEach(recipe => {
      var recipeId=recipe._id;
      recipe.products.forEach(prod => {
        var tempProd={}
        tempProd["_id"]=prod.product;
        tempProd["quantity"]=prod.quantity;
        //tempProd["recipe"]=recipeId;
        tempProducts.push(tempProd);
      });
    });
    return tempProducts;
  }

/* Add Recipe products to checklist. */
router.post('/addToChecklist',(req, res)=> {
  var body = req.body;
  var recipeCheckObj,mergedChecklistObj;
  res.set('Content-Type', 'application/json');
      Recipes.find({_id:{$in:body}})
      .then(function(doc){
        recipeCheckObj=formChecklist(doc);
        var count=0;
        recipeCheckObj.forEach(element => {
          Checklist.findByIdAndUpdate(element._id,{$inc: { quantity: element.quantity }},{new: true,upsert:true}, function(error, docs) {
            if(error){
              console.log(error);
              res.status(999).send({"message":"Failed"});
            }
            else{
              console.log(docs);
              count++;
              if(recipeCheckObj.length==count)
              res.send({"message":"Successfully Added"});
            }
          });
        });
      })
      .catch(err=>{
        res.status(500).json({
          message:'Recipe not found',
          error:err
        })
      });
});


module.exports = router;
