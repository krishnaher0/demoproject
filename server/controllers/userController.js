const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const { sendPasswordResetEmail } = require('../utils/emailService');

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'eventqueue_secret_key_2024', {
        expiresIn: '30d',
    });
};

// Generate 6-digit verification code
const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, phone, password, role } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    // Create user with auto-verification (no email verification required)
    const user = await User.create({
        name,
        email,
        phone,
        password,
        role: role || 'user',
        isVerified: true // Auto-verify users on registration
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            isVerified: user.isVerified,
            token: generateToken(user._id),
            message: 'Registration successful! You can now login.'
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Verify email with code
// @route   POST /api/users/verify
// @access  Public
const verifyEmail = asyncHandler(async (req, res) => {
    const { email, code } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    if (user.isVerified) {
        res.status(400);
        throw new Error('Email already verified');
    }

    if (user.verificationCode !== code) {
        res.status(400);
        throw new Error('Invalid verification code');
    }

    if (new Date() > user.verificationCodeExpires) {
        res.status(400);
        throw new Error('Verification code has expired');
    }

    user.isVerified = true;
    user.verificationCode = null;
    user.verificationCodeExpires = null;
    await user.save();

    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
        token: generateToken(user._id),
        message: 'Email verified successfully'
    });
});

// @desc    Resend verification code
// @route   POST /api/users/resend-verification
// @access  Public
const resendVerificationCode = asyncHandler(async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    if (user.isVerified) {
        res.status(400);
        throw new Error('Email already verified');
    }

    const verificationCode = generateVerificationCode();
    user.verificationCode = verificationCode;
    user.verificationCodeExpires = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    // Send verification email
    try {
        await sendVerificationEmail(email, verificationCode, user.name);
        console.log(`✅ Verification email resent to ${email}`);
    } catch (emailError) {
        console.error('❌ Failed to resend verification email:', emailError.message);
    }

    res.json({
        message: 'Verification code sent to your email',
        verificationCode: verificationCode // Remove in production
    });
});

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            isVerified: user.isVerified,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// @desc    Forgot password - send reset code
// @route   POST /api/users/forgot-password
// @access  Public
const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    const resetCode = generateVerificationCode();
    user.resetPasswordCode = resetCode;
    user.resetPasswordExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    await user.save();

    // Send password reset email
    try {
        await sendPasswordResetEmail(email, resetCode, user.name);
        console.log(`✅ Password reset email sent to ${email}`);
    } catch (emailError) {
        console.error('❌ Failed to send password reset email:', emailError.message);
    }

    res.json({
        message: 'Password reset code sent to your email',
        email: user.email,
        resetCode: resetCode // Remove in production
    });
});

// @desc    Verify reset code
// @route   POST /api/users/verify-reset-code
// @access  Public
const verifyResetCode = asyncHandler(async (req, res) => {
    const { email, code } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    if (user.resetPasswordCode !== code) {
        res.status(400);
        throw new Error('Invalid reset code');
    }

    if (new Date() > user.resetPasswordExpires) {
        res.status(400);
        throw new Error('Reset code has expired');
    }

    res.json({
        message: 'Code verified successfully',
        email: user.email,
        verified: true
    });
});

// @desc    Reset password
// @route   POST /api/users/reset-password
// @access  Public
const resetPassword = asyncHandler(async (req, res) => {
    const { email, code, newPassword } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    if (user.resetPasswordCode !== code) {
        res.status(400);
        throw new Error('Invalid reset code');
    }

    if (new Date() > user.resetPasswordExpires) {
        res.status(400);
        throw new Error('Reset code has expired');
    }

    user.password = newPassword;
    user.resetPasswordCode = null;
    user.resetPasswordExpires = null;
    await user.save();

    res.json({
        message: 'Password reset successful',
        token: generateToken(user._id)
    });
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            isVerified: user.isVerified,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

module.exports = {
    registerUser,
    authUser,
    forgotPassword,
    verifyResetCode,
    resetPassword,
    getUserProfile
};
