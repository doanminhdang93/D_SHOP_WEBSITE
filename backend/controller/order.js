const express = require("express");
const router = express.Router();
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { isAuthenticated, isSeller } = require("../middleware/auth");
const ErrorHandler = require("../ultils/ErrorHandler");
const Order = require("../model/order");
const Product = require("../model/product");

//create new order
router.post(
  "/create-order",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body;

      //group cart items by shopId
      const shopItemsMap = new Map();
      for (const item of cart) {
        const shopId = item.shopId;
        if (!shopItemsMap.has(shopId)) {
          shopItemsMap.set(shopId, []);
        }
        shopItemsMap.get(shopId).push(item);
      }

      //create an order for each shop
      const orders = [];
      for (const [shopId, items] of shopItemsMap) {
        const order = await Order.create({
          cart: items,
          shippingAddress,
          user,
          totalPrice,
          paymentInfo,
        });
        orders.push(order);
      }

      res.status(201).json({
        success: true,
        orders,
      });
    } catch (err) {
      return next(new ErrorHandler(err.message, 500));
    }
  })
);

//get all orders of user
router.get(
  "/get-all-orders/:userId",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const orders = await Order.find({ "user._id": req.params.userId }).sort({
        createAt: -1,
      });

      res.status(200).json({
        success: true,
        orders,
      });
    } catch (err) {
      return next(new ErrorHandler(err.message, 500));
    }
  })
);

//get all orders of seller
router.get(
  "/get-seller-all-orders/:shopId",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const orders = await Order.find({
        "cart.shopId": req.params.shopId,
      }).sort({
        createAt: -1,
      });

      res.status(200).json({
        success: true,
        orders,
      });
    } catch (err) {
      return next(new ErrorHandler(err.message, 500));
    }
  })
);

//update order status for seller
router.put(
  "/update-order-status/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return next(new ErrorHandler("Không tìm thấy đơn hàng!", 400));
      }
      if (req.body.status === "Đã bàn giao cho đơn vị vận chuyển") {
        order.cart.forEach(async (o) => {
          await updateOrder(o._id, o.qty);
        });
      }

      order.status = req.body.status;

      if (req.body.status === "Đã giao hàng") {
        order.deliveredAt = Date.now();
        order.paymentInfo.status = "Succeeded";
      }

      await order.save({ validateBeforeSave: false });

      async function updateOrder(id, qty) {
        const product = await Product.findById(id);
        product.stock -= qty;
        product.sold_out += qty;

        await product.save({ validateBeforeSave: false });
      }

      res.status(200).json({
        success: true,
        order,
      });
    } catch (err) {
      return next(new ErrorHandler(err.message, 500));
    }
  })
);

//give a refund --- user
router.put(
  "/order-refund/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return next(new ErrorHandler("Không tìm thấy đơn hàng!", 400));
      }

      order.status = req.body.status;

      await order.save({ validateBeforeSave: false });

      res.status(200).json({
        success: true,
        order,
        message: "Yêu cầu hoàn tiền hoá đơn thành công!",
      });
    } catch (err) {
      return next(new ErrorHandler(err.message, 500));
    }
  })
);

//accept the refund --- seller
router.put(
  "/order-refund-success/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return next(new ErrorHandler("Không tìm thấy đơn hàng!", 400));
      }

      order.status = req.body.status;

      await order.save();

      res.status(200).json({
        success: true,
        message: "Hoàn tiền đơn hàng thành công!",
      });

      if (req.body.status === "Hoàn tiền thành công") {
        order.cart.forEach(async (o) => {
          await updateOrder(o._id, o.qty);
        });
      }

      async function updateOrder(id, qty) {
        const product = await Product.findById(id);

        product.stock += qty;
        product.sold_out -= qty;

        await product.save({ validateBeforeSave: false });
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
