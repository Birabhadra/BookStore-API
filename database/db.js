const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config();

DB_URL=process.env.MONGODB_URL

if (!DB_URL){
    throw new error("Database url is not ste in environment variables");

}
const connectdb=async()=>{
    try{
        await mongoose.connect(DB_URL);
        console.log("Database connected successfully");

    }catch(error){
        console.log("Database connection failed",error);
    }
}

module.exports=connectdb;