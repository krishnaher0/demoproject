# Gmail App Password Setup Guide

## 🚨 Current Issue
**Error**: `535-5.7.8 Username and Password not accepted`

**Reason**: Gmail requires an App Password for third-party applications. Regular Gmail passwords don't work anymore for security reasons.

**Impact**: Password reset emails cannot be sent until this is configured.

---

## ✅ Solution: Generate Gmail App Password

Follow these steps carefully:

### **Step 1: Enable 2-Factor Authentication (2FA)**

1. Open your browser and go to: [https://myaccount.google.com/security](https://myaccount.google.com/security)
2. Sign in with your Google account: **krishna613460@gmail.com**
3. Look for **"Signing in to Google"** section
4. Click on **"2-Step Verification"**
5. If it's OFF, click **"Get Started"** and follow the prompts to enable it
6. You'll need to verify your phone number
7. Complete the setup

**Note**: You MUST enable 2FA before you can create App Passwords!

---

### **Step 2: Generate App Password**

1. Go to: [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
   - Or: Google Account → Security → 2-Step Verification → App passwords (at the bottom)

2. You might be asked to sign in again for security

3. You'll see a page titled **"App passwords"**

4. Under **"Select app"**, choose: **Mail**

5. Under **"Select device"**, choose: **Other (Custom name)**

6. Type: **EventQueue** (or any name you prefer)

7. Click **"Generate"**

8. Google will show you a **16-character password** in a yellow box
   - Example format: `abcd efgh ijkl mnop`
   - **IMPORTANT**: Copy this password immediately! You won't be able to see it again.

---

### **Step 3: Update Your .env File**

1. Open the file: `/Users/krishna613460gmail.com/Desktop/Projects/Events/server/.env`

2. Find this line:
   ```
   EMAIL_PASS=REPLACE_WITH_YOUR_APP_PASSWORD
   ```

3. Replace it with your 16-character App Password (remove spaces):
   ```
   EMAIL_PASS=abcdefghijklmnop
   ```
   **Note**: Remove all spaces from the password!

4. Save the file

---

### **Step 4: Restart Your Server**

After updating the `.env` file:

1. Stop your server (press `Ctrl+C` in the terminal)
2. Start it again:
   ```bash
   npm start
   ```

3. You should see:
   ```
   ✅ Email service configured successfully
   ```
   Instead of the error message.

---

## 🧪 **Test Password Reset**

Once configured, test the password reset flow:

1. Go to: `http://localhost:3000/forgot-password`
2. Enter your email: `krishna613460@gmail.com`
3. Click "Send Reset Code"
4. Check your Gmail inbox for the verification code
5. Enter the code and reset your password

---

## 🔒 **Security Notes**

- **App Passwords are safer** than using your regular Gmail password
- Each App Password is unique to one application
- You can revoke App Passwords anytime from your Google Account
- Never share your App Password publicly
- The App Password in your `.env` file is safe because `.env` is in `.gitignore`

---

## ❓ **Troubleshooting**

### **Problem**: Can't find "App passwords" option
**Solution**: Make sure 2-Step Verification is enabled first. App Passwords only appear after 2FA is enabled.

### **Problem**: Still getting authentication error after updating .env
**Solution**: 
1. Make sure you removed all spaces from the App Password
2. Restart your server completely
3. Check that the email in `EMAIL_USER` matches your Gmail account

### **Problem**: Not receiving emails
**Solution**:
1. Check your spam folder
2. Make sure the App Password is correct
3. Verify `EMAIL_USER` is set to `krishna613460@gmail.com`
4. Check server logs for any email errors

---

## 📋 **Your Current Configuration**

File: `server/.env`

```env
EMAIL_USER=krishna613460@gmail.com
EMAIL_PASS=REPLACE_WITH_YOUR_APP_PASSWORD  ← Update this!
EMAIL_FROM=EventQueue <krishna613460@gmail.com>
```

**What to do**:
1. Get your App Password from Google (steps above)
2. Replace `REPLACE_WITH_YOUR_APP_PASSWORD` with your actual 16-character password
3. Remove all spaces from the password
4. Save the file
5. Restart your server

---

## ✅ **After Setup**

Once configured correctly:

- ✅ Registration works WITHOUT email (already done!)
- ✅ Login works WITHOUT email (already done!)
- ✅ Password reset sends verification codes via email
- ✅ Users can reset their passwords using email codes

---

## 🔗 **Quick Links**

- [Google Account Security](https://myaccount.google.com/security)
- [App Passwords](https://myaccount.google.com/apppasswords)
- [Google 2-Step Verification Help](https://support.google.com/accounts/answer/185839)
- [App Passwords Help](https://support.google.com/accounts/answer/185833)

---

**Need Help?** If you're still having issues after following these steps, double-check:
1. ✅ 2FA is enabled on your Google account
2. ✅ App Password is generated and copied correctly
3. ✅ `.env` file is updated with the App Password (no spaces)
4. ✅ Server is restarted after updating `.env`
