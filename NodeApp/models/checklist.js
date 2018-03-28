var mongoose = require('mongoose');
//Define a schema 
var Schema = mongoose.Schema;

//schema definition
var checklistDataSchema=new Schema({
    name: String,
    quantity: {type:Number,default:1},
    isPurchased:{type:Number,default:0}
  },
    {collection: 'checklist'},
    {versionKey: false}
  );
//compile model from schema
module.exports=mongoose.model('checklist',checklistDataSchema);