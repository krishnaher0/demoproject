const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Test email endpoint
router.post('/test-email', async (req, res) => {
    try {
        // Create transporter with current env variables
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Verify connection
        await transporter.verify();
        console.log('✅ Email connection verified successfully!');

        // Send test email
        const info = await transporter.sendMail({
            from: process.env.EMAIL_FROM || `EventQueue <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER, // Send to yourself
            subject: '✅ EventQueue Email Test - Success!',
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #4CAF50;">✅ Email Configuration Successful!</h2>
                    <p>Great news! Your Gmail App Password is working correctly.</p>
                    <p><strong>Configuration Details:</strong></p>
                    <ul>
                        <li>Email: ${process.env.EMAIL_USER}</li>
                        <li>Service: Gmail</li>
                        <li>Status: ✅ Connected</li>
                    </ul>
                    <p>You can now use the password reset feature!</p>
                    <hr>
                    <p style="color: #666; font-size: 12px;">This is a test email from EventQueue</p>
                </div>
            `
        });

        console.log(`✅ Test email sent successfully! Message ID: ${info.messageId}`);

        res.json({
            success: true,
            message: 'Email sent successfully! Check your inbox.',
            messageId: info.messageId,
            recipient: process.env.EMAIL_USER
        });

    } catch (error) {
        console.error('❌ Email test failed:', error.message);

        let errorMessage = error.message;
        let suggestion = '';

        if (error.message.includes('Invalid login')) {
            suggestion = 'Your Gmail App Password is incorrect. Please generate a new one at: https://myaccount.google.com/apppasswords';
        } else if (error.message.includes('Missing credentials')) {
            suggestion = 'EMAIL_USER or EMAIL_PASS is not set in your .env file';
        }

        res.status(500).json({
            success: false,
            error: errorMessage,
            suggestion: suggestion,
            help: 'See GMAIL_APP_PASSWORD_SETUP.md for detailed instructions'
        });
    }
});

module.exports = router;
