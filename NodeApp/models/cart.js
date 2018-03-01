var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;

//schema definition
var cartDataSchema=new Schema({
    id: {type:String,required:true},
    productId: String,
    quantity:Number
  },
    {collection: 'cart'},
    {versionKey: false}
  );
mongoose.model('cart',cartDataSchema);