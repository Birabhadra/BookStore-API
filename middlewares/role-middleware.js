const adminMiddleware=(req,res,next)=>{
    if (req.userInfo.role !== "admin"){
        return res.status(403).json({
            success:false,
            message:"403 Forbidden. You dont have access to this page"
        })

    }
    next();
}

module.exports=adminMiddleware;