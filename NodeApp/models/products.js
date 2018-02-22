var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;
//schema definition
var productDataSchema=new Schema({
    name: {type:String,required:true},
    maker: String,
    price: Number
    //custom validator
    // price: {type:Number,
    // validate:{
    //   validator:function(text){
    //     return text==12;
    //   },
    //   message:'Wrong type'
    // }
  },
    {collection: 'product'},
    {versionKey: false}
  );
  
//Schema Registeration
mongoose.model('products',productDataSchema);