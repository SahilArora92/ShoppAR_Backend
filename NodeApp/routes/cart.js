var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); 
var fs= require('fs');

fs.readdirSync(__dirname+'/../models').forEach(function(filename){
    if(~filename.indexOf('.js')) 
    require(__dirname+'/../models/'+filename);
  });

var Cart=mongoose.model('cart');

/* GET cart data. */
router.get('/',(req, res, next)=> {
    //send back the retreived checklist
    Cart.find()
    .then(function(doc){
      res.send({"products":doc});
  });
});

module.exports = router;