const express = require('express');
const router = express.Router();
const event = require('../model/event');
const ErrorHandler = require("../ultils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Shop = require('../model/shop');
const {upload} = require('../multer');
const Event = require('../model/event');
const { isSeller } = require("../middleware/auth");
const fs = require("fs");

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

            const event = await Event.create(eventData);

            res.status(201).json({
                success: true,
                event,
            });
        }
    }catch(err) {
        return next (new ErrorHandler(err,400));
    }
})));

//Get all events of the shop
router.get('/get-all-events-shop/:id', catchAsyncErrors(async(req, res, next)=> {
    try{
        const events = await Event.find({shopId: req.params.id});

        res.status(201).json({
            success: true,
            events,
        })
    }catch(err) {
        return next (new ErrorHandler(err,400));
    }
}));

//delete event of the shop
router.delete("/delete-shop-event/:id",isSeller,catchAsyncErrors(async(req, res, next)=> {
    try{
        const eventId = req.params.id;

        const eventData = await Event.findById(eventId);

        eventData.images.forEach((imageUrl)=>{
            const filename = imageUrl;
            const filePath = `uploads/${filename}`;

            fs.unlink(filePath, (err) => {
                if(err) {
                    console.log(err);
                }
            });
        });

        const event = await Event.findByIdAndDelete(eventId);

        if(!event){
            return next(new ErrorHandler("Không tìm thấy sự kiện nào!",500));
        }
        
        res.status(200).json({
            success: true,
            message: "Đã xoá sự kiện thành công!",
        })

    }catch(err) {
        return next (new ErrorHandler(err,400));
    }
}));

module.exports = router;