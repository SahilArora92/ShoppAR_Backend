var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;
//schema definition
var productDataSchema=new Schema({
    "name": String,
    "maker": String,
    "price": Number,
    "upc": String,
    "category": String,
    "size": String,
    "nutrition": {
        "servingsize": String,
        "calories": Number,
        "fat": {
            "total": String,
            "saturatedfat": String,
            "polyunsaturated": String,
            "monounsaturated": String
        },
        "cholesterol": String,
        "sodium": String,
        "carbohydrate": String,
        "protein": String,
        "fiber": String
    },
    "images": Array
},
    {collection: 'product'},
    {versionKey: false}
  );
  
//Schema Registeration
module.exports=mongoose.model('products',productDataSchema);