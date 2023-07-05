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
const { isAuthenticated, isAdmin } = require("../middleware/auth");

router.post("/create-user", upload.single("file"), async (req, res, next) => {
  try {
    const { name, email, password, phoneNumber } = req.body;
    const userEmail = await User.findOne({ email });

    if (userEmail) {
      const filename = req.file.filename;
      const filePath = `uploads/${filename}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "Lỗi khi xoá file" });
        }
      });
      return next(new ErrorHandler("Người dùng đã tồn tại!", 400));
    }

    const filename = req.file.filename;
    const fileUrl = path.join(filename);
    const user = {
      name: name,
      email: email,
      password: password,
      phoneNumber: phoneNumber,
      avatar: fileUrl,
    };
    console.log(user);

    // const newUser = await User.create(user);
    // res.status(201).json({
    //     success: true,
    //     newUser
    // })

    const activationToken = createActivationToken(user);

    const activationUrl = `https://d-shop-website-client.vercel.app/activation/${activationToken}`;

    try {
      await sendMail({
        email: user.email,
        subject: "Kích hoạt tài khoản của bạn",
        message: `Xin chào ${user.name}, Vui lòng bấm vào đường link để kích hoạt tài khoản của bạn: ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `Vui lòng kiểm tra email của bạn:- ${user.email} để kích hoạt tài khoản`,
      });
    } catch (err) {
      return next(new ErrorHandler(err.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// create activation token
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

//activate user
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;
      const newUser = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!newUser) {
        return next(new ErrorHandler("Mã token không hợp lệ: ", 400));
      }

      const { name, email, password, phoneNumber, avatar } = newUser;

      let user = await User.findOne({ email });
      if (user) {
        return next(new ErrorHandler("Người dùng đã tồn tại", 400));
      }

      user = await User.create({
        name,
        email,
        password,
        phoneNumber,
        avatar,
      });
      sendToken(user, 201, res);
    } catch (err) {
      return next(new ErrorHandler(err.message, 500));
    }
  })
);

//Login user
router.post(
  "/login-user",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return next(
          new ErrorHandler("Vui lòng cung cấp thông tin chính xác!", 400)
        );
      }

      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        return next(new ErrorHandler("Người dùng không tồn tại!", 400));
      }

      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Vui lòng cung cấp thông tin chính xác!", 400)
        );
      }

      sendToken(user, 201, res);
    } catch (err) {
      return next(new ErrorHandler(err.message, 500));
    }
  })
);

// Load user
router.get(
  "/getuser",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return next(new ErrorHandler("Người dùng không tồn tại!", 400));
      }

      res.status(200).json({
        success: true,
        user,
      });
    } catch (err) {
      return next(new ErrorHandler(err.message, 500));
    }
  })
);

// Log out user
router.get(
  "/logout",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });
      res.status(201).json({
        success: true,
        message: "Người dùng đã đăng xuất thành công!",
      });
    } catch (err) {
      return next(new ErrorHandler(err.message, 500));
    }
  })
);

//update user information
router.put(
  "/update-user-info",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password, phoneNumber, name } = req.body;
      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("Không tìm thấy người dùng!", 400));
      }

      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Vui lòng cung cấp thông tin chính xác", 400)
        );
      }

      user.name = name;
      user.email = email;
      user.phoneNumber = phoneNumber;

      await user.save();

      res.status(201).json({
        success: true,
        user,
      });
    } catch (err) {
      return next(new ErrorHandler(err.message, 500));
    }
  })
);

//update user avatar
router.put(
  "/update-avatar",
  isAuthenticated,
  upload.single("image"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const existsUser = await User.findById(req.user.id);

      const existsAvatarPath = `uploads/${existsUser.avatar}`;

      fs.unlinkSync(existsAvatarPath);
      const fileUrl = path.join(req.file.filename);
      const user = await User.findByIdAndUpdate(req.user.id, {
        avatar: fileUrl,
      });

      res.status(200).json({ success: true, user });
    } catch (err) {
      return next(new ErrorHandler(err.message, 500));
    }
  })
);

//update user addresses
router.put(
  "/update-user-addresses",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
      const sameTypeAddress = user.addresses.find(
        (address) => address.addressType === req.body.addressType
      );
      if (sameTypeAddress) {
        return next(new ErrorHandler(`${req.body.addressType} đã tồn tại!`));
      }
      const existsAddress = user.addresses.find(
        (address) => address._id === req.body._id
      );
      if (existsAddress) {
        Object.assign(existsAddress, req.body);
      } else {
        //add new address to the array
        user.addresses.push(req.body);
      }
      await user.save();

      res.status(200).json({
        success: true,
        user,
      });
    } catch (err) {
      return next(new ErrorHandler(err.message, 500));
    }
  })
);

//delete user address
router.delete(
  "/delete-user-address/:id",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const userID = req.user._id;
      const addressID = req.params.id;

      await User.updateOne(
        {
          _id: userID,
        },
        { $pull: { addresses: { _id: addressID } } }
      );

      const user = await User.findById(userID);

      res.status(200).json({
        success: true,
        user,
      });
    } catch (err) {
      return next(new ErrorHandler(err.message, 500));
    }
  })
);

//update user password
router.put(
  "/update-user-password",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id).select("+password");
      const isPasswordMatched = await user.comparePassword(
        req.body.oldPassword
      );
      if (!isPasswordMatched) {
        return next(new ErrorHandler("Mật khẩu cũ không đúng!", 400));
      }
      if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("Mật khẩu không đúng!", 400));
      }
      user.password = req.body.newPassword;

      await user.save();
      res.status(200).json({
        success: true,
        message: "Mật khẩu đã được cập nhật thành công!",
      });
    } catch (err) {
      return next(new ErrorHandler(err.message, 500));
    }
  })
);

//find user info with userId
router.get("/user-info/:id",catchAsyncErrors(async(req, res, next) => {
  try{
    const user = await User.findById(req.params.id);
    res.status(201).json({
      success: true,
      user
    })
  }catch(err){
    return next(new ErrorHandler(err.message, 500));
  }
}))

//all users for admin
router.get("/admin-all-users",isAuthenticated,isAdmin("admin"),catchAsyncErrors(async(req,res,next)=>{
  try{
    const users = await User.find().sort({
      createdAt: -1
    })
    res.status(201).json({
      success: true,
      users
    })
  }catch(err){
    return next(new ErrorHandler(err.message, 500));
  }
}))

//delete user ---admin
router.delete("/delete-user/:id",isAuthenticated,isAdmin("admin"),catchAsyncErrors(async(req,res,next)=>{
  try{
    const user = await User.findById(req.params.id);
    if(!user){
      return next(new ErrorHandler("Người dùng không đúng với ID này!",400));
    }
    await User.findByIdAndDelete(req.params.id);
    res.status(201).json({
      success: true,
      message: "Xoá người dùng thành công!"
    })
  }catch(err){
    return next(new ErrorHandler(err.message, 500));
  }
}))

module.exports = router;

