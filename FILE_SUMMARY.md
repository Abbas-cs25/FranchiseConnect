# FranchiseConnect - Complete File Summary

Comprehensive list of all files in the FranchiseConnect application with descriptions.

---

## 📚 Documentation Files (Root Directory)

### 1. **README.md** - Main Overview
- What FranchiseConnect is
- Quick start guide (3 commands to run)
- Project structure overview
- Technology stack
- Key features
- **START HERE** - Read this first!

### 2. **SETUP_GUIDE.md** - Installation Instructions
- Step-by-step backend setup
- Step-by-step frontend setup
- MongoDB setup
- .env configuration
- Verification steps
- Test walkthrough
- Troubleshooting section
- **Use this** to get the app running

### 3. **QUICK_REFERENCE.md** - Quick Lookup
- Start commands (copy-paste ready)
- File locations
- API endpoint quick reference
- Common tasks
- Password requirements
- 30-second troubleshooting table
- **Bookmark this** while developing

### 4. **COMPLETE_DOCUMENTATION.md** - Full Reference
- Complete API documentation with request/response examples
- Database schema explanation
- Backend features details
- Image handling explanation
- All 8 page descriptions
- Security notes
- Configuration details
- **Use this** when building or debugging

### 5. **CSS_STYLING_GUIDE.md** - Design & Styling
- Complete CSS code for all pages
- Color scheme and variables
- Responsive design patterns
- Component styling
- How to customize
- Dark mode (optional)
- **Use this** to add styles to the app

### 6. **IMPLEMENTATION_CHECKLIST.md** - Progress Tracking
- What's completed (✅)
- What's pending (⏳)
- Feature completion status (%)
- Problem solutions implemented
- Debugging context
- Success criteria
- **Check this** to see what's done

### 7. **TROUBLESHOOTING.md** - Problem Solving
- Critical issues and solutions
- Common issues and fixes
- Frontend-specific problems
- Performance issues
- Database issues
- Security issues
- Advanced troubleshooting
- Complete recovery steps
- **Use this** when something breaks

---

## 🔧 Backend Files

### Core Server Files

**franchiseconnect-backend/server.js**
- Express app initialization
- MongoDB connection
- Middleware setup (CORS, JSON, auth)
- Route registration
- Error handling
- Server startup on port 5000

**franchiseconnect-backend/package.json**
- Node.js project metadata
- Dependencies list:
  - express, mongoose, multer, bcryptjs
  - jsonwebtoken, nodemailer, dotenv, cors
- Scripts: dev (nodemon), start, test

### Database Models

**franchiseconnect-backend/models/userModel.js**
- User schema (18 fields)
- Profile photo storage
- Email & mobile uniqueness
- Password hashing
- User type (Investor/Brand Owner)
- Timestamps

**franchiseconnect-backend/models/brandModel.js**
- Brand schema (25 fields)
- Logo and photos array (5 max)
- Investment range object
- Location array
- Owner reference
- View count tracking

**franchiseconnect-backend/models/favourite.js**
- Simple userId-brandId relationship
- Unique composite index
- Prevent duplicate favorites

**franchiseconnect-backend/models/interestModel.js**
- Interest request schema
- Investor-to-brand inquiry
- Status workflow (Pending→Reviewed→Approved/Rejected)
- Email contact info
- Timestamps

**franchiseconnect-backend/models/logModel.js**
- Optional: Activity logging
- Track user actions

**franchiseconnect-backend/models/messageModel.js**
- Optional: Direct messaging
- Investor-owner communication

### Controllers (Business Logic)

**franchiseconnect-backend/controllers/authController.js**
- registerUser() - Create account with photo, bcrypt hashing
- loginUser() - Email/password verification, JWT generation
- verifyForgotPasswordDetails() - 2-step password reset verification
- resetPassword() - Update password with reset token

**franchiseconnect-backend/controllers/userController.js**
- getUserProfile() - Get user data with base64 photo
- updateUserProfile() - Edit profile (photo, details, except email)
- getUserBrands() - Get user's uploaded brands (owners only)
- getProfilePhoto() - Serve image binary

**franchiseconnect-backend/controllers/brandController.js**
- createBrand() - Upload with logo+5 photos, all fields
- getAllBrands() - Get all brands paginated
- getBrandById() - Get brand details, increment views
- updateBrand() - Edit brand (owner verification)
- deleteBrand() - Soft delete via isActive flag
- searchBrands() - Keyword/category/investment filtering

**franchiseconnect-backend/controllers/favoriteController.js**
- addFavorite() - Add to favorites (prevent duplicates)
- getFavorites() - Get user's favorites with full brand data
- removeFavorite() - Remove by brandId
- isFavorited() - Check if brand is favorited

**franchiseconnect-backend/controllers/interestController.js**
- createInterestRequest() - Create inquiry, send email notification
- getBrandInterests() - Get inquiries for brand (owner-only)
- updateInterestStatus() - Update status (owner)
- sendInterestEmail() - Nodemailer integration

**franchiseconnect-backend/controllers/analyticsController.js** (Optional)
- View count tracking
- Search analytics
- Popular brands

**franchiseconnect-backend/controllers/reportController.js** (Optional)
- Brand reporting
- User reporting
- Admin moderation

### Middleware

**franchiseconnect-backend/middleware/authMiddleware.js**
- JWT token verification
- Extract userId and email from token
- Protect authenticated routes
- Return 401 if invalid

**franchiseconnect-backend/middleware/uploadMiddleware.js**
- Multer configuration
- Memory storage (not disk)
- JPG format validation
- 5MB file size limit
- uploadProfilePhoto - Single file for profile
- uploadBrandFiles - Logo + 5 photos

**franchiseconnect-backend/middleware/errorHandler.js**
- Global error handling
- Format error responses
- Log errors
- Return proper HTTP status codes

**franchiseconnect-backend/middleware/roleMiddleware.js** (Optional)
- Check user type (Investor/Brand Owner)
- Restrict endpoint access by role

**franchiseconnect-backend/middleware/rateLimiter.js** (Optional)
- Prevent brute force attacks
- Limit requests per IP

### Routes

**franchiseconnect-backend/routes/authRoutes.js** (4 endpoints)
- POST /register - User registration
- POST /login - User login
- POST /forgot-password/verify - Verify for reset
- POST /reset-password - Reset password

**franchiseconnect-backend/routes/userRoutes.js** (4 endpoints)
- GET /profile - Get user profile
- PUT /profile - Update profile
- GET /brands - Get user's brands (owners)
- GET /profile-photo/:userId - Get profile photo

**franchiseconnect-backend/routes/brandRoutes.js** (6 endpoints)
- GET / - Get all brands
- POST / - Create brand (owners)
- GET /search - Search brands
- GET /:id - Get brand by ID
- PUT /:id - Update brand (owners)
- DELETE /:id - Delete brand (owners)

**franchiseconnect-backend/routes/favoriteRoutes.js** (4 endpoints)
- GET / - Get user favorites
- POST / - Add to favorites
- DELETE /:brandId - Remove favorite
- GET /:brandId/check - Check if favorited

**franchiseconnect-backend/routes/notificationRoutes.js** (Optional)
- GET / - Get notifications
- PUT /:id - Mark as read

**franchiseconnect-backend/routes/reportRoutes.js** (Optional)
- POST / - Create report
- GET / - Get reports

**franchiseconnect-backend/routes/reviewRoutes.js** (Optional)
- POST / - Create review
- GET /:brandId - Get brand reviews

**franchiseconnect-backend/routes/analyticsRoutes.js** (Optional)
- GET /brands - Brand analytics
- GET /users - User analytics

**franchiseconnect-backend/routes/uploadRoutes.js** (Optional)
- POST /image - Generic image upload

### Configuration & Utilities

**franchiseconnect-backend/config/db.js**
- MongoDB connection setup
- Connection error handling
- Database selection

**franchiseconnect-backend/config/nodemailer.js**
- Email configuration
- Gmail SMTP setup
- Email template setup

**franchiseconnect-backend/config/cloudinary.js** (Not used)
- Was for cloud storage
- Replaced with MongoDB storage

**franchiseconnect-backend/config/roles.js** (Optional)
- Role definitions
- Permission matrices

**franchiseconnect-backend/utils/generateToken.js**
- JWT token generation
- 7-day expiration

**franchiseconnect-backend/utils/sendEmail.js**
- Email sending function
- Error handling
- Email templates

**franchiseconnect-backend/utils/logger.js** (Optional)
- Activity logging
- Error logging
- Debug logging

**franchiseconnect-backend/utils/responseHandler.js** (Optional)
- Standardized response format
- Success/error response helpers

**franchiseconnect-backend/utils/otpGenerator.js** (Optional)
- OTP generation for 2FA
- Verification logic

**franchiseconnect-backend/utils/cloudinary.js** (Not used)
- Image upload helpers
- Replaced with MongoDB

### Directories

**franchiseconnect-backend/logs/**
- Server logs
- Error logs
- Activity logs

**franchiseconnect-backend/temp/**
- Temporary file storage
- Cleanup scripts

**franchiseconnect-backend/uploads/**
- Uploaded files (if using disk storage)
- Currently using memory storage

**franchiseconnect-backend/cron/**
- Scheduled tasks
- Database backups
- Cleanup jobs

### Environment & Configuration

**franchiseconnect-backend/.env** (Create this!)
- MONGO_URI - MongoDB connection
- JWT_SECRET - Token signing key
- EMAIL_USER - Gmail address
- EMAIL_PASS - Gmail app password
- PORT - Server port (5000)
- NODE_ENV - Environment mode

**franchiseconnect-backend/.env.example**
- Template for .env
- Copy this and fill in your values

---

## 🎨 Frontend Files

### Main Application Files

**frontend/src/App.jsx**
- React app root component
- 8 routes configured:
  - / (Home)
  - /register
  - /login
  - /forgot-password
  - /dashboard
  - /profile
  - /upload-brand
  - /brand/:id (dynamic)
  - /favorites
- BrowserRouter setup
- Navigation routing

**frontend/src/main.jsx**
- React 18 entry point
- Root DOM rendering
- App component initialization

**frontend/index.html**
- HTML entry point
- Root div
- Script reference to main.jsx

### Styling

**frontend/src/App.css** (Needs to be created)
- Global CSS variables
- Button styles
- Form styles
- Cards and containers
- Grid layouts
- Utility classes
- Responsive breakpoints

**frontend/src/index.css** (Already exists)
- Base styles
- Font setup
- Reset styles

**frontend/src/Dashboard.css** (Needs to be created)
- Navbar styling
- Search bar
- Filter buttons
- Brand card grid
- Responsive layout

**frontend/src/pages/*.css** (Needs to be created)
- Login.css - Auth page styling
- Registration.css - Registration form
- Profile.css - Profile view/edit
- UploadBrand.css - Form styling
- BrandDetail.css - Detail page
- Favorites.css - Grid layout
- Home.css - Home page

### Page Components

**frontend/src/pages/Login.jsx** (100% Complete)
- Email/password form
- Password visibility toggle
- Backend integration via authAPI
- Error handling
- Navigation to dashboard
- localStorage token storage

**frontend/src/pages/Registration.jsx** (100% Complete)
- 17+ form fields
- User type selection (Investor/Brand Owner)
- Profile photo upload with preview
- Client-side validation
- Password strength checker
- Mobile 10-digit validation
- Pincode 6-digit validation
- Backend integration via authAPI
- Automatic login after registration
- localStorage setup

**frontend/src/pages/ForgotPassword.jsx** (100% Complete)
- 2-step process
- Step 1: Verify personal details
- Step 2: Reset password
- State management for step tracking
- Backend integration
- JWT-based reset token
- Error handling
- Success message

**frontend/src/pages/Dashboard.jsx** (100% Complete)
- Main hub/dashboard
- Brand grid with search
- Category filter buttons (8 categories)
- Brand card components:
  - Logo/image display
  - Name, category, investment range
  - Brief about text
  - "View Details" button
  - "Add to Favorites" button (with favorite toggle)
- Search functionality via brandAPI
- Filter by category
- Navigation to brand details
- Loading states
- Empty state message

**frontend/src/pages/Profile.jsx** (100% Complete)
- View mode: Display all user info
- Edit mode: Form for editable fields
- Profile photo display
- "My Brands" section (for Brand Owners)
  - List of uploaded brands
  - Edit link to each brand
  - Brand details (name, category, investment)
- Logout button
- Navigation to upload brand
- API integration

**frontend/src/pages/UploadBrand.jsx** (100% Complete)
- Comprehensive multi-section form
- Basic info: Brand name, category, subcategory
- Investment details: Min/max range, fee, return %, payback
- Operational: Area, outlets, established year, operation dates
- Media section: Logo + up to 5 photos
- Photo preview with remove buttons
- File validation (JPG only)
- FormData construction
- Backend integration via brandAPI
- Success/error handling
- Navigation after upload

**frontend/src/pages/BrandDetail.jsx** (100% Complete)
- Full brand information display
- Main image gallery with thumbnails
- Brand specifications (all fields)
- Owner contact information
- Investor-only interest request form:
  - Name, email, mobile (10 digit validation)
  - State, city, pincode (6 digit validation)
  - Address, investment interest
- Form validation
- Email notification on submit
- Navigation back to dashboard

**frontend/src/pages/Favorites.jsx** (100% Complete)
- Grid display of favorited brands
- Brand cards with images
- Quick details (name, category, investment)
- "View Details" button
- "Remove" button with confirmation
- Empty state message with dashboard link
- Real-time favorite list updates

**frontend/src/pages/Home.jsx** (Optional)
- Landing page
- Marketing content
- Call to action buttons
- Link to login/register

### Components

**frontend/src/components/Navbar.jsx** (100% Complete)
- Logo/branding
- Navigation links:
  - Dashboard
  - Favorites
  - Profile
  - Upload Brand (Brand Owners only)
- Search bar (optional integration)
- Logout button
- User type display
- Responsive menu (mobile)

**frontend/src/components/Card.jsx** (Reusable)
- Brand card component
- Image display
- Card content (name, category, etc.)
- Action buttons

**frontend/src/components/Footer.jsx** (Optional)
- Footer links
- Copyright info
- Social links
- Contact info

### Services & API

**frontend/src/services/api.js** (100% Complete)
- Axios instance with BASE_URL
- Automatic Bearer token injection from localStorage
- Request interceptor for auth header
- Response interceptor for error handling
- API modules:
  - authAPI: register, login, verifyPassword, resetPassword
  - userAPI: getProfile, updateProfile, getUserBrands, getProfilePhoto
  - brandAPI: getAllBrands, getBrandById, createBrand, updateBrand, deleteBrand, searchBrands
  - favoriteAPI: getFavorites, addFavorite, removeFavorite, isFavorited
  - interestAPI: createInterestRequest, getBrandInterests, updateInterestStatus

### Config Files

**frontend/package.json**
- Project metadata
- Dependencies:
  - react, react-router-dom
  - axios for API calls
  - vite for build
- Dev dependencies for development
- Scripts: dev, build, preview, lint

**frontend/vite.config.js**
- Vite build configuration
- React plugin
- Server config (port 5173)
- Build optimizations

**frontend/eslint.config.js** (Optional)
- Code linting rules
- Code style enforcement

### Assets

**frontend/public/assets/**
- Static images
- Logo
- Icons
- Default images

**frontend/src/assets/**
- Component-specific images

---

## 📊 Summary by Count

### Total Files
- **Documentation**: 7 files (README, SETUP, QUICK_REFERENCE, DOCUMENTATION, CSS_GUIDE, CHECKLIST, TROUBLESHOOTING)
- **Backend**: ~50 files (models, controllers, routes, middleware, config, utils, etc.)
- **Frontend**: ~20 files (pages, components, services, config, etc.)
- **Config**: 3 files (package.json × 2, .env, .env.example, vite.config.js, eslint.config.js)

### Total Lines of Code
- **Backend**: ~3,000+ lines
- **Frontend**: ~2,500+ lines
- **Documentation**: ~2,000+ lines
- **Total**: ~7,500+ lines

---

## 🎯 Which File to Read When?

### First Time Setup
1. README.md (overview)
2. SETUP_GUIDE.md (installation)
3. QUICK_REFERENCE.md (bookmark this)

### Development
- COMPLETE_DOCUMENTATION.md (API reference)
- TROUBLESHOOTING.md (when stuck)
- CSS_STYLING_GUIDE.md (for styling)

### Debugging
- TROUBLESHOOTING.md (problems)
- Browser DevTools (F12)
- Backend terminal logs

### Tracking Progress
- IMPLEMENTATION_CHECKLIST.md (what's done)

### Adding Features
- COMPLETE_DOCUMENTATION.md (understand existing)
- Look at similar controller/component
- Copy pattern and modify

---

## ✅ File Completion Status

### Documentation (100%)
✅ README.md  
✅ SETUP_GUIDE.md  
✅ QUICK_REFERENCE.md  
✅ COMPLETE_DOCUMENTATION.md  
✅ IMPLEMENTATION_CHECKLIST.md  
✅ TROUBLESHOOTING.md  
✅ CSS_STYLING_GUIDE.md (code provided, needs to be copied)  

### Backend (100%)
✅ All models (User, Brand, Favorite, Interest)  
✅ All controllers (Auth, User, Brand, Favorite, Interest)  
✅ All middleware (Auth, Upload, Error)  
✅ All routes (Auth, User, Brand, Favorite, Interest)  
✅ server.js  
✅ package.json  
✅ .env.example  
✅ Config files  
✅ Utility files  

### Frontend (100%)
✅ All page components (Login, Register, ForgotPassword, Dashboard, Profile, UploadBrand, BrandDetail, Favorites)  
✅ Navbar component  
✅ API service (api.js)  
✅ App.jsx with routing  
✅ package.json  
✅ vite.config.js  

### Styling (0% - Ready to Add)
⏳ App.css (code provided in CSS_STYLING_GUIDE.md)  
⏳ Dashboard.css (code provided)  
⏳ Page-specific CSS (code provided)  

---

This file summary completes your documentation. You now have everything to understand, develop, and deploy FranchiseConnect!

**Next Step**: Start with README.md then SETUP_GUIDE.md!
