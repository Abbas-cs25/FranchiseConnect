# FranchiseConnect - Complete Web Application

A full-stack franchise discovery and management platform built with React (frontend) and Node.js/Express (backend), with MongoDB database for storing all data including images.

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Installation & Setup](#installation--setup)
4. [Backend API Documentation](#backend-api-documentation)
5. [Frontend Pages](#frontend-pages)
6. [Database Schema](#database-schema)
7. [Features](#features)
8. [Image Handling](#image-handling)

## 🎯 Project Overview

FranchiseConnect is a complete franchise management system where:
- **Investors** can browse franchises, add favorites, send interest requests
- **Brand Owners** can upload franchises with full details and photos
- **Admin** can manage user registrations and brand listings
- All images (profile photos, brand logos, brand photos) are stored directly in MongoDB

## 🛠️ Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM (Object Data Modeling)
- **Multer** - File upload handling
- **Bcryptjs** - Password hashing
- **JWT** - Authentication tokens
- **Nodemailer** - Email notifications

### Frontend
- **React.js** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **CSS3** - Styling

## 📦 Installation & Setup

### Backend Setup

1. **Install Dependencies**
```bash
cd franchiseconnect-backend
npm install
```

2. **Create .env file** in backend root:
```
MONGO_URI=mongodb://localhost:27017/franchiseconnect
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
PORT=5000
```

3. **Start MongoDB**
```bash
# On Windows (if MongoDB is installed)
mongod

# Or using Docker
docker run -d -p 27017:27017 --name mongodb mongo
```

4. **Start Backend Server**
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. **Install Dependencies**
```bash
cd frontend
npm install
```

2. **Update API URL** (if needed) in `src/services/api.js`
```javascript
const API_BASE_URL = "http://localhost:5000/api";
```

3. **Start Frontend Development Server**
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 🔌 Backend API Documentation

### Authentication Endpoints

#### Register User
```
POST /api/auth/register
Content-Type: multipart/form-data

Body:
- profilePhoto: File (JPG)
- firstName: String (required)
- lastName: String (required)
- gender: String - "Male" | "Female" | "Other"
- dob: Date (YYYY-MM-DD)
- state: String
- city: String
- pinCode: String (6 digits)
- address: String
- qualification: String
- occupation: String
- mobile: String (10 digits, unique)
- email: String (unique)
- password: String (min 8 chars, upper, lower, number, special)
- confirmPassword: String
- userType: String - "Investor" | "Brand Owner"

Response:
{
  "message": "User registered successfully",
  "token": "JWT_TOKEN",
  "user": { _id, firstName, lastName, email, userType }
}
```

#### Login
```
POST /api/auth/login

Body:
{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "message": "Login successful",
  "token": "JWT_TOKEN",
  "user": { _id, firstName, lastName, email, userType }
}
```

#### Forgot Password - Verify Details
```
POST /api/auth/forgot-password/verify

Body:
{
  "email": "user@example.com",
  "gender": "Male",
  "dob": "1990-01-01",
  "state": "Karnataka",
  "city": "Bengaluru",
  "pinCode": "560001"
}

Response:
{
  "message": "Verification successful",
  "resetToken": "RESET_TOKEN"
}
```

#### Reset Password
```
POST /api/auth/reset-password

Body:
{
  "resetToken": "RESET_TOKEN",
  "newPassword": "NewPass@123",
  "confirmPassword": "NewPass@123"
}

Response:
{
  "message": "Password reset successfully"
}
```

### User Endpoints

#### Get User Profile
```
GET /api/users/profile
Headers: Authorization: Bearer JWT_TOKEN

Response:
{
  "user": {
    _id, firstName, lastName, email, mobile, userType,
    state, city, pinCode, address, gender, dob,
    qualification, occupation, profilePhoto (base64)
  }
}
```

#### Update User Profile
```
PUT /api/users/profile
Headers: Authorization: Bearer JWT_TOKEN
Content-Type: multipart/form-data

Body: (any of these fields)
{
  "firstName": "John",
  "lastName": "Doe",
  "mobile": "9876543210",
  "state": "Karnataka",
  "city": "Bangalore",
  "profilePhoto": File (optional)
}

Response: { message, user }
```

#### Get User's Brands (for Brand Owners)
```
GET /api/users/brands
Headers: Authorization: Bearer JWT_TOKEN

Response:
{
  "brands": [
    {
      _id, brandName, category, logo (base64), photos [...],
      investmentRange, aboutBrand, ...
    }
  ]
}
```

### Brand Endpoints

#### Get All Brands
```
GET /api/brands

Response:
{
  "brands": [
    {
      _id, brandName, category, subCategory, investmentRange,
      areaRequired, aboutBrand, logo (base64), photos [...],
      brandFee, anticipatedReturn, ownerId { firstName, lastName, email, mobile }
    }
  ]
}
```

#### Get Brand by ID
```
GET /api/brands/:id

Response:
{
  "brand": {
    _id, brandName, category, subCategory, investmentRange,
    locations, establishedYear, operationCommencedOn,
    franchiseCommencedOn, brandFee, anticipatedReturn,
    paybackPeriod, transferPeriod, isTermRenewable,
    headOfficeLocation, propertyTypeRequired, aboutBrand,
    logo (base64), photos [...],
    ownerId { firstName, lastName, email, mobile, state, city }
  }
}
```

#### Search Brands
```
GET /api/brands/search?keyword=pizza&category=Food&minInvestment=100000&maxInvestment=500000

Response: { brands: [...] }
```

#### Create Brand (Brand Owner Only)
```
POST /api/brands
Headers: Authorization: Bearer JWT_TOKEN
Content-Type: multipart/form-data

Body:
{
  "brandName": "FranchiseName",
  "category": "Food & Beverages",
  "subCategory": "QSR",
  "logo": File (JPG),
  "photos": File[1-5] (JPG),
  "investmentRange": { "min": 100000, "max": 500000 },
  "areaRequired": "500-1000 sqft",
  "franchiseOutlets": 50,
  "locations": ["Delhi", "Mumbai"],
  "establishedYear": 2010,
  "aboutBrand": "Description...",
  "operationCommencedOn": "2010-01-01",
  "franchiseCommencedOn": "2015-01-01",
  "brandFee": 50000,
  "anticipatedReturn": 25,
  "paybackPeriod": "2-3 years",
  "propertyTypeRequired": "Standalone/Mall",
  "headOfficeLocation": "Delhi",
  "transferPeriod": "5 years",
  "isTermRenewable": true
}

Response: { message, brand }
```

#### Update Brand (Brand Owner Only)
```
PUT /api/brands/:id
Headers: Authorization: Bearer JWT_TOKEN
Content-Type: multipart/form-data

Body: (same as create, partial update allowed)

Response: { message, brand }
```

#### Delete Brand
```
DELETE /api/brands/:id
Headers: Authorization: Bearer JWT_TOKEN

Response: { message }
```

### Favorite Endpoints

#### Add to Favorites
```
POST /api/favorites
Headers: Authorization: Bearer JWT_TOKEN

Body: { "brandId": "BRAND_ID" }

Response: { message, favorite }
```

#### Get Favorites
```
GET /api/favorites
Headers: Authorization: Bearer JWT_TOKEN

Response: { favorites: [...brands] }
```

#### Remove from Favorites
```
DELETE /api/favorites/:brandId
Headers: Authorization: Bearer JWT_TOKEN

Response: { message }
```

#### Check if Favorited
```
GET /api/favorites/:brandId/check
Headers: Authorization: Bearer JWT_TOKEN

Response: { isFavorited: true/false }
```

### Interest Request Endpoints

#### Create Interest Request
```
POST /api/interests
Headers: Authorization: Bearer JWT_TOKEN

Body:
{
  "brandId": "BRAND_ID",
  "name": "John Doe",
  "email": "john@example.com",
  "mobile": "9876543210",
  "state": "Karnataka",
  "city": "Bangalore",
  "pinCode": "560001",
  "address": "123 Main St",
  "investmentRange": "5-10 Lacs"
}

Response: { message, interest }
```

#### Get Brand Interest Requests (Brand Owner)
```
GET /api/interests/brand/:brandId
Headers: Authorization: Bearer JWT_TOKEN

Response:
{
  "interests": [
    {
      _id, investorId { firstName, lastName, email, mobile },
      brandId, name, email, mobile, status, createdAt
    }
  ]
}
```

#### Update Interest Status
```
PUT /api/interests/:interestId/status
Headers: Authorization: Bearer JWT_TOKEN

Body: { "status": "Reviewed" | "Approved" | "Rejected" }

Response: { message, interest }
```

## 👥 Frontend Pages

### 1. **Registration.jsx** - User Registration
- Accepts both Investor and Brand Owner registrations
- Requires: profile photo (JPG), personal details, location, contact info
- Password validation: 8+ chars with upper, lower, number, special char
- API: `authAPI.register(formData)`

### 2. **Login.jsx** - User Login
- Email and password authentication
- Stores JWT token in localStorage
- API: `authAPI.login(email, password)`

### 3. **ForgotPassword.jsx** - Password Reset
- Two-step verification: details verification → password reset
- Verifies: email, gender, DOB, state, city, pincode
- API: `authAPI.verifyForgotPassword()` → `authAPI.resetPassword()`

### 4. **Dashboard.jsx** - Main Dashboard
- Displays all active brands in a grid
- Search functionality by keyword
- Category filtering
- Favorite button on each brand card
- Navigation to brand details and profile

### 5. **BrandDetail.jsx** - Brand Information Page
- Complete brand details with all specifications
- Brand photos gallery
- Owner contact information
- Interest request form for investors
- API: `brandAPI.getBrandById()`, `interestAPI.createInterestRequest()`

### 6. **Profile.jsx** - User Profile
- View and edit user profile (except email)
- For Brand Owners: view and manage uploaded brands
- Upload new brand button
- Navigation to brand editing

### 7. **UploadBrand.jsx** - Brand Upload (Brand Owner)
- Complete brand form with all fields
- Logo upload (JPG)
- Up to 5 brand photos (JPG)
- Investment range, terms, locations
- API: `brandAPI.createBrand(formData)`

### 8. **Favorites.jsx** - Favorite Brands
- View all favorited brands
- Remove from favorites
- Quick navigation to brand details
- API: `favoriteAPI.getFavorites()`, `favoriteAPI.removeFavorite()`

## 💾 Database Schema

### User Model
```javascript
{
  profilePhoto: { data: Buffer, contentType: String },
  firstName: String (required),
  lastName: String (required),
  gender: String (Male/Female/Other),
  dob: Date,
  state: String,
  city: String,
  pinCode: String (6 digits),
  address: String,
  qualification: String,
  occupation: String,
  mobile: String (10 digits, unique),
  email: String (unique, required),
  password: String (hashed, required),
  userType: String (Investor/Brand Owner, required),
  isVerified: Boolean,
  createdAt, updatedAt: Timestamps
}
```

### Brand Model
```javascript
{
  ownerId: ObjectId (ref: User, required),
  brandName: String (required),
  logo: { data: Buffer, contentType: String },
  photos: [{ data: Buffer, contentType: String }] (max 5),
  category: String (required),
  subCategory: String (required),
  investmentRange: { min: Number, max: Number },
  areaRequired: String,
  franchiseOutlets: Number,
  locations: [String],
  establishedYear: Number,
  aboutBrand: String,
  operationCommencedOn: Date,
  franchiseCommencedOn: Date,
  brandFee: Number,
  anticipatedReturn: Number,
  paybackPeriod: String,
  otherInvestmentRequirements: String,
  expansionPlans: String,
  propertyTypeRequired: String,
  headOfficeLocation: String,
  transferPeriod: String,
  isTermRenewable: Boolean,
  isActive: Boolean (default: true),
  viewCount: Number (default: 0),
  createdAt, updatedAt: Timestamps
}
```

### Favorite Model
```javascript
{
  userId: ObjectId (ref: User, required),
  brandId: ObjectId (ref: Brand, required),
  createdAt, updatedAt: Timestamps
}
// Unique index on (userId, brandId)
```

### Interest Model
```javascript
{
  investorId: ObjectId (ref: User, required),
  brandId: ObjectId (ref: Brand, required),
  name: String (required),
  email: String (required),
  mobile: String (required),
  state: String (required),
  city: String (required),
  pinCode: String (required),
  address: String (required),
  investmentRange: String (required),
  status: String (Pending/Reviewed/Approved/Rejected),
  message: String,
  createdAt, updatedAt: Timestamps
}
```

## ✨ Features

### For Investors
- ✅ Register as investor
- ✅ Browse all franchise opportunities
- ✅ Search by keyword, category
- ✅ Filter by investment range
- ✅ View detailed brand information
- ✅ Add brands to favorites
- ✅ Send interest requests to brands
- ✅ Update profile information
- ✅ Password reset

### For Brand Owners
- ✅ Register as brand owner
- ✅ Upload brands with complete details
- ✅ Upload up to 5 brand photos + logo
- ✅ Manage uploaded brands
- ✅ View investor interest requests
- ✅ Update brand information
- ✅ Receive email notifications for inquiries
- ✅ Update profile information

### General Features
- ✅ Secure authentication with JWT
- ✅ Password hashing with bcryptjs
- ✅ Email notifications
- ✅ Image storage in MongoDB
- ✅ Responsive design
- ✅ Error handling
- ✅ Form validation
- ✅ Token-based authorization

## 🖼️ Image Handling

### How Images are Stored
All images are stored directly in MongoDB as binary data:

1. **Profile Photo**
   - Stored in `User.profilePhoto`
   - Stored as: `{ data: Buffer, contentType: "image/jpeg" }`
   - Max size: 5MB

2. **Brand Logo**
   - Stored in `Brand.logo`
   - Stored as: `{ data: Buffer, contentType: "image/jpeg" }`
   - Max size: 5MB

3. **Brand Photos**
   - Stored in `Brand.photos` array (up to 5)
   - Each photo: `{ data: Buffer, contentType: "image/jpeg" }`
   - Max size: 5MB per photo

### Converting Images for Frontend
Images are sent from backend as base64:
```javascript
// Backend response
{
  profilePhoto: "data:image/jpeg;base64,/9j/4AAQSkZJRg..."
}

// Frontend usage
<img src={profilePhoto} alt="Profile" />
```

## 🚀 How to Run

### Terminal 1 (Backend)
```bash
cd franchiseconnect-backend
npm install
npm run dev
```

### Terminal 2 (Frontend)
```bash
cd frontend
npm install
npm run dev
```

### Open in Browser
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`

## 📝 Test Users

You can create test users through the registration page, or use these test credentials (after creating):

### Investor Test User
- Email: investor@example.com
- Password: Investor@123

### Brand Owner Test User
- Email: owner@example.com
- Password: Owner@123

## 🔐 Security Notes

1. **Passwords** are hashed using bcryptjs (10 salt rounds)
2. **JWT tokens** expire after 7 days
3. **File uploads** are limited to JPG format
4. **File size** limited to 5MB per file
5. **Email** is validated and unique
6. **Mobile** number is unique
7. **Reset tokens** expire after 30 minutes

## 📧 Email Configuration

To enable email notifications for new interest requests:

1. Create a Gmail App Password
2. Update `.env`:
```
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

3. Nodemailer will send emails when investors submit interest requests

## 🤝 Contributing

Feel free to fork and submit pull requests!

## 📄 License

This project is open source and available for educational purposes.

---

**FranchiseConnect Team** - 2025
