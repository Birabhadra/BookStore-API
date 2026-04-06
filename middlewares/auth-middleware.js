const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config();
const authMiddleware=(req,res,next)=>{
    const authHeader=req.headers['authorization'];
    const token=authHeader && authHeader.split(' ')[1];
    if (!token){
        return res.status(401).json({
            success:false,
            message:"Access denied. please login"
        })
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.userInfo=decoded;
        next();
    }catch(e){
        res.status(403).json({
            success:false,
            message:"Invalid token"
        })
    }
}

module.exports=authMiddleware;