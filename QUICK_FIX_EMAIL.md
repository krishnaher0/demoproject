# 🚀 Quick Fix: Enable Password Reset Emails

## Current Status
- ✅ **Registration**: Works WITHOUT email verification
- ✅ **Login**: Works WITHOUT email verification  
- ❌ **Password Reset**: Cannot send emails (needs Gmail App Password)

---

## 🔧 Quick Fix (5 minutes)

### 1️⃣ Enable 2-Factor Authentication
Visit: https://myaccount.google.com/security
- Click "2-Step Verification"
- Follow prompts to enable it

### 2️⃣ Generate App Password
Visit: https://myaccount.google.com/apppasswords
- Select: **Mail** + **Other (Custom name)**
- Name it: **EventQueue**
- Click **Generate**
- Copy the 16-character password (e.g., `abcdefghijklmnop`)

### 3️⃣ Update .env File
Open: `server/.env`

Change this line:
```env
EMAIL_PASS=REPLACE_WITH_YOUR_APP_PASSWORD
```

To (use your actual password, no spaces):
```env
EMAIL_PASS=abcdefghijklmnop
```

### 4️⃣ Restart Server
```bash
# Stop server (Ctrl+C)
# Then restart:
npm start
```

You should see: `✅ Email service ready to send messages`

---

## ✅ After Setup

Test password reset:
1. Go to: http://localhost:3000/forgot-password
2. Enter: krishna613460@gmail.com
3. Check your Gmail for the code
4. Enter code and reset password

---

## 📚 Detailed Guide
See: `GMAIL_APP_PASSWORD_SETUP.md` for complete instructions

---

**Note**: Registration and login already work! This is ONLY needed for password reset emails.
