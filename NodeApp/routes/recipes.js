var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); 
var fs= require('fs');

//load all files in models dir

fs.readdirSync(__dirname+'/../models').forEach(function(filename){
  if(~filename.indexOf('.js')) 
  require(__dirname+'/../models/'+filename);
});

var Products=mongoose.model('products');
var Recipes=mongoose.model('recipes');


/* GET users listing. */
router.get('/',(req, res, next)=> {
  Recipes.find()
  .then(function(doc){
    res.send(doc);
  });
});


module.exports = router;
