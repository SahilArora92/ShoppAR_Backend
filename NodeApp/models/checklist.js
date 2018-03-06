var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;

//schema definition
var checklistDataSchema=new Schema({
    name: String,
    quantity: Number,
    isPurchased:{type:Number,default:0}
  },
    {collection: 'checklist'},
    {versionKey: false}
  );
mongoose.model('checklist',checklistDataSchema);