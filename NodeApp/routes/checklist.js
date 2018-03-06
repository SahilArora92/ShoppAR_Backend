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

router.get('/',(req, res, next)=> {
  //send back the retreived checklist
  var aChecklist=[];
  Products.find()
  .then(function(doc){
    Checklist.find()
      .then(function(checklistDoc){
        checklistDoc.forEach(checklistItem => {
          var foundProd=doc.filter(function(elem){
            return elem.id==checklistItem.id
          });
          checklistItem=JSON.parse(JSON.stringify(checklistItem));
          delete checklistItem._id;
          delete checklistItem.name;
          delete checklistItem.__v;
          checklistItem["product"]=foundProd[0];
          aChecklist.push(checklistItem);
        });
        res.send(aChecklist);
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