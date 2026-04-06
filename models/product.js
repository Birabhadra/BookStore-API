const mongoose=require('mongoose');
const productSchema=mongoose.Schema({
    name: String,
    category:String,
    Price:Number,
    instock:Boolean,
    tags:[String]
});

module.exports=mongoose.model('Product',productSchema);