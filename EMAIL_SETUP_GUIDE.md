# Email Setup Guide for EventQueue

## Overview
This guide will help you set up email functionality for your EventQueue application using Gmail (krishna613460@gmail.com).

## Current Status
✅ **Navigation Flow Fixed:**
- After successful registration → Shows toast → Navigate to verification page
- After successful email verification → Shows toast → Navigate to login page
- Forgot password flow → Enter email → Verify reset code → Reset password

✅ **Toast Notifications Added:**
- Success toasts for registration and verification
- Error toasts for failed operations
- Configured with react-hot-toast

## Setting Up Gmail for Sending Emails

### Step 1: Enable 2-Factor Authentication (if not already enabled)
1. Go to your Google Account: https://myaccount.google.com/
2. Click on "Security" in the left sidebar
3. Under "Signing in to Google", click on "2-Step Verification"
4. Follow the prompts to enable 2FA

### Step 2: Generate App Password
1. Go to https://myaccount.google.com/apppasswords
2. You may need to sign in again
3. Under "Select app", choose "Mail"
4. Under "Select device", choose "Other (Custom name)"
5. Enter "EventQueue" as the name
6. Click "Generate"
7. **IMPORTANT:** Copy the 16-character password that appears (it will look like: `xxxx xxxx xxxx xxxx`)
8. Save this password securely - you won't be able to see it again

### Step 3: Install Nodemailer
Run this command in your server directory:
```bash
cd /Users/krishna613460gmail.com/Desktop/Projects/Events/server
npm install nodemailer
```

### Step 4: Update Environment Variables
Add these to your `/server/.env` file:
```env
EMAIL_USER=krishna613460@gmail.com
EMAIL_PASS=your_16_character_app_password_here
EMAIL_FROM=EventQueue <krishna613460@gmail.com>
```

### Step 5: Create Email Service
Create a new file: `/server/utils/emailService.js`

```javascript
const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Verify connection
transporter.verify((error, success) => {
    if (error) {
        console.log('Email service error:', error);
    } else {
        console.log('Email service ready');
    }
});

// Send verification email
const sendVerificationEmail = async (email, code, name) => {
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Verify Your Email - EventQueue',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                    .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
                    .code { background: white; border: 2px solid #667eea; border-radius: 8px; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #667eea; margin: 20px 0; }
                    .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Welcome to EventQueue!</h1>
                    </div>
                    <div class="content">
                        <p>Hi ${name},</p>
                        <p>Thank you for signing up! Please use the verification code below to verify your email address:</p>
                        <div class="code">${code}</div>
                        <p>This code will expire in 10 minutes.</p>
                        <p>If you didn't create an account with EventQueue, please ignore this email.</p>
                    </div>
                    <div class="footer">
                        <p>© 2024 EventQueue. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Verification email sent to ${email}`);
        return true;
    } catch (error) {
        console.error('Error sending verification email:', error);
        throw error;
    }
};

// Send password reset email
const sendPasswordResetEmail = async (email, code, name) => {
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Reset Your Password - EventQueue',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                    .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
                    .code { background: white; border: 2px solid #667eea; border-radius: 8px; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #667eea; margin: 20px 0; }
                    .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Password Reset Request</h1>
                    </div>
                    <div class="content">
                        <p>Hi ${name},</p>
                        <p>We received a request to reset your password. Use the code below to reset your password:</p>
                        <div class="code">${code}</div>
                        <p>This code will expire in 10 minutes.</p>
                        <p>If you didn't request a password reset, please ignore this email and your password will remain unchanged.</p>
                    </div>
                    <div class="footer">
                        <p>© 2024 EventQueue. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Password reset email sent to ${email}`);
        return true;
    } catch (error) {
        console.error('Error sending password reset email:', error);
        throw error;
    }
};

module.exports = {
    sendVerificationEmail,
    sendPasswordResetEmail
};
```

### Step 6: Update User Controller
In `/server/controllers/userController.js`, replace the console.log statements with actual email sending:

**For registration (around line 44-45):**
```javascript
// Replace this:
console.log(`Verification code for ${email}: ${verificationCode}`);

// With this:
const emailService = require('../utils/emailService');
try {
    await emailService.sendVerificationEmail(email, verificationCode, name);
} catch (emailError) {
    console.error('Failed to send verification email:', emailError);
    // Continue anyway - user can still use the code
}
```

**For password reset (around line 196-197):**
```javascript
// Replace this:
console.log(`Password reset code for ${email}: ${resetCode}`);

// With this:
try {
    await emailService.sendPasswordResetEmail(email, resetCode, user.name);
} catch (emailError) {
    console.error('Failed to send reset email:', emailError);
    // Continue anyway
}
```

## Testing Email Functionality

### Test Registration Flow:
1. Go to http://localhost:5173/signup
2. Fill in the form with your details
3. Submit the form
4. Check your email (krishna613460@gmail.com) for the verification code
5. Enter the code on the verification page
6. You should see a success toast and be redirected to login

### Test Password Reset Flow:
1. Go to http://localhost:5173/login
2. Click "Forgot password?"
3. Enter your email
4. Check your email for the reset code
5. Enter the code on the verification page
6. Set your new password

## Troubleshooting

### Email not sending?
1. **Check App Password**: Make sure you copied the 16-character app password correctly
2. **Check .env file**: Ensure EMAIL_USER and EMAIL_PASS are set correctly
3. **Check Gmail settings**: Make sure 2FA is enabled
4. **Check server logs**: Look for error messages in the terminal

### Common Errors:
- **"Invalid login"**: Your app password is incorrect
- **"Authentication failed"**: 2FA might not be enabled
- **"Connection timeout"**: Check your internet connection

## Security Notes

⚠️ **IMPORTANT:**
- Never commit your `.env` file to Git
- Keep your app password secure
- The app password is different from your Gmail password
- If compromised, revoke the app password and generate a new one

## Current Flow Summary

1. **Registration:**
   - User fills signup form
   - Account created in database
   - ✅ Toast: "Account created successfully! Please verify your email."
   - Email sent with verification code
   - Navigate to verification page

2. **Email Verification:**
   - User enters 6-digit code
   - Code verified
   - ✅ Toast: "Email verified successfully! You can now login."
   - Navigate to login page

3. **Login:**
   - User enters credentials
   - If not verified, redirect to verification page
   - If verified, login successful and navigate to home

4. **Forgot Password:**
   - User clicks "Forgot password?" on login page
   - Navigate to forgot password page
   - Enter email
   - Email sent with reset code
   - Navigate to verify reset page
   - Enter code
   - Navigate to reset password page
   - Set new password
   - Navigate to login

## Next Steps

1. Install nodemailer: `npm install nodemailer`
2. Generate Gmail app password
3. Update .env file
4. Create emailService.js
5. Update userController.js
6. Test the flow!

---

**Need Help?**
If you encounter any issues, check the server console logs for detailed error messages.
