const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Verify connection on startup
transporter.verify((error, success) => {
    if (error) {
        console.log('❌ Email service error:', error.message);
    } else {
        console.log('✅ Email service ready to send messages');
    }
});

// Send verification email
const sendVerificationEmail = async (email, code, name) => {
    const mailOptions = {
        from: process.env.EMAIL_FROM || `EventQueue <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Verify Your Email - EventQueue',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    body { 
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                        line-height: 1.6; 
                        color: #333;
                        margin: 0;
                        padding: 0;
                        background-color: #f3f4f6;
                    }
                    .container { 
                        max-width: 600px; 
                        margin: 40px auto; 
                        background: white;
                        border-radius: 12px;
                        overflow: hidden;
                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    }
                    .header { 
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                        color: white; 
                        padding: 40px 30px; 
                        text-align: center;
                    }
                    .header h1 {
                        margin: 0;
                        font-size: 28px;
                        font-weight: 600;
                    }
                    .content { 
                        padding: 40px 30px;
                    }
                    .content p {
                        margin: 0 0 16px 0;
                        font-size: 16px;
                        color: #4b5563;
                    }
                    .code-container {
                        background: #f9fafb;
                        border: 2px dashed #667eea;
                        border-radius: 12px;
                        padding: 30px;
                        text-align: center;
                        margin: 30px 0;
                    }
                    .code { 
                        font-size: 36px;
                        font-weight: bold;
                        letter-spacing: 12px;
                        color: #667eea;
                        font-family: 'Courier New', monospace;
                    }
                    .code-label {
                        font-size: 14px;
                        color: #6b7280;
                        margin-bottom: 10px;
                        text-transform: uppercase;
                        letter-spacing: 1px;
                    }
                    .warning {
                        background: #fef3c7;
                        border-left: 4px solid #f59e0b;
                        padding: 16px;
                        margin: 20px 0;
                        border-radius: 4px;
                    }
                    .warning p {
                        margin: 0;
                        color: #92400e;
                        font-size: 14px;
                    }
                    .footer { 
                        text-align: center; 
                        padding: 30px;
                        background: #f9fafb;
                        border-top: 1px solid #e5e7eb;
                    }
                    .footer p {
                        margin: 5px 0;
                        color: #6b7280;
                        font-size: 14px;
                    }
                    .button {
                        display: inline-block;
                        padding: 12px 30px;
                        background: #667eea;
                        color: white;
                        text-decoration: none;
                        border-radius: 6px;
                        font-weight: 600;
                        margin: 20px 0;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>🎉 Welcome to EventQueue!</h1>
                    </div>
                    <div class="content">
                        <p>Hi <strong>${name}</strong>,</p>
                        <p>Thank you for signing up! We're excited to have you join our community of event enthusiasts.</p>
                        <p>To complete your registration, please verify your email address using the code below:</p>
                        
                        <div class="code-container">
                            <div class="code-label">Your Verification Code</div>
                            <div class="code">${code}</div>
                        </div>

                        <div class="warning">
                            <p><strong>⏰ Important:</strong> This code will expire in 10 minutes for security reasons.</p>
                        </div>

                        <p>If you didn't create an account with EventQueue, you can safely ignore this email.</p>
                    </div>
                    <div class="footer">
                        <p><strong>EventQueue</strong></p>
                        <p>Discover amazing events, connect with communities</p>
                        <p style="margin-top: 20px; font-size: 12px;">© 2024 EventQueue. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
        `
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`✅ Verification email sent to ${email} (Message ID: ${info.messageId})`);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('❌ Error sending verification email:', error.message);
        throw error;
    }
};

// Send password reset email
const sendPasswordResetEmail = async (email, code, name) => {
    const mailOptions = {
        from: process.env.EMAIL_FROM || `EventQueue <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Reset Your Password - EventQueue',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    body { 
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                        line-height: 1.6; 
                        color: #333;
                        margin: 0;
                        padding: 0;
                        background-color: #f3f4f6;
                    }
                    .container { 
                        max-width: 600px; 
                        margin: 40px auto; 
                        background: white;
                        border-radius: 12px;
                        overflow: hidden;
                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    }
                    .header { 
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                        color: white; 
                        padding: 40px 30px; 
                        text-align: center;
                    }
                    .header h1 {
                        margin: 0;
                        font-size: 28px;
                        font-weight: 600;
                    }
                    .content { 
                        padding: 40px 30px;
                    }
                    .content p {
                        margin: 0 0 16px 0;
                        font-size: 16px;
                        color: #4b5563;
                    }
                    .code-container {
                        background: #fef2f2;
                        border: 2px dashed #ef4444;
                        border-radius: 12px;
                        padding: 30px;
                        text-align: center;
                        margin: 30px 0;
                    }
                    .code { 
                        font-size: 36px;
                        font-weight: bold;
                        letter-spacing: 12px;
                        color: #ef4444;
                        font-family: 'Courier New', monospace;
                    }
                    .code-label {
                        font-size: 14px;
                        color: #6b7280;
                        margin-bottom: 10px;
                        text-transform: uppercase;
                        letter-spacing: 1px;
                    }
                    .warning {
                        background: #fef3c7;
                        border-left: 4px solid #f59e0b;
                        padding: 16px;
                        margin: 20px 0;
                        border-radius: 4px;
                    }
                    .warning p {
                        margin: 0;
                        color: #92400e;
                        font-size: 14px;
                    }
                    .security-note {
                        background: #dbeafe;
                        border-left: 4px solid #3b82f6;
                        padding: 16px;
                        margin: 20px 0;
                        border-radius: 4px;
                    }
                    .security-note p {
                        margin: 0;
                        color: #1e40af;
                        font-size: 14px;
                    }
                    .footer { 
                        text-align: center; 
                        padding: 30px;
                        background: #f9fafb;
                        border-top: 1px solid #e5e7eb;
                    }
                    .footer p {
                        margin: 5px 0;
                        color: #6b7280;
                        font-size: 14px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>🔐 Password Reset Request</h1>
                    </div>
                    <div class="content">
                        <p>Hi <strong>${name}</strong>,</p>
                        <p>We received a request to reset your password for your EventQueue account.</p>
                        <p>Use the code below to reset your password:</p>
                        
                        <div class="code-container">
                            <div class="code-label">Your Reset Code</div>
                            <div class="code">${code}</div>
                        </div>

                        <div class="warning">
                            <p><strong>⏰ Important:</strong> This code will expire in 10 minutes for security reasons.</p>
                        </div>

                        <div class="security-note">
                            <p><strong>🔒 Security Tip:</strong> If you didn't request a password reset, please ignore this email. Your password will remain unchanged and your account is secure.</p>
                        </div>
                    </div>
                    <div class="footer">
                        <p><strong>EventQueue</strong></p>
                        <p>Discover amazing events, connect with communities</p>
                        <p style="margin-top: 20px; font-size: 12px;">© 2024 EventQueue. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
        `
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`✅ Password reset email sent to ${email} (Message ID: ${info.messageId})`);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('❌ Error sending password reset email:', error.message);
        throw error;
    }
};

module.exports = {
    sendVerificationEmail,
    sendPasswordResetEmail
};
