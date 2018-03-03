var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); 
var fs= require('fs');

fs.readdirSync(__dirname+'/../models').forEach(function(filename){
    if(~filename.indexOf('.js')) 
    require(__dirname+'/../models/'+filename);
  });

var Cart=mongoose.model('cart');
var Products=mongoose.model('products');
var taxP=10;
/* GET cart data. */
router.get('/',(req, res, next)=> {
    //send back the retreived cart
    Cart.find()
    .then(function(doc){
      res.send(doc);
  });
});

router.post('/add',(req, res)=> {
  //Cart.remove({}).exec();
  var body = req.body;
  res.set('Content-Type', 'application/json');
  Products.find({_id:req.body._id})
  .then(function(doc){
    try{

    var currentProduct=doc;
    var price = currentProduct.price; 
    body["totalPrice"] = price * body["quantity"];
    body["taxPercentage"] = taxP;
    var item=new Cart(body);
    item.save(function(error,data){
      if(error){
        res.status(999).send({"message":error.message});
      }
      else{
        res.send({"message":"Successfully Added"});
      }
    });
    }catch(e){
    console.log(e.message); 
    }
  });
});

module.exports = router;