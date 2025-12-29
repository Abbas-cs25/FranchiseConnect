# FranchiseConnect - Troubleshooting Guide

Complete guide to solve common problems and issues.

---

## 🔴 Critical Issues

### Issue: Backend Won't Start

**Symptoms**: Terminal shows errors when running `npm run dev`

**Solutions**:

1. **Missing Dependencies**
```bash
cd franchiseconnect-backend
npm install
npm run dev
```

2. **MongoDB Not Running**
- Windows: Open Command Prompt and run `mongod`
- Mac: Run `brew services start mongodb-community`
- Linux: Run `sudo systemctl start mongod`
- Or use MongoDB Atlas (cloud) - update MONGO_URI in .env

3. **Port 5000 Already in Use**
```bash
# Check what's using port 5000
# Windows
netstat -ano | findstr :5000

# Mac/Linux
lsof -i :5000

# Change PORT in .env to 5001 or 5002
```

4. **Missing .env File**
- Create file: `franchiseconnect-backend/.env`
- Add required variables:
```
MONGO_URI=mongodb://localhost:27017/franchiseconnect
JWT_SECRET=your_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
PORT=5000
NODE_ENV=development
```

5. **Node Version Mismatch**
```bash
# Check Node version (should be 14+)
node --version

# Update Node if needed: https://nodejs.org/
```

---

### Issue: Frontend Won't Start

**Symptoms**: Terminal shows errors when running `npm run dev`

**Solutions**:

1. **Missing Dependencies**
```bash
cd frontend
npm install
npm run dev
```

2. **Port 5173 Already in Use**
```bash
# Kill process or change port in vite.config.js
```

3. **Node Modules Corrupted**
```bash
cd frontend
rm -rf node_modules
rm package-lock.json
npm install
npm run dev
```

---

### Issue: Can't Connect to MongoDB

**Symptoms**: Backend shows "MongoDB connection error"

**Solutions**:

1. **MongoDB Not Running**
   - Windows: Run `mongod` in PowerShell
   - Mac: Run `brew services start mongodb-community`
   - Linux: Run `sudo systemctl start mongod`

2. **Wrong Connection String in .env**
   - Local: `mongodb://localhost:27017/franchiseconnect`
   - Atlas: `mongodb+srv://username:password@cluster.mongodb.net/franchiseconnect`

3. **Firewall Blocking Connection**
   - Windows: Allow MongoDB through Windows Defender
   - Mac/Linux: Check firewall settings

4. **MongoDB Not Installed**
   - Download from https://www.mongodb.com/try/download/community
   - Install and restart terminal

---

## 🟡 Common Issues

### Issue: CORS Error in Browser

**Symptoms**: Console shows "Access to XMLHttpRequest blocked by CORS policy"

**Solutions**:

1. **Backend Not Running**
   - Make sure backend is running on port 5000
   - Check terminal: should show "Server running on port 5000"

2. **Wrong API URL in Frontend**
   - Check `frontend/src/services/api.js`
   - Should have: `const API_BASE_URL = "http://localhost:5000/api";`

3. **CORS Not Enabled in Backend**
   - Check `franchiseconnect-backend/server.js`
   - Should have: `app.use(cors())`

4. **Firewall Blocking Connection**
   - Windows Defender might block backend
   - Add exceptions in firewall settings

---

### Issue: Login Fails

**Symptoms**: "Invalid email or password" error after entering credentials

**Solutions**:

1. **Wrong Email or Password**
   - Passwords are case-sensitive
   - Check if caps lock is on
   - Verify email was registered correctly

2. **User Doesn't Exist**
   - Register first before trying to login
   - Check spelling of email address

3. **Database Issue**
   - Restart backend: Stop and run `npm run dev` again
   - Check MongoDB is running

4. **JWT Issues**
   - Clear browser storage: Open DevTools (F12) → Application → Clear localStorage
   - Try logging in again

---

### Issue: Can't Register User

**Symptoms**: Registration form won't submit or shows errors

**Solutions**:

1. **Validation Errors**
   - Check password meets requirements (8 chars, upper, lower, number, special)
   - Check email format is correct
   - Check mobile is 10 digits
   - Check pincode is 6 digits

2. **Duplicate Email**
   - Email already registered
   - Use different email address

3. **File Upload Failed**
   - Profile photo must be JPG format
   - File size must be less than 5MB
   - Don't upload PNG, GIF, or other formats

4. **Backend Error**
   - Check backend terminal for error message
   - Check MongoDB is running
   - Check .env file has all required variables

---

### Issue: Images Not Uploading

**Symptoms**: Profile photo or brand photos won't upload

**Solutions**:

1. **Wrong File Format**
   - Only JPG format is accepted
   - Convert PNG to JPG
   - Don't use JPEG2000, WebP, GIF, etc.

2. **File Too Large**
   - Max 5MB per file
   - Compress image using:
     - Windows: right-click → Compress
     - Mac: use Preview app → Export
     - Online: tinypng.com

3. **Multer Not Working**
   - Check `franchiseconnect-backend/middleware/uploadMiddleware.js`
   - Restart backend: `npm run dev`

4. **Backend Memory Issue**
   - If uploading very large file, backend might run out of memory
   - Restart backend
   - Reduce file size

5. **Permissions Issue**
   - Check MongoDB has write permissions
   - Restart MongoDB service

---

### Issue: Password Reset Not Working

**Symptoms**: "Verification failed" or password reset doesn't work

**Solutions**:

1. **Incorrect Details**
   - Verify email matches registered email
   - Gender, DOB, State, City, Pincode must match exactly
   - Check capitalization

2. **Wrong Date Format**
   - Use YYYY-MM-DD format (example: 1990-01-15)
   - Don't use MM/DD/YYYY format

3. **Session Expired**
   - Reset token expires after 30 minutes
   - Start password reset process again

4. **Database Issue**
   - Restart backend
   - Make sure MongoDB is running

---

### Issue: Email Notifications Not Sending

**Symptoms**: Interest request sent but email not received

**Solutions**:

1. **Email Credentials Wrong**
   - Check EMAIL_USER and EMAIL_PASS in .env
   - Must be Gmail account with 2FA enabled
   - EMAIL_PASS must be app password, not regular password
   - [Get Gmail App Password](https://support.google.com/accounts/answer/185833)

2. **Gmail Settings**
   - Enable 2-factor authentication on Gmail
   - Create app-specific password
   - Some Gmail accounts block "less secure" apps

3. **Check Spam Folder**
   - Gmail might block first email
   - Check spam/junk folder
   - Mark email as "not spam"

4. **Restart Backend**
   - Stop backend: Press Ctrl+C
   - Start again: `npm run dev`
   - Try sending email again

---

## 🔵 Frontend Issues

### Issue: Page Not Loading

**Symptoms**: Blank page or "Cannot GET /"

**Solutions**:

1. **Wrong URL**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000
   - Check port number in terminal output

2. **Frontend Not Running**
   - Check terminal for `npm run dev` output
   - Should show: "Local: http://localhost:5173"
   - Restart: `npm run dev`

3. **Browser Cache**
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
   - Clear cache: DevTools → Application → Clear storage

4. **React Error**
   - Open browser console (F12)
   - Look for red error messages
   - Check terminal for error details

---

### Issue: Styles Not Loading

**Symptoms**: Page looks unstyled (no colors, fonts wrong)

**Solutions**:

1. **CSS Files Not Created**
   - Check if `Dashboard.css` exists in `frontend/src/`
   - Create CSS files following CSS_STYLING_GUIDE.md

2. **CSS Not Imported**
   - Check `App.jsx` imports CSS files
   - Should have: `import './App.css'`
   - Hard refresh browser: Ctrl+Shift+R

3. **CSS Has Syntax Errors**
   - Open browser DevTools (F12)
   - Check Console tab for errors
   - Look for red messages about CSS

4. **Vite Not Reloading**
   - Save CSS file again
   - Sometimes Vite needs manual refresh: Ctrl+Shift+R

---

### Issue: Search/Filter Not Working

**Symptoms**: Search box doesn't filter brands

**Solutions**:

1. **API Not Called**
   - Check backend is running
   - Open browser DevTools → Network tab
   - Type in search, watch for API call
   - Should see `GET /api/brands/search?keyword=...`

2. **No Brands in Database**
   - Create a brand first (as Brand Owner)
   - Upload brand with logo and photos
   - Then search should find it

3. **Query Parameters Wrong**
   - Check `brandAPI.searchBrands()` in `api.js`
   - Should send keyword parameter
   - Check backend receives it

4. **Frontend Logic Issue**
   - Check `Dashboard.jsx` has search logic
   - Open console (F12) for JavaScript errors

---

### Issue: Can't Add to Favorites

**Symptoms**: Heart button doesn't work or error appears

**Solutions**:

1. **Not Logged In**
   - Must login before adding favorites
   - Check localStorage has token
   - Logout and login again

2. **Duplicate Favorite**
   - Same user can't favorite same brand twice
   - Remove from favorites first, then add again

3. **API Error**
   - Open browser console (F12)
   - Check error message
   - May need to restart backend

4. **Brand ID Missing**
   - Make sure you're clicking on actual brand card
   - Not placeholder/empty card

---

### Issue: Interest Request Not Sending

**Symptoms**: "Send Interest Request" button doesn't work

**Solutions**:

1. **Not an Investor**
   - Only Investors can send interest requests
   - Log in as Investor, not Brand Owner
   - Check your user type in profile

2. **Form Validation**
   - All fields are required
   - Check all fields are filled (name, email, mobile, etc.)
   - Mobile must be 10 digits
   - Pincode must be 6 digits

3. **Already Sent**
   - Can't send multiple interest requests for same brand
   - Delete previous request (if possible)

4. **Backend Error**
   - Check backend terminal for error
   - Restart backend: `npm run dev`

---

## 🟢 Performance Issues

### Issue: App Loading Slowly

**Symptoms**: Page takes long time to load or display

**Solutions**:

1. **Too Many Images**
   - App is loading all brand images
   - Implement pagination (show 20 per page)
   - Lazy load images

2. **Large Image Files**
   - Optimize images before upload
   - Use tinypng.com to compress
   - Max 5MB per image (should be ~100-200KB)

3. **Network Slow**
   - Check internet connection
   - Check if downloading other files
   - Close other apps using bandwidth

4. **Database Slow**
   - May have too much data
   - Check MongoDB is running
   - Optimize queries

---

### Issue: Memory Issues

**Symptoms**: "Out of memory" error or app crashes

**Solutions**:

1. **Too Many Images in Memory**
   - Close other browser tabs
   - Restart browser
   - Don't keep many photos open

2. **Browser Cache Full**
   - Clear browser cache (DevTools → Application → Clear storage)
   - Restart browser

3. **Backend Out of Memory**
   - Restart backend: Stop and run `npm run dev` again
   - Limit upload file sizes

---

## 📊 Database Issues

### Issue: "Database Connection Error"

**Symptoms**: Error message about MongoDB connection

**Solutions**:

1. **MongoDB Not Running**
   ```bash
   # Windows
   mongod
   
   # Mac
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   ```

2. **Wrong Connection String**
   - Check MONGO_URI in .env
   - For local: `mongodb://localhost:27017/franchiseconnect`

3. **Port Conflict**
   - MongoDB default port is 27017
   - Check if another app is using it

4. **Network Issue**
   - If using MongoDB Atlas, check internet connection
   - Whitelist IP in Atlas: https://www.mongodb.com/docs/atlas/security-whitelist/

---

### Issue: Data Not Saving

**Symptoms**: Enter data but it doesn't appear after refresh

**Solutions**:

1. **MongoDB Not Running**
   - Start MongoDB service
   - Check connection shows "Connected to MongoDB"

2. **No Permission**
   - Check MongoDB has write permissions
   - Check user has write access to database

3. **Validation Failed**
   - Check backend terminal for validation error
   - All required fields must have values

---

## 🔐 Security Issues

### Issue: "Invalid Token" Error

**Symptoms**: Can't access protected pages, token errors

**Solutions**:

1. **Token Expired**
   - Tokens expire after 7 days
   - Logout and login again
   - New token will be generated

2. **Token Corrupted**
   - Clear localStorage: DevTools → Application → Clear storage
   - Logout and login again

3. **Multiple Logins**
   - Log out from other devices/tabs
   - Only one active token at a time

4. **Wrong JWT_SECRET**
   - Check JWT_SECRET in .env
   - Must be same when backend starts
   - Restart backend

---

### Issue: Unauthorized Access

**Symptoms**: 403 Forbidden error or can't access page

**Solutions**:

1. **Not Logged In**
   - Must login first
   - Check if token in localStorage
   - Logout and login

2. **Wrong User Type**
   - Brand Owners can't do investor things
   - Investors can't upload brands
   - Check user type in profile

3. **Insufficient Permissions**
   - Can only edit your own brands
   - Can only see your own profile
   - Brand owners get different menu

---

## 🛠️ Advanced Troubleshooting

### Check Backend Logs

```bash
# Terminal output shows logs
# Look for:
# - "Server running on port 5000"
# - "Connected to MongoDB"
# - Any red error messages

# To save logs to file:
npm run dev > logs.txt 2>&1
```

### Check Frontend Console

```javascript
// Open browser DevTools (F12)
// Go to Console tab
// Look for red error messages
// JavaScript errors will show line numbers
```

### Check Network Requests

```javascript
// Open browser DevTools (F12)
// Go to Network tab
// Try action (login, search, etc)
// Watch for API calls
// Click request to see response
// Red = error, Green = success
```

### Check Database Directly

```bash
# Connect to MongoDB
mongo

# Use database
use franchiseconnect

# View all users
db.users.find()

# View all brands
db.brands.find()

# Count documents
db.users.count()

# Exit
exit()
```

---

## 🔄 Recovery Steps

### Complete Reset (Start Fresh)

1. **Backend Reset**
```bash
# Stop backend (Ctrl+C)
cd franchiseconnect-backend
rm .env
# Create new .env with fresh values
npm run dev
```

2. **Database Reset**
```bash
# Connect to MongoDB
mongo
use franchiseconnect
db.dropDatabase()
exit
```

3. **Frontend Reset**
```bash
cd frontend
# Clear cache
rm -rf node_modules package-lock.json
npm install
npm run dev
```

4. **Browser Reset**
   - Clear cache (Ctrl+Shift+Delete)
   - Clear localStorage (F12 → Application → Clear storage)
   - Close and reopen browser

---

## 📞 Getting Help

### When You're Stuck:

1. **Read Error Message**
   - Check exact error text
   - Search error in documentation

2. **Check Logs**
   - Backend terminal
   - Browser console (F12)
   - Network tab in DevTools

3. **Review Documentation**
   - SETUP_GUIDE.md
   - COMPLETE_DOCUMENTATION.md
   - This troubleshooting guide

4. **Try Restart**
   - Stop backend (Ctrl+C)
   - Stop frontend (Ctrl+C)
   - Restart both services
   - Many issues fixed by restart

5. **Try Hard Refresh**
   - Clear browser cache
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
   - Logout and login again

---

## ✅ Verification Checklist

Before considering your setup broken:

- [ ] Node.js installed (node --version)
- [ ] MongoDB running (mongod or service)
- [ ] .env file exists with all variables
- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] Can open http://localhost:5173
- [ ] Can open http://localhost:5000
- [ ] Browser console shows no major errors
- [ ] Can register new user
- [ ] Can login

If all ✅, system is working!

---

## 💬 Common Questions

**Q: Can I use PostgreSQL instead of MongoDB?**
A: No, code is written for MongoDB. Would need major changes.

**Q: Can I use different port for frontend?**
A: Yes, edit vite.config.js. But update api.js to match.

**Q: Can I deploy to Heroku?**
A: Yes, follow Heroku deployment guide. Use MongoDB Atlas for database.

**Q: How do I backup my database?**
A: Use MongoDB Compass or command: `mongodump --db franchiseconnect`

**Q: Can I add more fields to User model?**
A: Yes, update userModel.js and registration form.

---

This guide covers 95% of common issues. If you can't find your problem here, check the other documentation files.

Good luck! 🎉
