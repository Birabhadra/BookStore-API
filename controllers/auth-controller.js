const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const checkexisting = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (checkexisting) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedpass = await bcrypt.hash(password, salt);
    const newuser = new User({
      username,
      email,
      password: hashedpass,
      role: role || "user",
    });
    await newuser.save();
    if (newuser) {
      res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: newuser,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "User registration failed",
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      res.status(400).json({
        success: false,
        message: "User doesnot exist",
      });
    }
    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch) {
      res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "15m",
      }
    );
    res.status(200).json({
        success:true,
        message:"user logged in successfully",
        token
    })
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
const changePassword=async(req,res)=>{
  try{
    const userId=req.userInfo.userId;
    const{oldPassword,newPassword}=req.body;

    const user=await User.findById(userId);
    if (!user){
      return res.status(400).json({
        success:false,
        message:"User doesnot exist"
      })
    }
    const ismatch=await bcrypt.compare(oldPassword,user.password);
    if (!ismatch){
      return res.status(400).json({
        success:false,
        message:"Incorrect password"
      })
    }
    const salt=await bcrypt.genSalt(10);
    const hashedpass=await bcrypt.hash(newPassword,salt);
    user.password=hashedpass;
    await user.save();

    return res.status(200).json({
      success:true,
      message:"Password changed successfully"
    });

  }catch(e){
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}
module.exports = { registerUser, loginUser,changePassword };
