var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); 
var fs= require('fs');
mongoose.connect('mongodb://shoppar:12345678@ds227168.mlab.com:27168/shoppardb',function(){})
  .catch(err => { 
  // mongoose connection error will be handled here
  console.error('App starting error:', err.stack);
  process.exit(1);
});

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
