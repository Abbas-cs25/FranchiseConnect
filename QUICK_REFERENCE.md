# FranchiseConnect - Quick Reference Guide

## 🚀 Start the Application (2 commands)

### Terminal 1 - Backend
```bash
cd franchiseconnect-backend
npm install  # First time only
npm run dev
```
→ Backend runs on http://localhost:5000

### Terminal 2 - Frontend
```bash
cd frontend
npm install  # First time only
npm run dev
```
→ Frontend runs on http://localhost:5173

### Prerequisites
- Node.js installed
- MongoDB running (or set MONGO_URI in .env)
- .env file created in backend folder

---

## 📋 First Time Setup Checklist

- [ ] Have Node.js installed
- [ ] Have MongoDB running (local or Atlas)
- [ ] Create `.env` file in `franchiseconnect-backend/`
- [ ] Set MONGO_URI, JWT_SECRET, EMAIL_USER, EMAIL_PASS
- [ ] Run `npm install` in both backend and frontend folders
- [ ] Start backend: `npm run dev`
- [ ] Start frontend: `npm run dev`
- [ ] Open http://localhost:5173 in browser

---

## 🔑 .env Template

Create `franchiseconnect-backend/.env`:

```
MONGO_URI=mongodb://localhost:27017/franchiseconnect
JWT_SECRET=your_random_secret_key_here
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
PORT=5000
NODE_ENV=development
```

---

## 📝 Quick Test Users (After Registering)

After registration, you can use these credentials:

**Investor**
- Email: investor@example.com
- Password: Investor@123

**Brand Owner**
- Email: owner@example.com
- Password: Owner@123

---

## 🗂️ Key Files Location

### Backend Files
- Models: `franchiseconnect-backend/models/`
- Controllers: `franchiseconnect-backend/controllers/`
- Routes: `franchiseconnect-backend/routes/`
- Middleware: `franchiseconnect-backend/middleware/`
- Main: `franchiseconnect-backend/server.js`

### Frontend Files
- Pages: `frontend/src/pages/`
- Components: `frontend/src/components/`
- API Service: `frontend/src/services/api.js`
- Main: `frontend/src/App.jsx`

---

## 🔌 API Quick Reference

### Auth Endpoints
```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/forgot-password/verify
POST /api/auth/reset-password
```

### User Endpoints
```
GET /api/users/profile
PUT /api/users/profile
GET /api/users/brands
```

### Brand Endpoints
```
GET /api/brands
POST /api/brands (brand owners only)
GET /api/brands/:id
PUT /api/brands/:id (brand owners only)
DELETE /api/brands/:id (brand owners only)
GET /api/brands/search?keyword=...
```

### Favorite Endpoints
```
GET /api/favorites
POST /api/favorites
DELETE /api/favorites/:brandId
GET /api/favorites/:brandId/check
```

### Interest Endpoints
```
POST /api/interests
GET /api/interests/brand/:brandId (brand owners)
PUT /api/interests/:id/status (brand owners)
```

---

## 🐛 Troubleshooting Quick Fixes

| Problem | Solution |
|---------|----------|
| "Cannot find module 'express'" | Run `npm install` in backend folder |
| "MONGO_URI is not defined" | Create .env file with MONGO_URI |
| "Connection refused" | Start MongoDB service |
| "CORS error" | Make sure backend is running on port 5000 |
| "Image won't upload" | Check file is JPG and < 5MB |
| "Can't login" | Check password (case-sensitive), reset if needed |
| "Token expired" | Log out and log back in |

---

## 💻 Development Commands

### Backend
```bash
npm run dev          # Start with nodemon (auto-reload)
npm start            # Start production server
npm test             # Run tests (if configured)
```

### Frontend
```bash
npm run dev          # Start Vite dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Check code style
```

---

## 🎨 Color Scheme (Customize in App.css)

```css
Primary: #2563eb (Blue)
Secondary: #1e40af (Dark Blue)
Success: #16a34a (Green)
Danger: #dc2626 (Red)
Light BG: #f8fafc (Light Gray)
Dark Text: #1e293b (Dark Gray)
```

---

## 📱 Responsive Breakpoints

```css
Desktop: 1200px+
Tablet: 768px - 1199px
Mobile: < 768px
```

---

## 🔐 Password Requirements

✅ Minimum 8 characters
✅ At least 1 uppercase (A-Z)
✅ At least 1 lowercase (a-z)
✅ At least 1 number (0-9)
✅ At least 1 special character (!@#$%^&*)

Example: `MyPass@123`

---

## 📦 File Upload Limits

- Profile Photo: 5MB max
- Brand Logo: 5MB max
- Brand Photos: 5MB per photo (up to 5 photos)
- Allowed Format: JPG only

---

## 🌐 URLs When Running Locally

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:5173 | User interface |
| Backend API | http://localhost:5000/api | API endpoints |
| MongoDB | localhost:27017 | Database |

---

## 📊 Database Info

- Database Name: `franchiseconnect`
- Collections: users, brands, favorites, interests, logs

### View Data
```bash
mongo
> use franchiseconnect
> db.users.find()
> db.brands.find()
> db.favorites.find()
> db.interests.find()
```

---

## 🚀 Deployment Checklist

Before deploying to production:

- [ ] Change JWT_SECRET to strong random string
- [ ] Use MongoDB Atlas (not local)
- [ ] Set NODE_ENV=production
- [ ] Update FRONTEND_URL for CORS
- [ ] Enable HTTPS/SSL
- [ ] Configure email properly
- [ ] Set up monitoring/logging
- [ ] Test all features thoroughly
- [ ] Optimize images/performance
- [ ] Set up backup strategy

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| README.md | Overview & quick start |
| SETUP_GUIDE.md | Detailed installation |
| COMPLETE_DOCUMENTATION.md | Full API & feature docs |
| CSS_STYLING_GUIDE.md | How to style app |
| IMPLEMENTATION_CHECKLIST.md | Progress tracking |

---

## 🎯 Common Tasks

### Register a New User
1. Go to http://localhost:5173
2. Click Register
3. Fill all required fields
4. Upload a JPG profile photo
5. Select user type (Investor/Brand Owner)
6. Click Register

### Upload a Brand (as Brand Owner)
1. Log in as Brand Owner
2. Click "Upload Brand" button
3. Fill brand details
4. Upload logo + photos (JPG)
5. Click Submit

### Search Brands
1. In Dashboard, type in search bar
2. Or select a category filter
3. Or adjust investment range
4. Brands will auto-filter

### Add to Favorites
1. Click heart icon on any brand card
2. Brand added to favorites
3. View in Favorites page

### Send Interest Request
1. Click on a brand to see details
2. Fill interest request form (investors only)
3. Click "Send Interest Request"
4. Email sent to brand owner

---

## 💡 Pro Tips

1. **Password Reset**: Clear localStorage then use forgot-password feature
2. **Test Data**: Create test users for both investor and owner roles
3. **Email**: Check spam folder if notification doesn't arrive
4. **Images**: Use actual JPG files, not PNG or other formats
5. **Performance**: Clear browser cache if app loads slowly
6. **Development**: Use browser DevTools (F12) to debug
7. **Database**: Regularly backup MongoDB data
8. **Security**: Never commit .env file to git

---

## 🔗 Useful Links

- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [React Documentation](https://react.dev/)
- [JWT.io](https://jwt.io/)

---

## 📞 Need Help?

1. Check SETUP_GUIDE.md for detailed instructions
2. Look at COMPLETE_DOCUMENTATION.md for API details
3. Check browser console (F12) for JavaScript errors
4. Check terminal for backend errors
5. Review .env file for missing variables

---

## ✅ Completion Status

✅ Backend: 100% complete
✅ Frontend: 100% complete
⏳ Styling: Ready to add (see CSS_STYLING_GUIDE.md)
⏳ Email: Needs .env configuration

---

## 🎓 What You'll Learn

- Full-stack web development
- Backend API design
- Database modeling
- Authentication & security
- File upload handling
- React component architecture
- Form validation
- Error handling

---

Keep this file handy while developing! 📌

Last Updated: 2025
