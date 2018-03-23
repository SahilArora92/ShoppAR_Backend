var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;

//schema definition
var recipesDataSchema=new Schema({
    name: {type:String,required:true},
    image:{type:String},
    description:{type:String},
    products:[{
      product:{type:Schema.Types.ObjectId,ref:'products'},
      quantity:{type:Number,default:1}
    }]
  },
    {collection: 'recipes'},
    {versionKey: false}
  );

  module.exports=mongoose.model('recipes',recipesDataSchema);