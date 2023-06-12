const express = require("express");
const path = require("path");
const User = require("../model/user");
const router = express.Router();
const { upload } = require("../multer");
const ErrorHandler = require("../ultils/ErrorHandler");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../ultils/sendMail");
const sendToken = require("../ultils/jwtToken");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { isAuthenticated } = require("../middleware/auth");

router.post("/create-user",upload.single("file"), async (req,res,next) => {
    try{    
        const {name, email, password} = req.body;
        const userEmail = await User.findOne({email});

        if(userEmail){
            const filename = req.file.filename;
            const filePath = `uploads/${filename}`;
            fs.unlink(filePath, (err)=>{
                if(err){
                    console.log(err);
                    res.status(500).json({message: "Lỗi khi xoá file"});
                }
            })
            return next(new ErrorHandler("Người dùng đã tồn tại!",400));
        }

        const filename = req.file.filename;
        const fileUrl = path.join(filename);
        const user = {
            name: name,
            email: email,
            password: password,
            avatar: fileUrl,
        }   
        console.log(user);

        // const newUser = await User.create(user);
        // res.status(201).json({
        //     success: true,
        //     newUser
        // })
        
        const activationToken = createActivationToken(user);

        const activationUrl = `http://localhost:3000/activation/${activationToken}`

        try{
            await sendMail({
                email: user.email,
                subject: "Kích hoạt tài khoản của bạn",
                message: `Xin chào ${user.name}, Vui lòng bấm vào đường link để kích hoạt tài khoản của bạn: ${activationUrl}`,
            })
            res.status(201).json({
                success: true,
                message: `Vui lòng kiểm tra email của bạn:- ${user.email} để kích hoạt tài khoản`
            })
        }catch(err){
            return next(new ErrorHandler(err.message,500));
        }

    } catch(error){
        return next(new ErrorHandler(error.message,400));
    }
})

// create activation token
const createActivationToken = (user) => {
    return jwt.sign(user, process.env.ACTIVATION_SECRET, {
        expiresIn: "5m",
    });
};

//activate user 
router.post("/activation",catchAsyncErrors(async(req, res, next) =>{
    try{
        const {activation_token} = req.body;
        const newUser = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);

        if(!newUser){
            return next(new ErrorHandler("Mã token không hợp lệ: ",400));
        }
        
        const { name, email, password, avatar } = newUser;

        let user = await User.findOne({email});
        if(user){
            return next(new ErrorHandler("Người dùng đã tồn tại",400));
        }

        user = await User.create({
            name,
            email,
            password,
            avatar,
        });
        sendToken(user,201,res);

    }catch(err){
        return next(new ErrorHandler(err.message,500));
    }
}))

//Login user
router.post("/login-user",catchAsyncErrors(async(req, res, next) => {
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return next(new ErrorHandler("Vui lòng cung cấp thông tin chính xác!",400));
        }

        const user = await User.findOne({email}).select("+password");
        if(!user){
            return next(new ErrorHandler("Người dùng không tồn tại!",400));
        }

        const isPasswordValid = await user.comparePassword(password);
        if(!isPasswordValid){
            return next(new ErrorHandler("Vui lòng cung cấp thông tin chính xác!",400));
        }

        sendToken(user,201,res);
    }catch(err) {
        return next(new ErrorHandler(err.message,500));
    }
}))

// Load user
router.get("/getuser",isAuthenticated,catchAsyncErrors(async(req,res,next)=>{
    try{
        const user = await User.findById(req.user.id);
        if(!user){
            return next(new ErrorHandler("Người dùng không tồn tại!",400));
        }

        res.status(200).json({
            success: true,
            user,
        })
    }catch(err){
        return next(new ErrorHandler(err.message,500));
    }
}));

// Log out user
router.get("/logout",isAuthenticated,catchAsyncErrors(async(req,res,next)=>{
    try{
        res.cookie("token",null,{
            expires: new Date(Date.now()),
            httpOnly: true,
        })
        res.status(201).json({
            success: true,
            message: "User logged out successfully!"
        });

    }catch(err){
        return next(new ErrorHandler(err.message,500));
    }
}));

module.exports = router;