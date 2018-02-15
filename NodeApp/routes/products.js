var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); 
mongoose.connect('mongodb://shoppar:12345678@ds227168.mlab.com:27168/shoppardb');

var Schema=mongoose.Schema;

var productDataSchema=new Schema({
  name: {type:String,required:true},
  maker: String,
  price: Number
  //custom validator
  // price: {type:Number,
  // validate:{
  //   validator:function(text){
  //     return text==12;
  //   },
  //   message:'Wrong type'
  // }
},
  {collection:'product'},
  {versionKey:false}
);

var Products=mongoose.model('Products',productDataSchema);

var prodItem={
  name: "Soft Soap",
  maker: "Binoy",
  price: 12
};

/* GET users listing. */
router.get('/',(req, res, next)=> {
  res.send('respond with a resource');
});

router.get('/data',(req, res, next)=> {
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
