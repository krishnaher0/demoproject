# 🧪 Email Configuration Test

## Quick Test Your Gmail App Password

I've created a test endpoint to help you verify if your Gmail App Password is working.

---

## 🚀 How to Test

### Option 1: Using curl (Terminal)

Open a new terminal and run:

```bash
curl -X POST http://localhost:5001/api/test/test-email \
  -H "Content-Type: application/json"
```

### Option 2: Using Browser Console

1. Open your browser
2. Go to: `http://localhost:5173` (or any page)
3. Open Developer Tools (F12)
4. Go to Console tab
5. Paste this code and press Enter:

```javascript
fetch('http://localhost:5001/api/test/test-email', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' }
})
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error(err));
```

---

## 📊 What to Expect

### ✅ If Email Works (Success):

**Console Output:**
```json
{
  "success": true,
  "message": "Email sent successfully! Check your inbox.",
  "messageId": "...",
  "recipient": "krishna613460@gmail.com"
}
```

**Server Terminal:**
```
✅ Email connection verified successfully!
✅ Test email sent successfully! Message ID: ...
```

**Your Gmail Inbox:**
- You'll receive an email with subject: "✅ EventQueue Email Test - Success!"
- This confirms your App Password is working!

---

### ❌ If Email Fails (Invalid App Password):

**Console Output:**
```json
{
  "success": false,
  "error": "Invalid login: 535-5.7.8 Username and Password not accepted...",
  "suggestion": "Your Gmail App Password is incorrect. Please generate a new one at: https://myaccount.google.com/apppasswords",
  "help": "See GMAIL_APP_PASSWORD_SETUP.md for detailed instructions"
}
```

**Server Terminal:**
```
❌ Email test failed: Invalid login: 535-5.7.8 ...
```

**What to do:**
Your App Password is incorrect. Follow the steps below to generate a new one.

---

## 🔧 If Test Fails - Generate New App Password

### Step 1: Enable 2-Factor Authentication (if not already)
1. Go to: https://myaccount.google.com/security
2. Click "2-Step Verification"
3. Follow the prompts to enable it

### Step 2: Generate New App Password
1. Go to: https://myaccount.google.com/apppasswords
2. Sign in if prompted
3. Under "Select app": Choose **Mail**
4. Under "Select device": Choose **Other (Custom name)**
5. Type: **EventQueue**
6. Click **Generate**
7. **Copy the 16-character password** (e.g., `abcd efgh ijkl mnop`)
   - ⚠️ **Important**: Remove all spaces when copying!

### Step 3: Update .env File
1. Open: `server/.env`
2. Find line 5: `EMAIL_PASS=tzyvpaddbplokjlh`
3. Replace with your new password (no spaces):
   ```env
   EMAIL_PASS=abcdefghijklmnop
   ```
4. Save the file

### Step 4: Restart Server
Stop the server (Ctrl+C in terminal) and restart:
```bash
npm start
```

### Step 5: Test Again
Run the test command again (Option 1 or 2 above)

---

## 🎯 After Successful Test

Once the test email works:

1. ✅ Your Gmail App Password is configured correctly
2. ✅ Password reset emails will work
3. ✅ You can now use the forgot password feature

### Test Forgot Password Flow:
1. Go to: `http://localhost:5173/forgot-password`
2. Enter: `krishna613460@gmail.com`
3. Click "Send Reset Code"
4. Check your Gmail inbox for the 6-digit code
5. Enter the code and reset your password

---

## 📝 Current Configuration

**File**: `server/.env`

```env
EMAIL_USER=krishna613460@gmail.com
EMAIL_PASS=tzyvpaddbplokjlh  ← This might be incorrect
EMAIL_FROM=EventQueue <krishna613460@gmail.com>
```

---

## ❓ Troubleshooting

### "Missing credentials" error
- Check that `EMAIL_USER` and `EMAIL_PASS` are set in `.env`
- Make sure there are no typos

### "Invalid login" error
- Your App Password is incorrect or expired
- Generate a new App Password (see steps above)
- Make sure 2FA is enabled on your Google account

### "Connection timeout" error
- Check your internet connection
- Make sure Gmail isn't blocked by firewall

### Still not working?
- Try using a different email service (like SendGrid or Mailgun)
- Or disable email functionality and use SMS instead

---

## 🔗 Quick Links

- [Google Account Security](https://myaccount.google.com/security)
- [App Passwords](https://myaccount.google.com/apppasswords)
- [Detailed Setup Guide](./GMAIL_APP_PASSWORD_SETUP.md)

---

**Run the test now to see if your email is working!** 🚀
