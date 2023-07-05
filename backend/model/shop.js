const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const shopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Vui lòng nhập tên cửa hàng!"],
  },
  email: {
    type: String,
    required: [true, "Vui lòng nhập email cửa hàng!"],
  },
  password: {
    type: String,
    required: [true, "Vui lòng nhập mật khẩu"],
    minLength: [4, "Mật khẩu phải lớn hơn 4 ký tự"],
    select: false,
  },
  phoneNumber: {
    type: Number,
  },

  description: {
    type: String,
  },

  address: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    default: "seller",
  },

  phoneNumber: {
    type: String,
    required: true,
  },

  avatar: {
    type: String,
    required: true,
  },

  zipCode: {
    type: Number,
    required: true,
  },

  withdrawMethod: {
    type: Object,
  },

  availableBalance: {
    type: Number,
    default: 0,
  },
  transactions: [
    {
      amount: {
        type: Number,
        required: true,
      },
      status: {
        type: String,
        default: "Đang xử lý",
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
      updatedAt: {
        type: Date,
      },
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now(),
  },
  resetPasswordToken: String,
  resetPasswordTime: Date,
});

//  Hash password
shopSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// jwt token
shopSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

// compare password
shopSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Shop", shopSchema);
