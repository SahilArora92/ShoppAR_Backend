var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;

//schema definition
var recipesDataSchema=new Schema({
    name: {type:String,required:true},
  },
    {collection: 'recipes'},
    {versionKey: false}
  );
  module.exports=mongoose.model('recipes',recipesDataSchema);