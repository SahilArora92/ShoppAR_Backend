var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;

//schema definition
var categoryDataSchema=new Schema({
    name: {type:String,required:true},
  },
    {collection: 'category'},
    {versionKey: false}
  );
mongoose.model('category',categoryDataSchema);