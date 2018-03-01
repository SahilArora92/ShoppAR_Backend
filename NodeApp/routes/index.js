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

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/searchProducts/:query', function(req, res, next) {
  Products.find({$text: {$search: req.params.query}}, {score: {$meta: "textScore"}}).sort({score:{$meta:"textScore"}})
  .then(function(doc){
    //getting the first object
    res.send({"products":doc});
  });
});

module.exports = router;
