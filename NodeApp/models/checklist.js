var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;

//schema definition
var checklistDataSchema=new Schema({
    name: {type:String,required:true},
    quantity: String,
    isPurchased:Number
  },
    {collection: 'checklist'},
    {versionKey: false}
  );
mongoose.model('checklist',checklistDataSchema);