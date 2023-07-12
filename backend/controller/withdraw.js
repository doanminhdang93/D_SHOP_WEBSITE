const Shop = require("../model/shop");
const ErrorHandler = require("../ultils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const express = require("express");
const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth");
const Withdraw = require("../model/withdraw");
const sendMail = require("../ultils/sendMail");
const router = express.Router();

// create withdraw request --- only for seller
router.post(
  "/create-withdraw-request",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { amount } = req.body;

      const data = {
        seller: req.seller,
        amount,
      };

      try {
        await sendMail({
          email: req.seller.email,
          subject: "Yêu cầu rút tiền",
          message: `Xin chào ${req.seller.name}, Yêu cầu rút ${amount}$ của bạn đang được xử lý. Sẽ mất khoảng 3-7 ngày để xử lý!`,
        });
        res.status(201).json({
          success: true,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }

      const withdraw = await Withdraw.create(data);

      // const shop = await Shop.findById(req.seller._id);

      // shop.availableBalance = shop.availableBalance - amount;

      // await shop.save();

      res.status(201).json({
        success: true,
        withdraw,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get all withdraws --- admin
router.get(
  "/get-all-withdraws-request",
  isAuthenticated,
  isAdmin("admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const withdraws = await Withdraw.find().sort({ createdAt: -1 });

      res.status(201).json({
        success: true,
        withdraws,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update withdraw request ---admin
router.put(
  "/update-withdraw-request/:id",
  isAuthenticated,
  isAdmin("admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { sellerId } = req.body;

      const withdraw = await Withdraw.findByIdAndUpdate(
        req.params.id,
        {
          status: "Thành công",
          updatedAt: Date.now(),
        },
        { new: true }
      );

      const seller = await Shop.findById(sellerId);

      const transaction = {
        _id: withdraw._id,
        amount: withdraw.amount,
        updatedAt: withdraw.updatedAt,
        status: withdraw.status,
      };

      seller.transactions = [...seller.transactions, transaction];
      seller.availableBalance -= withdraw.amount;

      await seller.save();

      try {
        await sendMail({
          email: seller.email,
          subject: "Xác nhận yêu cầu rút tiền",
          message: `Xin chào ${seller.name}, Yêu cầu rút ${withdraw.amount}$ của bạn đang được tiến hành. Thời gian dự kiến giao dịch thànḣ công trong khoảng từ 3-7 ngày. Nếu có bất cứ thắc mắc gì xin vui lòng liên hệ chúng tôi qua email này! Xin cảm ơn!`,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
      res.status(201).json({
        success: true,
        withdraw,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
