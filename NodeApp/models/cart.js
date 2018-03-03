var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;

//schema definition
var cartDataSchema=new Schema({
    _id: {type:String,required:true},
    quantity:Number,
    totalPrice:Number,
    taxPercentage:Number
  },
    {collection: 'cart'},
    {versionKey: false}
  );
mongoose.model('cart',cartDataSchema);