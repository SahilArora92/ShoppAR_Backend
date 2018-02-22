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
    res.send({"products":doc});
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

router.get('/:id',(req, res, next)=> {
  Products.find({_id:req.params.id})
  .then(function(doc){
    //getting the first object
    res.send({"product":doc[0]});
  });
});

module.exports = router;
