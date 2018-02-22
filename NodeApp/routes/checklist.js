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

fs.readdirSync(__dirname+'/../models').forEach(function(filename){
    if(~filename.indexOf('.js')) 
    require(__dirname+'/../models/'+filename);
  });

var Checklist=mongoose.model('checklist');

/* GET users listing. */
router.get('/',(req, res, next)=> {
    //send back the retreived checklist
    Checklist.find()
    .then(function(doc){
      res.send({"items":doc});
  });
});
  
  router.post('/modify',(req, res)=> {
    Checklist.remove({}).exec();
    var body = req.body;
    res.set('Content-Type', 'application/json');
    Checklist.insertMany(body.items, function(error, docs) {
      if(error){
        res.status(999).send({"message":"Failed"});
      }
      else{
        res.send({"message":"Successfully Added"});
      }
    });
    
  });
module.exports = router;