var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); 

var Checklist=require('../models/checklist');
var Products=require('../models/products');

//Comparer Function  
function GetSortOrder(prop) {  
  return function(a, b) {  
      if (a[prop] > b[prop]) {  
          return 1;  
      } else if (a[prop] < b[prop]) {  
          return -1;  
      }  
      return 0;  
  }  
}

router.get('/',(req, res, next)=> {
  //send back the retreived checklist with added product info
  var aChecklist=[];
  Products.find()
  .sort('_id')
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
        //aChecklist.sort(GetSortOrder("name"));
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
    //var count = 0;
    Checklist.remove({}).exec();
    res.set('Content-Type', 'application/json');
    Checklist.insertMany(body, function(error, docs) {
           if(error){
             res.status(999).send({"message":"Failed"});
           }
           else{
             res.send({"message":"Successfully Added"});
           }
    });
     /* body.forEach(element => {
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
    }); */
  });
  
  //append checklist from search products
  router.post('/append',(req, res)=> {
    var body = req.body;
    var count = 0;
    res.set('Content-Type', 'application/json'); 
    body.forEach(element => {
      Checklist.findByIdAndUpdate(element._id,{$inc:{ quantity: element.quantity }},{new: true,upsert:true}, function(error, docs) {
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

  //delete item from checklist
  router.post('/delete',(req, res)=>{
    var body = req.body;
    res.set('Content-Type', 'application/json');
    Checklist.findByIdAndRemove(body._id,function(err){
      if(err){
        res.status(999).json({
          message:'Failed',
          error:err
        });
      }else{
        res.send({"message":"Successfully removed"});
      }
    });
  });

  //clear the whole checklist
  router.post('/clear',(req, res)=>{
    res.set('Content-Type', 'application/json');
    Checklist.remove({},function(err){
      if(err){
        res.status(999).json({
          message:'Failed',
          error:err
        });
      }else{
        res.send({"message":"Successfully cleared"});
      }
    });
  });
module.exports = router;