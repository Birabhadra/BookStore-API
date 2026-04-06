const mongoose=require('mongoose');
const bookSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Book title is required"],
        trim:true,maxLength:[100,"Book title cannot exceed 100"],
    },
    author:{
        type:String,
        required:[true,"Book title is required"],
    },
    year:{
        type:Number,
        required:[true,"Year is required"],
        min:[1000,"Year must be greater than 1000"],
        max:[new Date().getFullYear(),"Year cannpt be in future"]
        
    },
    createdAt:{
        type:Date,
        default:Date.now
    }


})

module.exports=mongoose.model("Book",bookSchema)