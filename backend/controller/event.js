const express = require('express');
const router = express.Router();
const Product = require('../model/product');
const ErrorHandler = require("../ultils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Shop = require('../model/shop');
const {upload} = require('../multer');
const Event = require('../model/event');

//Create event
router.post("/create-event",upload.array("images"), catchAsyncErrors((async(req, res, next) => {
    try {
        const shopId = req.body.shopId;
        const shop = await Shop.findById(shopId);
        if(!shop) {
            return next (new ErrorHandler("Shop ID is invalid!",400));
        }else{
            const files = req.files;
            const imageUrls = files.map((file) => `${file.filename}`);
            const eventData = req.body;
            eventData.images = imageUrls;
            eventData.shop = shop;

            const product = await Event.create(eventData);

            res.status(201).json({
                success: true,
                product,
            });
        }
    }catch(err) {
        return next (new ErrorHandler(error,400));
    }
})));

module.exports = router;