var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); 

var Products=require('../models/products');
var Recipes=require('../models/recipes');

/* GET users listing. */
router.get('/',(req, res, next)=> {
  Recipes.find()
  .populate('products._id')
  .then(function(doc){
    res.send(doc);
  });
});
  

/* GET users listing. */
router.get('/addToChecklist',(req, res, next)=> {
  Recipes.find()
  .then(function(doc){
    res.send(doc);
  });
});


module.exports = router;
