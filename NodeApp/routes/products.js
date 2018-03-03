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

//dummy data
var prodItem={
  //name: "Soft Soap",
  maker: "Binoy",
  price: 12
};

/* GET users listing. */
router.get('/',(req, res, next)=> {
  Products.find()
  .then(function(doc){
    res.send(doc);
  });
});


router.get('/create',(req,res,next)=>{
  var data=new Products(prodItem);
  data.save(function(err){
    if(!!err)
    console.log(err.message);
  });
  Products.find()
  .then(function(doc){
    res.send({"products":doc});
  });
});



module.exports = router;
