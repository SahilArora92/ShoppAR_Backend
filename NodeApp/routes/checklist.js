var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); 

var Checklist=require('../models/checklist');
var Products=require('../models/products');

router.get('/',(req, res, next)=> {
  //send back the retreived checklist with added product info
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

  //add checklist item to cart by changing isPurchased to 1
  router.post('/addToCart',(req,res)=>{
    res.set('Content-Type', 'application/json');
    var id;
    var body=req.body;
    //null id check
    if(req.body._id!=undefined)
    {
      id=req.body._id;
      Checklist.findById(id,function(error,doc){
        if(error){
          res.status(999).send({"message":"Failed"});
        }
        else if(doc==null){
          body["isPurchased"]=1;
          Checklist.insertMany(body, function(error, doc) {
            if(error){
              res.status(999).send({"message":"Failed"});
            }
            else{
              res.send({"message":"Successfully Added"});
            }
          });
        }
        else{
          doc["isPurchased"]=1;
          doc.save();
          res.send({"message":"Successfully Added"});
        }
      });
    }
    else
    res.status(999).send({"message":"Failed"}); 
  });

  //modify checklist from search products
  router.post('/modify',(req, res)=> {
    var body = req.body;
    var count = 0;
    res.set('Content-Type', 'application/json');
    body.forEach(element => {
      Checklist.findByIdAndUpdate(element._id,{ quantity: element.quantity },{new: true,upsert:true}, function(error, docs) {
        if(error){
          console.log(error);
          res.status(999).send({"message":"Failed"});
        }
        else{
          console.log(docs);
          count++;
          if(body.length==count)
          res.send({"message":"Successfully Added"});
        }
      });
    });
  });
module.exports = router;