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
    .then(function(aChecklistDoc){
      aChecklistDoc.forEach(jChecklistDoc => {
        if(jChecklistDoc.length==0)
          res.send(jChecklistDoc);
        else
          {
            var id = jChecklistDoc._id;
            var foundDocument;
            Products.find({_id:id})
              .then(function(foundProduct){
            //getting the second object
            //foundProduct = jProductDoc[0];
            jChecklistDoc=JSON.parse(JSON.stringify(jChecklistDoc));
            jChecklistDoc["product"]=foundProduct[0];
            console.log(jChecklistDoc);
            var tempPromise=new Promise((resolve,reject)=>{
              
            }).then(function(aChecklistDoc){
              res.send(aChecklistDoc);
            })
            //console.log("Found Document");
            //res.send(foundProduct);
            });
          }  
      });
      //res.send(aChecklistDoc);
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