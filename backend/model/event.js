const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,"Vui lòng nhập tên sự kiện của sản phẩm!"],
    },
    description:{
        type: String,
        required: [true,"Vui lòng nhập mô tả sự kiện!"],
    },
    category:{
        type: String,
        required: [true,"Vui lòng chọn loại sản phẩm cho sự kiện!"],
    },
    tags:{
        type: String,
    },
    originalPrice:{
        type: Number,
    },
    discountPrice:{
        type: Number,
        required: [true,"Vui lòng nhập giá sản phẩm!"],
    },
    stock:{
        type: Number,
        required: [true,"Vui lòng nhập số lượng sản phẩm còn trong kho!"],
    },
    start_Date:{
        type:Date,
        required: true,
    },
    finish_Date:{
        type:Date,
        required: true,
    },
    status:{
        type: String,
        default: 'Running',
    },
    images:[
        {
            type: String,
        },
    ],
    shopId:{
        type: String,
        required: true,
    },
    shop:{
        type:Object,
        required: true,
    },
    sold_out:{
        type: Number,
        default: 0,
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    }
})

module.exports = mongoose.model('Event',eventSchema);