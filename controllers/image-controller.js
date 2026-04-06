const Image=require('../models/image');
const uploadToCloudinary=require('../helpers/cloudinaryHelper');
const fs=require('fs');
const cloudinary = require('../config/cloudinary');
const uploadImageController=async(req,res)=>{
    try{
        // console.log(req);
        console.log("FILE:", req.file);
        if (!req.file){
            return res.status(400).json({
                success:false,
                message:"Please upload a file"
            })
        }
        const filepath=req.file.path;
        const{url,publicId}=await uploadToCloudinary(filepath);
        if (!url||!publicId){
            return res.status(500).json({
                success:false,
                message:"Error while uploading file"
            })

        }
        const newImage=new Image({
            url,
            publicId,
            uploadedBy:req.userInfo.userId
        });
        await newImage.save();
        fs.unlinkSync(req.file.path)

        return res.status(201).json({
            success:true,
            message:"Image uploaded successfully",
            data:newImage
        })
    }catch(error){
        console.error("Error uploading image:",error);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}

const fetchImagesController=async(req,res)=>{
    try{
        const page=parseInt(req.query.page)||1;
        const limit=parseInt(req.query.limit)||10;
        const skip=(page-1)*limit;

        const sortby=req.query.sortby||'createdAt';
        const sortedOrder=req.query.sortedOrder==='asc'?1:-1;
        const totalImages=await Image.countDocuments();
        const totalPages=Math.ceil(totalImages/limit);

        const sortObj={}
        sortObj[sortby]=sortedOrder
        const images=await Image.find().sort(sortObj).skip(skip).limit(limit);
        if (!images){
            return res.status(404).json({
                success:false,
                message:"No images found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"images fetched successfully",
            currentPage:page,
            totalPages:totalPages,
            totalImages:totalImages, 
            data:images
        });

    }catch(e){
        console.error("Error fetching images");
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}
const deleteImageController=async(req,res)=>{
    try{
        const imageId=req.params.id;
        const userId=req.userInfo.userId;
        const image = await Image.findById(imageId);
        if (!image){
            return res.status(404).json({
                success:false,
                message:"Image not found"
            })
        }
        if (image.uploadedBy.toString()!==userId){
            return res.status(403).json({
                success:false,
                message:"You are not authorized to delete this image"
            })
        }
        await cloudinary.uploader.destroy(image.publicId);
        await Image.findByIdAndDelete(imageId);
        return res.status(200).json({
            success:true,
            message:"Image deleted successfully"
        });
    }catch(e){
        console.error("Error fetching images");
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}
module.exports={
    uploadImageController,
    fetchImagesController,
    deleteImageController
};