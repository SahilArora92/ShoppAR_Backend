var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); 

var Products=require('../models/products');

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
    res.send(doc);
  });
});



module.exports = router;
