var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;

//schema definition
var categoryDataSchema=new Schema({
    name: {type:String,required:true},
  },
    {collection: 'category'},
    {versionKey: false}
  );
  module.exports=mongoose.model('category',categoryDataSchema);