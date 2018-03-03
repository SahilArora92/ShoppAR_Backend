var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); 
var fs= require('fs');

fs.readdirSync(__dirname+'/../models').forEach(function(filename){
    if(~filename.indexOf('.js')) 
    require(__dirname+'/../models/'+filename);
  });

var Checklist=mongoose.model('checklist');
var Products=mongoose.model('products');
/* GET users listing. */
router.get('/',(req, res, next)=> {
    //send back the retreived checklist
    Checklist.find()
    .then(function(doc1){
    	var id = doc1[0]._id;
    	Products.find({_id:id})
  .then(function(doc2){
    //getting the second object
   
    doc1[0]["product"]=doc2;
    res.send(doc1);
  });
      
  });
});
  
  router.post('/modify',(req, res)=> {
    Checklist.remove({}).exec();
    var body = req.body;
    res.set('Content-Type', 'application/json');
    Checklist.insertMany(body, function(error, docs) {
      if(error){
        res.status(999).send({"message":"Failed"});
      }
      else{
        res.send({"message":"Successfully Added"});
      }
    });
  });
module.exports = router;