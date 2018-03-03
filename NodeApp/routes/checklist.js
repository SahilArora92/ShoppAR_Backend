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
    var aChecklist=[];
    var count=0;
    Checklist.find()
    .then(function(aChecklistDoc){
      for (let index = 0; index < aChecklistDoc.length; index++) {
        var jChecklistDoc = aChecklistDoc[index];
          var id = jChecklistDoc._id;
          Products.find({_id:id})
            .then(function(foundProduct){
              jChecklistDoc=JSON.parse(JSON.stringify(jChecklistDoc));
              jChecklistDoc["product"]=foundProduct[0];
              aChecklist.push(jChecklistDoc);
              count++;
              if(count==aChecklistDoc.length)
                res.send(aChecklist);
            });
        }
        
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