const express=require('express')
const router=express.Router();
const authMiddleware=require('../middlewares/auth-middleware')
const adminMiddleware=require('../middlewares/role-middleware');

router.get("/welcome",authMiddleware,adminMiddleware,(req,res)=>{
    res.send("Welcome to the admin panel");
});
module.exports=router;