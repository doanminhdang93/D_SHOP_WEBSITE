const express = require("express");
const router = express.Router();
const ErrorHandler = require("../ultils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Shop = require("../model/shop");
const { isSeller } = require("../middleware/auth");
const CouponCode = require("../model/couponCode");

// create coupon code
router.post(
  "/create-coupon-code",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const isCouponCodeExists = await CouponCode.find({
        name: req.body.name,
      });

      if (isCouponCodeExists.length !== 0) {
        return next(new ErrorHandler("Mã giảm giá đã tồn tại!", 400));
      }

      const couponCode = await CouponCode.create(req.body);

      res.status(201).json({
        success: true,
        couponCode,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all coupons of a shop
router.get(
  "/get-coupon/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const couponCodes = await CouponCode.find({ shopId: req.seller.id });
      res.status(201).json({
        success: true,
        couponCodes,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// delete coupon code of a shop
router.delete(
  "/delete-coupon/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const couponCode = await CouponCode.findByIdAndDelete(req.params.id);

      if (!couponCode) {
        return next(new ErrorHandler("Mã giảm giá không tồn tại!", 400));
      }
      res.status(201).json({
        success: true,
        message: "Đã xoá mã giảm giá thành công!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

//get coupon code value by name
router.get("/get-coupon-value/:name",catchAsyncErrors(async(req, res, next) => {
  try{
    const couponCode = await CouponCode.findOne({name: req.params.name});
    res.status(200).json({
      success: true,
      couponCode
    })
  }catch(error) {
    return next(new ErrorHandler(error, 400));
  }
}))

module.exports = router;
