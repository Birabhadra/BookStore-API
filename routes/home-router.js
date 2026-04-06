const express=require('express');
// const {route}=require('./auth-router');
const authMiddleware=require('../middlewares/auth-middleware')

const router=express.Router();
router.get('/welcome',authMiddleware,(req,res)=>{
    const {username,userId,role}=req.userInfo;
    res.json({
        message:"Welcome to the Home page",
        username,
        userId,
        role
    })
});
module.exports=router;
