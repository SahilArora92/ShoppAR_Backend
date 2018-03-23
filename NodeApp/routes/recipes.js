var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); 

var Products=require('../models/products');
var Recipes=require('../models/recipes');

/* GET recipies listing and populate product. */
router.get('/',(req, res, next)=> {
  Recipes.find()
  .populate('products.product')
  .then(function(doc){
    res.send(doc);
  });
});
  

/* Add Recipe products to checklist. */
router.get('/addToChecklist',(req, res, next)=> {
  Recipes.find()
  .then(function(doc){
    res.send(doc);
  });
});


module.exports = router;
