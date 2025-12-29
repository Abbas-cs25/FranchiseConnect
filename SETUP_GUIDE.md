# FranchiseConnect - Setup Guide

Complete step-by-step guide to get the FranchiseConnect application running on your local machine.

## Prerequisites

Before you start, ensure you have installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (local or MongoDB Atlas)
- [Git](https://git-scm.com/) (optional)
- A code editor like [VS Code](https://code.visualstudio.com/)

---

## Backend Setup (Node.js + Express + MongoDB)

### Step 1: Navigate to Backend Folder

Open a terminal and navigate to the backend folder:

```bash
cd d:\FranchiseConnect\franchiseconnect-backend
```

### Step 2: Install Dependencies

Install all required npm packages:

```bash
npm install
```

This will install:
- express (web server)
- mongoose (database)
- bcryptjs (password hashing)
- jsonwebtoken (authentication)
- multer (file uploads)
- nodemailer (email)
- dotenv (environment variables)
- cors (cross-origin requests)

### Step 3: Create .env File

Create a new file named `.env` in the `franchiseconnect-backend` folder with the following content:

```
# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/franchiseconnect

# JWT Configuration
JWT_SECRET=your_secret_key_12345_change_this_in_production

# Email Configuration (for notifications)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password_from_gmail

# Server Port
PORT=5000

# Environment
NODE_ENV=development
```

#### Important: Gmail App Password

To send emails, you need:
1. Gmail account
2. 2-factor authentication enabled on Gmail
3. App password (not your regular password)

[How to create Gmail App Password](https://support.google.com/accounts/answer/185833)

### Step 4: Start MongoDB

**Option A: Local MongoDB**
```bash
# Windows
mongod

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

**Option B: MongoDB Atlas (Cloud)**
- Update `MONGO_URI` in .env with your Atlas connection string

### Step 5: Start Backend Server

```bash
npm run dev
```

You should see:
```
Server running on port 5000
Connected to MongoDB
```

✅ Backend is now running on `http://localhost:5000`

---

## Frontend Setup (React + Vite)

### Step 1: Open New Terminal

Open a new terminal window (keep backend running).

### Step 2: Navigate to Frontend Folder

```bash
cd d:\FranchiseConnect\frontend
```

### Step 3: Install Dependencies

```bash
npm install
```

This will install:
- react (UI library)
- react-router-dom (routing)
- axios (API calls)
- vite (build tool)

### Step 4: Start Frontend Server

```bash
npm run dev
```

You should see:
```
  VITE v4.x.x  ready in xxx ms
  ➜  Local:   http://localhost:5173/
```

✅ Frontend is now running on `http://localhost:5173`

---

## Verification

### Test Backend API

Open a new terminal and test the backend:

```bash
curl http://localhost:5000/api/brands
```

You should get a JSON response with an empty brands array.

### Test Frontend

Open your browser and go to:
- `http://localhost:5173`

You should see the FranchiseConnect login page.

### Verify Database Connection

Check MongoDB:

```bash
mongo
> use franchiseconnect
> db.users.find()
```

---

## Quick Test Walkthrough

### 1. Register as Investor

1. Click "Register" on the login page
2. Fill in all required fields:
   - Upload a JPG profile photo
   - First Name: John
   - Last Name: Doe
   - Email: john@example.com
   - Mobile: 9876543210
   - State: Karnataka
   - City: Bangalore
   - Password: Investor@123
3. Select "Investor" as user type
4. Click Register
5. You should be redirected to Dashboard

### 2. Register as Brand Owner

1. Go back to login page
2. Click Register
3. Fill in all required fields:
   - First Name: Brand
   - Last Name: Owner
   - Email: owner@example.com
   - Mobile: 9123456789
   - Password: Owner@123
4. Select "Brand Owner" as user type
5. Click Register
6. You should be redirected to Dashboard

### 3. Upload a Brand (as Brand Owner)

1. Log in as the Brand Owner user
2. Click "Upload Brand" button in navbar (Brand Owners only)
3. Fill in brand details:
   - Brand Name: Pizza Palace
   - Category: Food & Beverages
   - Investment Min: 100000
   - Investment Max: 500000
   - Franchise Outlets: 50
4. Upload logo and photos (JPG files)
5. Click Submit
6. Brand should appear in dashboard

### 4. Browse & Favorite Brands (as Investor)

1. Log in as the Investor user
2. You should see the uploaded brand in dashboard
3. Click "Add to Favorites" button
4. Click on brand card to see details
5. Click "Favorites" in navbar to see your favorites

### 5. Send Interest Request

1. As Investor, click on a brand to see details
2. Fill in interest request form with your details
3. Click "Send Interest Request"
4. Email notification should be sent to brand owner

---

## Troubleshooting

### Problem: "Cannot find module 'express'"
**Solution:** Run `npm install` in backend folder

### Problem: "MONGO_URI is not defined"
**Solution:** Create .env file with MONGO_URI in backend folder

### Problem: "Connection refused" (MongoDB)
**Solution:** Start MongoDB service or check connection string

### Problem: "CORS error" in console
**Solution:** Check that backend is running on port 5000

### Problem: Images not uploading
**Solution:** 
- Ensure file is JPG format
- File size is less than 5MB
- Check backend logs for upload errors

### Problem: "Invalid token" error
**Solution:** Clear localStorage and log in again
```javascript
// In browser console:
localStorage.clear()
```

### Problem: Emails not sending
**Solution:** 
- Verify EMAIL_USER and EMAIL_PASS in .env
- Use Gmail app password (not regular password)
- Enable "Less secure app access" if needed

---

## Project Structure Review

```
FranchiseConnect/
├── franchiseconnect-backend/
│   ├── config/          # Configuration files (DB, Cloudinary, etc.)
│   ├── controllers/      # Business logic
│   ├── middleware/       # Auth, upload, error handlers
│   ├── models/          # Database schemas
│   ├── routes/          # API endpoints
│   ├── utils/           # Helper functions
│   ├── .env             # Environment variables (CREATE THIS)
│   ├── package.json     # Dependencies
│   └── server.js        # Entry point
│
└── frontend/
    ├── public/          # Static files
    ├── src/
    │   ├── components/   # Reusable components
    │   ├── pages/        # Full page components
    │   ├── services/     # API service
    │   ├── App.jsx       # Main app with routing
    │   ├── main.jsx      # React entry point
    │   └── index.css     # Global styles
    ├── package.json      # Dependencies
    └── vite.config.js    # Build configuration
```

---

## Common Ports

| Service | Port | URL |
|---------|------|-----|
| Frontend | 5173 | http://localhost:5173 |
| Backend | 5000 | http://localhost:5000 |
| MongoDB | 27017 | localhost:27017 |

---

## API Testing

### Using REST Client (VS Code Extension)

1. Install REST Client extension in VS Code
2. Create `test.http` file
3. Add requests:

```http
### Register User
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "John@123",
  "mobile": "9876543210",
  "userType": "Investor"
}

### Login
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "John@123"
}

### Get All Brands
GET http://localhost:5000/api/brands
```

---

## Database Verification

### Connect to MongoDB

```bash
# Using mongo shell
mongo

# Or if you have MongoDB Compass, open it and connect to:
# mongodb://localhost:27017
```

### Check Collections

```javascript
// In mongo shell
use franchiseconnect
show collections
db.users.find()
db.brands.find()
db.favorites.find()
db.interests.find()
```

---

## Production Checklist

Before deploying to production:

- [ ] Change `JWT_SECRET` to a strong random string
- [ ] Set `NODE_ENV=production`
- [ ] Use MongoDB Atlas instead of local MongoDB
- [ ] Set up proper email credentials
- [ ] Enable HTTPS/SSL
- [ ] Configure CORS for production domain
- [ ] Set up error logging
- [ ] Implement rate limiting
- [ ] Add input validation
- [ ] Test all features thoroughly

---

## Useful Commands

### Backend Commands
```bash
cd franchiseconnect-backend
npm install          # Install dependencies
npm run dev          # Start development server
npm start            # Start production server
npm test             # Run tests (if configured)
```

### Frontend Commands
```bash
cd frontend
npm install          # Install dependencies
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

### MongoDB Commands
```bash
mongod               # Start MongoDB service
mongo                # Connect to MongoDB
quit()               # Exit mongo shell
```

---

## Next Steps

1. ✅ Complete backend setup and start server
2. ✅ Complete frontend setup and start server
3. ✅ Test registration and login flow
4. ✅ Upload a test brand
5. ✅ Test search and filtering
6. ✅ Add CSS styling (see STYLING_GUIDE.md)
7. ⏳ Set up email notifications
8. ⏳ Deploy to hosting service

---

## Support & Help

### Check Logs

**Backend Logs:**
Look at terminal where `npm run dev` is running

**Frontend Logs:**
Open browser DevTools (F12) and check Console tab

**MongoDB Logs:**
Check terminal where `mongod` is running

### Debug Mode

**Node.js Debug:**
```bash
node --inspect server.js
```

**React DevTools:**
Install [React DevTools Chrome Extension](https://chrome.google.com/webstore)

---

## Password Requirements

The application requires strong passwords:
- Minimum 8 characters
- At least 1 uppercase letter (A-Z)
- At least 1 lowercase letter (a-z)
- At least 1 number (0-9)
- At least 1 special character (!@#$%^&*)

Example: `MyPass@123`

---

## File Size Limits

- Profile Photo: 5MB max (JPG)
- Brand Logo: 5MB max (JPG)
- Brand Photos: 5MB max per photo (JPG)
- Total upload: 50MB per request

---

## Browser Compatibility

Tested on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## Getting Help

If you encounter issues:

1. Check the troubleshooting section above
2. Review logs in terminal
3. Check MongoDB connection
4. Verify .env file has all required variables
5. Clear browser cache and localStorage
6. Restart both frontend and backend servers

---

Good luck with FranchiseConnect! 🚀

For questions or issues, refer to COMPLETE_DOCUMENTATION.md or check the API endpoints in the backend routes.
