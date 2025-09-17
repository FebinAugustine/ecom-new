import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    image: {
      type: String,
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
      minlength: 10,
      maxlength: 10,
    },
    address: {
      type: String,
    },
    delivery_address: {
      type: String,
    },
    role: {
      type: String,
      required: true,
      default: "user",
    },
    cart: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart",
      },
    ],
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Wishlist",
      },
    ],
    liked: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Liked",
      },
    ],
    refresh_token: {
      type: String,
    },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    invoices: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Invoice",
      },
    ],
    is_verified: {
      type: Boolean,
      default: false,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    frgt_pwd_reset_code: {
      type: String,
    },
    frgt_pwd_reset_code_expiry: {
      type: Date,
    },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// create JWT Access Token
userSchema.methods.createAccessToken = function () {
  return jwt.sign({ _id: this._id, role: this.role }, process.env.AT_SECRET, {
    expiresIn: process.env.AT_EXPIRY,
  });
};

// create JWT Refresh Token
userSchema.methods.createRefreshToken = function () {
  return jwt.sign({ _id: this._id }, process.env.RT_SECRET, {
    expiresIn: process.env.RT_EXPIRY,
  });
};

const User = mongoose.model("User", userSchema);

export default User;
