const express = require("express");
const path = require("path");
const router = express.Router();
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../ultils/sendMail");
const sendToken = require("../ultils/jwtToken");
const sendShopToken = require("../ultils/ShopToken");
const { isSeller, isAdmin, isAuthenticated } = require("../middleware/auth");
const Shop = require("../model/shop");
const ErrorHandler = require("../ultils/ErrorHandler");
const { upload } = require("../multer");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create shop
router.post("/create-shop", upload.single("file"), async (req, res, next) => {
  try {
    const { email } = req.body;
    const sellerEmail = await Shop.findOne({ email });
    if (sellerEmail) {
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
    const seller = {
      name: req.body.name,
      email: email,
      password: req.body.password,
      avatar: fileUrl,
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      zipCode: req.body.zipCode,
    };

    const activationToken = createActivationToken(seller);

    const activationUrl = `https://e-commerse-website-a913-d1jcnum6k-doanminhdang93.vercel.app/seller/activation/${activationToken}`;

    try {
      await sendMail({
        email: seller.email,
        subject: "Kích hoạt tài khoản của bạn",
        message: `Xin chào ${seller.name}, Vui lòng bấm vào đường link để kích hoạt tài khoản của bạn: ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `Vui lòng kiểm tra email của bạn:- ${seller.email} để kích hoạt tài khoản`,
      });
    } catch (err) {
      return next(new ErrorHandler(err.message, 500));
    }
  } catch (err) {
    return next(new ErrorHandler(err.message, 400));
  }
});

// create activation token
const createActivationToken = (seller) => {
  return jwt.sign(seller, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

//activate seller
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;
      const newSeller = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!newSeller) {
        return next(new ErrorHandler("Mã token không hợp lệ: ", 400));
      }

      const { name, email, password, avatar, zipCode, address, phoneNumber } =
        newSeller;

      let seller = await Shop.findOne({ email });
      if (seller) {
        return next(new ErrorHandler("Người dùng đã tồn tại", 400));
      }

      seller = await Shop.create({
        name,
        email,
        password,
        avatar,
        zipCode,
        address,
        phoneNumber,
      });
      sendShopToken(seller, 201, res);
    } catch (err) {
      return next(new ErrorHandler(err.message, 500));
    }
  })
);

// Login shop
router.post(
  "/login-shop",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return next(
          new ErrorHandler("Vui lòng cung cấp thông tin chính xác!", 400)
        );
      }

      const seller = await Shop.findOne({ email }).select("+password");
      if (!seller) {
        return next(new ErrorHandler("Người dùng không tồn tại!", 400));
      }

      const isPasswordValid = await seller.comparePassword(password);
      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Vui lòng cung cấp thông tin chính xác!", 400)
        );
      }

      sendShopToken(seller, 201, res);
    } catch (err) {
      return next(new ErrorHandler(err.message, 500));
    }
  })
);

// Load seller
router.get(
  "/getSeller",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const seller = await Shop.findById(req.seller._id);
      if (!seller) {
        return next(new ErrorHandler("Người dùng không tồn tại!", 400));
      }

      res.status(200).json({
        success: true,
        seller,
      });
    } catch (err) {
      return next(new ErrorHandler(err.message, 500));
    }
  })
);

// Log out from shop
router.get(
  "/logout",
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie("seller_token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });
      res.status(201).json({
        success: true,
        message: "User logged out successfully!",
      });
    } catch (err) {
      return next(new ErrorHandler(err.message, 500));
    }
  })
);

// get shop info
router.get(
  "/get-shop-info/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shop = await Shop.findById(req.params.id);
      res.status(201).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//update shop profile picture
router.put(
  "/update-shop-avatar",
  isSeller,
  upload.single("image"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const existsSeller = await Shop.findById(req.seller._id);

      const existsAvatarPath = `uploads/${existsSeller.avatar}`;

      fs.unlinkSync(existsAvatarPath);
      const fileUrl = path.join(req.file.filename);
      const seller = await Shop.findByIdAndUpdate(req.seller._id, {
        avatar: fileUrl,
      });

      res.status(200).json({ success: true, seller });
    } catch (err) {
      return next(new ErrorHandler(err.message, 500));
    }
  })
);

// update seller info
router.put(
  "/update-seller-info",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { name, description, address, phoneNumber, zipCode } = req.body;

      const shop = await Shop.findOne(req.seller._id);

      if (!shop) {
        return next(new ErrorHandler("Không tìm thấy người dùng!", 400));
      }

      shop.name = name;
      shop.description = description;
      shop.address = address;
      shop.phoneNumber = phoneNumber;
      shop.zipCode = zipCode;

      await shop.save();

      res.status(201).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//all sellers for admin
router.get("/admin-all-sellers",isAuthenticated,isAdmin("admin"),catchAsyncErrors(async(req,res,next)=>{
  try{
    const sellers = await Shop.find().sort({
      createdAt: -1
    })
    res.status(201).json({
      success: true,
      sellers
    })
  }catch(err){
    return next(new ErrorHandler(err.message, 500));
  }
}))

//delete seller ---admin
router.delete("/delete-seller/:id",isAuthenticated,isAdmin("admin"),catchAsyncErrors(async(req,res,next)=>{
  try{
    const seller = await Shop.findById(req.params.id);
    if(!seller){
      return next(new ErrorHandler("Người dùng không đúng với ID này!",400));
    }
    await Shop.findByIdAndDelete(req.params.id);
    res.status(201).json({
      success: true,
      message: "Xoá người bán thành công!"
    })
  }catch(err){
    return next(new ErrorHandler(err.message, 500));
  }
}))

//update seller withdraw methods --- sellers
router.put("/update-payment-methods",isSeller,catchAsyncErrors(async(req,res,next)=>{
  try{
    const {withdrawMethod} = req.body;
    const seller = await Shop.findByIdAndUpdate(req.seller._id,{
      withdrawMethod,
    })
    res.status(201).json({
      success: true,
      seller,
    })
  }catch(err){
    return next(new ErrorHandler(err.message, 500));
  }
}))

// delete seller withdraw methods --- only seller
router.delete(
  "/delete-withdraw-method/",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const seller = await Shop.findById(req.seller._id);

      if (!seller) {
        return next(new ErrorHandler("Không tìm thấy người bán này!", 400));
      }

      seller.withdrawMethod = null;

      await seller.save();

      res.status(201).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
