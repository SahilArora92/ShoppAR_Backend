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
var Category=mongoose.model('category');

/* GET users listing. */
router.get('/',(req, res, next)=> {
  res.send('Recommendations');
});

router.get('/:id',(req, res, next)=> {
  Products.find({_id:req.params.id})
  .then(function(doc){
    try{
    var jProduct=doc;
    var sProdCategory = jProduct[0].category; 
     Products.find({category:sProdCategory})
  .then(function(doc){
     res.send({"recommendation":doc});
  });
   
    }catch(e){
    console.log(e.message); 

    }
   
    
  });
});

module.exports = router;