const cloudinary=require('../config/cloudinary');


const uploadToCloudinary=async(filepath)=>{
    try{
        const result=await cloudinary.uploader.upload(filepath);

        return {
            url:result.secure_url,
            publicId:result.public_id
        };
    }catch(e){
        console.error("error uploading file");
        throw new Error("Error uploading file to Cloudinary");
    }
}


module.exports=uploadToCloudinary;