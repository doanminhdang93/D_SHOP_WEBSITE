const express = require('express');
const router = express.Router();
const Product = require('../model/product');
const ErrorHandler = require("../ultils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Shop = require('../model/shop');
const {upload} = require('../multer');


//Create product
router.post("/create-product",upload.array("images"), catchAsyncErrors((async(req, res, next) => {
    try {
        const shopId = req.body.shopId;
        const shop = await Shop.findById(shopId);
        if(!shop) {
            return next (new ErrorHandler("Shop ID is invalid!",400));
        }else{
            const files = req.files;
            const imageUrls = files.map((file) => `${file.filename}`);
            const productData = req.body;
            productData.images = imageUrls;
            productData.shop = shop;

            const product = await Product.create(productData);

            res.status(201).json({
                success: true,
                product,
            });
        }
    }catch(err) {
        return next (new ErrorHandler(error,400));
    }
})));

//Get all products of the shop
router.get('/get-all-products-shop/:id', catchAsyncErrors(async(req, res, next)=> {
    try{
        const products = await Product.find({shopId: req.params.id});

        res.status(201).json({
            success: true,
            products,
        })
    }catch(err) {
        return next (new ErrorHandler(err,400));
    }
}));

//delete product of the shop
router.delete("/delete-shop-product/:id", catchAsyncErrors(async(req, res, next)=> {
    try{
        const productId = req.params.id;

        const product = await Product.findByIdAndDelete(productId);

        if(!product){
            return next(new ErrorHandler("Không tìm thấy sản phẩm!",500));
        }

        res.status(200).json({
            success: true,
            message: "Đã xoá sản phẩm thành công!",
        })

    }catch(err) {
        return next (new ErrorHandler(err,400));
    }
}));

module.exports = router;