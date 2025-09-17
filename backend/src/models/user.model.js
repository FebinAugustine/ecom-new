import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
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
        // Not required for OAuth users
        required: function() { return !this.googleId; },
        minlength: 6,
    },
    image: {
        type: String,
    },
    phone: {
        type: Number,
        // Not required for OAuth users
        required: function() { return !this.googleId; },
        unique: true,
        sparse: true, // Allows multiple null values for unique fields
        minlength: 10,
        maxlength: 10,
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true,
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
        default: 'user',
    },
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
    }],
    wishlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Wishlist',
    }],
    liked: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Liked',
    }],
    refresh_token: {
        type: String,
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
    }],
    invoices: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Invoice',
    }],
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
    email_verification_code: {
        type: String,
    },
    email_verification_code_expiry: {
        type: Date,
    },
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
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

// Method to generate access token
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            fullname: this.fullname,
            role: this.role
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
};

// Method to generate refresh token
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        { _id: this._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );
};

const User = mongoose.model('User', userSchema);

export default User;
