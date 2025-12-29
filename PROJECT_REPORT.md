# FranchiseConnect - Complete Project Report

---

## Table of Contents

1. [Introduction](#introduction)
2. [Overview](#overview)
3. [Motivation](#motivation)
4. [Software Requirement Specification](#software-requirement-specification)
5. [Hardware Requirements](#hardware-requirements)
6. [Software Requirements](#software-requirements)
7. [ER Diagram of the Project](#er-diagram-of-the-project)
8. [Schema of the Project](#schema-of-the-project)
9. [User Interface Design](#user-interface-design)
10. [Back End Design](#back-end-design)
11. [Conclusion and Future Work](#conclusion-and-future-work)
12. [References](#references)

---

## Introduction

FranchiseConnect is a comprehensive web-based platform designed to facilitate connections between franchise investors and brand owners. The application serves as a digital marketplace that streamlines the franchise discovery and management process, making it easier for entrepreneurs to find investment opportunities and for established businesses to expand their operations through franchising.

The project represents a modern, full-stack web application developed using industry-standard technologies and best practices. It demonstrates proficiency in database design, API development, user authentication, file management, and responsive web design.

---

## Overview

### Project Title
**FranchiseConnect** - A Franchise Discovery and Management Platform

### Project Duration
Development Cycle: 2024-2025

### Project Type
Full-Stack Web Application (3-tier architecture)

### Application Purpose
FranchiseConnect is a digital platform that:
- Connects **Investors** with **Franchise Opportunities**
- Enables **Brand Owners** to list and manage their businesses
- Facilitates communication between investors and brand owners
- Provides a centralized database of franchise information

### Project Scope
The application includes comprehensive features for user management, brand listing, investment inquiries, favorite management, and real-time communication through chat functionality.

---

## Motivation

### Problem Statement

The franchise industry faces several challenges:

1. **Information Asymmetry**: Investors struggle to find reliable franchise opportunities, while brand owners lack a dedicated platform to showcase their businesses to potential investors.

2. **Fragmented Communication**: The current process relies on email, phone calls, and scattered online directories, making it inefficient for both parties.

3. **Lack of Trust**: Without a centralized platform, verifying brand authenticity and investor credibility is challenging.

4. **Time Consumption**: The manual process of searching, contacting, and managing inquiries is time-consuming for both investors and brand owners.

5. **Limited Accessibility**: Geographic barriers limit connections between potential franchise partners.

### Solution Approach

FranchiseConnect addresses these challenges by:

- **Centralized Platform**: A single, user-friendly platform where all franchise opportunities are listed and searchable
- **Secure Authentication**: JWT-based authentication ensuring secure user sessions and data protection
- **Verified User Profiles**: User registration system with email verification to establish trust
- **Direct Communication**: Built-in messaging system for direct communication between investors and brand owners
- **Digital Showcase**: Brand owners can upload detailed information and images of their franchise opportunities
- **Interest Management**: Streamlined system for investors to express interest in franchises
- **Global Reach**: Web-based platform accessible from anywhere, breaking geographic barriers

### Business Value

1. **For Investors**: Easy access to diverse franchise opportunities with detailed information and direct communication with brand owners

2. **For Brand Owners**: Cost-effective channel to reach multiple investors and manage inquiries efficiently

3. **For the Platform**: Revenue potential through premium listings, featured placements, and subscription plans

---

## Software Requirement Specification (SRS)

### 1. Functional Requirements

#### 1.1 User Management

**FR 1.1.1 User Registration**
- Users can register as either an "Investor" or "Brand Owner"
- Required fields: Full Name, Email, Password, Phone, Role, Address
- Email validation to ensure unique accounts
- Password requirements: Minimum 8 characters, special characters recommended

**FR 1.1.2 User Authentication**
- Secure login with email and password
- JWT token generation upon successful login
- Token expiration (24-48 hours)
- Refresh token mechanism for extended sessions

**FR 1.1.3 Password Reset**
- "Forgot Password" functionality
- Email-based password reset with secure token
- Password change confirmation via email
- Account recovery mechanism

**FR 1.1.4 User Profile Management**
- View and edit user profile information
- Update profile picture
- Change password
- Manage account preferences
- Account deactivation option

#### 1.2 Brand Management (For Brand Owners)

**FR 1.2.1 Brand Registration**
- Brand owners can add their franchise information
- Required fields: Brand Name, Description, Investment Range, ROI Projection, Category
- Upload brand logo and photos
- Add detailed business information

**FR 1.2.2 Brand Listing**
- View all their registered brands
- Edit brand information
- Delete brands
- View inquiries received for each brand
- Track investor interest

**FR 1.2.3 Brand Search and Filtering**
- Search brands by keyword
- Filter by investment range
- Filter by category
- Sort by latest/popular

#### 1.3 Investor Features

**FR 1.3.1 Browse Franchises**
- View all available franchise listings
- See detailed franchise information
- View brand owner profile
- Access brand photos and documents

**FR 1.3.2 Favorites Management**
- Add franchises to favorites
- View saved favorites list
- Remove from favorites
- Count of total favorites

**FR 1.3.3 Interest Expression**
- Send interest requests to brand owners
- Provide interest message
- Track sent interest requests
- View response status

#### 1.4 Communication System

**FR 1.4.1 Direct Messaging**
- Real-time chat between investors and brand owners
- Message history persistence
- Online/offline status indication
- Typing indicators

**FR 1.4.2 Notifications**
- Email notifications for new inquiries
- In-app notifications for messages
- Interest request notifications
- Profile view notifications

#### 1.5 Administrative Features

**FR 1.5.1 User Management**
- View all registered users
- User role assignment
- User account suspension/deactivation
- Generate user statistics

**FR 1.5.2 Content Management**
- Review and approve brand listings
- Flag inappropriate content
- Manage reported brands
- System audit logs

### 2. Non-Functional Requirements

**NFR 2.1 Performance**
- Page load time < 3 seconds
- API response time < 500ms for 95% of requests
- Support for concurrent users: 1000+
- Database query optimization

**NFR 2.2 Security**
- Password hashing with bcryptjs (10 salt rounds)
- JWT authentication with secure tokens
- HTTPS/TLS encryption for data in transit
- Input validation and SQL injection prevention
- Rate limiting on API endpoints
- CORS configuration for cross-origin requests

**NFR 2.3 Reliability**
- 99.5% uptime target
- Data backup and recovery mechanism
- Error logging and monitoring
- Graceful error handling

**NFR 2.4 Scalability**
- Horizontal scaling capability
- Database indexing for performance
- Caching mechanisms
- Load balancing ready

**NFR 2.5 Usability**
- Responsive design for mobile and desktop
- Intuitive user interface
- Clear navigation structure
- Accessibility compliance (WCAG 2.1)

**NFR 2.6 Maintainability**
- Modular code architecture
- Clear code documentation
- Consistent coding standards
- Version control with Git

**NFR 2.7 Compatibility**
- Cross-browser compatibility (Chrome, Firefox, Safari, Edge)
- Mobile devices (iOS, Android)
- Operating systems (Windows, macOS, Linux)
- Minimum browser versions support

---

## Hardware Requirements

### Development Environment

**Processor**
- Minimum: Intel Core i5 / AMD Ryzen 5 (4-core)
- Recommended: Intel Core i7 / AMD Ryzen 7 (6+ core)

**RAM Memory**
- Minimum: 8 GB
- Recommended: 16 GB for development with multiple services

**Storage**
- Minimum: 10 GB free space
- SSD preferred for faster build times and database operations

**Display**
- Minimum: 1366 x 768 resolution
- Recommended: 1920 x 1080 for comfortable development

### Production Environment

**Server Hardware**
- **Processor**: 4-8 core CPU (Intel Xeon or equivalent)
- **RAM**: 16-32 GB
- **Storage**: 100-500 GB SSD (depending on user data and images)
- **Network**: Minimum 100 Mbps connection

**Database Server**
- **Processor**: 2-4 cores minimum
- **RAM**: 8-16 GB
- **Storage**: 50-200 GB SSD
- **Dedicated database server recommended**

**Application Server**
- Can be deployed on cloud platforms (AWS, Azure, Google Cloud)
- Containerization with Docker recommended
- Load balancer for high traffic

### Client-Side Requirements

**Minimum Device Specifications**
- **Processor**: 1 GHz or faster
- **RAM**: 512 MB (1 GB recommended)
- **Storage**: 50 MB (for browser cache)
- **Network**: 1 Mbps internet connection

---

## Software Requirements

### Backend Stack

**Runtime & Framework**
- **Node.js**: v18.0.0 or higher
- **Express.js**: v4.18.2 - Web application framework
- **npm**: v8.0.0 or higher - Package manager

**Database**
- **MongoDB**: v5.0 or higher - NoSQL database
- **Mongoose**: v8.0.0 - Object Data Modeling (ODM) for MongoDB

**Authentication & Security**
- **bcryptjs**: v2.4.3 - Password hashing
- **jsonwebtoken (JWT)**: v9.0.2 - Token-based authentication
- **dotenv**: v17.2.3 - Environment variable management
- **CORS**: v2.8.5 - Cross-origin resource sharing

**File Upload & Management**
- **Multer**: v1.4.5 - Middleware for file uploads
- **Cloudinary**: (optional) - Cloud storage for images

**Email & Communication**
- **Nodemailer**: v6.9.3 - Email notifications
- **Socket.io**: v4.8.1 - Real-time bidirectional communication

**Development Tools**
- **Nodemon**: v3.1.11 - Development server auto-restart
- **Git**: v2.30.0+ - Version control

### Frontend Stack

**Runtime & Framework**
- **React.js**: v19.2.0 - UI library
- **Node.js**: v18.0.0 or higher
- **npm**: v8.0.0 or higher

**Build Tools**
- **Vite**: v7.0.0 - Modern build tool and dev server
- **ESLint**: v9.39.1 - Code quality and style checking
- **JavaScript/ES6+** - Modern JavaScript standards

**Libraries & Dependencies**
- **React Router DOM**: v7.9.6 - Client-side routing
- **Axios**: v1.13.2 - HTTP client for API calls
- **Lucide React**: v0.554.0 - Icon library
- **Framer Motion**: v12.23.24 - Animation library

**Development Dependencies**
- **@vitejs/plugin-react**: v5.1.0 - React plugin for Vite
- **ESLint plugins**: React and React Hooks support

### Server Operating System
- **Production**: Linux (Ubuntu 20.04 LTS or later) / Windows Server 2019+
- **Development**: Windows 10/11, macOS, Linux

### Additional Services
- **Email Service**: SMTP (Gmail, SendGrid, etc.)
- **Cloud Storage** (Optional): Cloudinary or AWS S3
- **API Documentation Tools**: Postman for API testing

---

## ER Diagram of the Project

### Entity-Relationship Diagram (ER Diagram)

```
┌──────────────────┐
│      USER        │
├──────────────────┤
│ _id (PK)         │
│ fullName         │
│ email (UQ)       │
│ password         │
│ phone            │
│ role             │◄────────────┐
│ address          │             │
│ profilePic       │             │ 1 to N relationship
│ createdAt        │             │
│ updatedAt        │             │
└──────────────────┘             │
         │                       │
         │                       │
         ├────────┬─────────┬────┴─────────┐
         │        │         │              │
         │1       │N        │N             │N
         │        │         │              │
    ┌────▼──┐ ┌──▼────┐ ┌─▼──────┐ ┌─────▼──┐
    │ BRAND │ │FAVORITE│ │INTEREST│ │  CHAT  │
    ├───────┤ ├────────┤ ├────────┤ ├────────┤
    │_id(PK)│ │_id(PK) │ │_id(PK) │ │_id(PK) │
    │ owner │ │userId  │ │userId  │ │user1   │
    │ name  │ │brandId │ │brandId │ │user2   │
    │ desc  │ │created │ │message │ │messages│
    │ logo  │ │At      │ │status  │ │created │
    │ photos│ │        │ │created │ │At      │
    │ invest│ │        │ │At      │ │        │
    │ range │ │        │ │        │ │        │
    │ roi   │ │        │ │        │ │        │
    │created│ │        │ │        │ │        │
    │At     │ │        │ │        │ │        │
    └───────┘ └────────┘ └────────┘ └────────┘
        │                   │
        │                   │
        │1                  │1
        └─────────┬─────────┘
                  │N
              ┌───▼─────┐
              │NOTIFICATION
              ├──────────┤
              │_id   (PK)│
              │userId    │
              │type      │
              │content   │
              │read      │
              │createdAt │
              └──────────┘
```

### Entity Descriptions

**USER Entity**
- Primary entity representing all users (Investors and Brand Owners)
- Stores authentication credentials and profile information
- Acts as foreign key in BRAND, FAVORITE, INTEREST, CHAT tables

**BRAND Entity**
- Represents franchise opportunities listed by brand owners
- Contains franchise details, images, investment information
- One brand owner can list multiple brands
- Referenced in FAVORITE and INTEREST entities

**FAVORITE Entity**
- Manages investor favorite franchises
- Many-to-many relationship between USER (Investor) and BRAND
- Tracks when franchise was added to favorites

**INTEREST Entity**
- Records interest expressed by investors in specific franchises
- Includes investor message and response status
- Enables tracking of inquiries for both parties

**CHAT Entity**
- Manages real-time communication between investors and brand owners
- Stores message history and conversation metadata
- Many-to-many relationship between users

**NOTIFICATION Entity**
- Tracks various system notifications
- Types include: new_inquiry, message, profile_view, etc.
- Enables notification management and read status tracking

---

## Schema of the Project

### Database Schema

#### 1. USER Schema

```javascript
{
  _id: ObjectId,
  fullName: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  phone: String (required),
  role: String (enum: ['investor', 'brand_owner'], required),
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  profilePic: {
    data: Buffer,
    contentType: String
  },
  isEmailVerified: Boolean (default: false),
  emailVerificationToken: String,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  isActive: Boolean (default: true),
  createdAt: Date (default: Date.now),
  updatedAt: Date (default: Date.now)
}
```

#### 2. BRAND Schema

```javascript
{
  _id: ObjectId,
  owner: ObjectId (ref: 'User', required),
  name: String (required),
  description: String (required),
  category: String (required),
  investmentRequired: {
    min: Number,
    max: Number
  },
  projectedROI: {
    min: Number,
    max: Number,
    unit: String (enum: ['percentage', 'currency'])
  },
  logo: {
    data: Buffer,
    contentType: String
  },
  images: [{
    data: Buffer,
    contentType: String,
    uploadedAt: Date
  }],
  yearEstablished: Number,
  numberOfFranchises: Number,
  supportProvided: String,
  trainingProvided: Boolean,
  franchiseDetails: {
    experience_required: String,
    skills_required: [String],
    support_level: String
  },
  contact: {
    email: String,
    phone: String,
    website: String
  },
  location: {
    city: String,
    state: String,
    country: String
  },
  status: String (enum: ['pending', 'approved', 'rejected'], default: 'pending'),
  rating: {
    average: Number (0-5),
    count: Number
  },
  views: Number (default: 0),
  createdAt: Date (default: Date.now),
  updatedAt: Date (default: Date.now)
}
```

#### 3. FAVORITE Schema

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: 'User', required),
  brandId: ObjectId (ref: 'Brand', required),
  createdAt: Date (default: Date.now),
  
  // Unique compound index on userId + brandId
  // Index: { userId: 1, brandId: 1 }, unique: true
}
```

#### 4. INTEREST Schema

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: 'User', required),
  brandId: ObjectId (ref: 'Brand', required),
  message: String,
  investmentCapacity: {
    min: Number,
    max: Number
  },
  status: String (enum: ['pending', 'accepted', 'rejected'], default: 'pending'),
  response: String,
  respondedAt: Date,
  createdAt: Date (default: Date.now),
  updatedAt: Date (default: Date.now)
}
```

#### 5. CHAT Schema

```javascript
{
  _id: ObjectId,
  user1: ObjectId (ref: 'User', required),
  user2: ObjectId (ref: 'User', required),
  messages: [{
    sender: ObjectId (ref: 'User'),
    content: String,
    timestamp: Date,
    isRead: Boolean (default: false)
  }],
  lastMessage: String,
  lastMessageTime: Date,
  isActive: Boolean (default: true),
  createdAt: Date (default: Date.now),
  updatedAt: Date (default: Date.now)
}
```

#### 6. NOTIFICATION Schema

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: 'User', required),
  type: String (enum: [
    'new_inquiry',
    'message',
    'profile_view',
    'interest_accepted',
    'brand_approved'
  ], required),
  title: String,
  content: String,
  relatedId: ObjectId,
  relatedModel: String,
  isRead: Boolean (default: false),
  actionUrl: String,
  createdAt: Date (default: Date.now)
}
```

#### 7. REVIEW Schema

```javascript
{
  _id: ObjectId,
  brandId: ObjectId (ref: 'Brand', required),
  userId: ObjectId (ref: 'User', required),
  rating: Number (1-5, required),
  review: String,
  experience: String,
  createdAt: Date (default: Date.now),
  updatedAt: Date (default: Date.now)
}
```

### Database Indexes

```javascript
// USER indexes
db.users.createIndex({ email: 1 }, { unique: true })
db.users.createIndex({ role: 1 })
db.users.createIndex({ createdAt: -1 })

// BRAND indexes
db.brands.createIndex({ owner: 1 })
db.brands.createIndex({ status: 1 })
db.brands.createIndex({ category: 1 })
db.brands.createIndex({ name: 'text', description: 'text' })
db.brands.createIndex({ createdAt: -1 })

// FAVORITE indexes
db.favorites.createIndex({ userId: 1, brandId: 1 }, { unique: true })
db.favorites.createIndex({ userId: 1 })

// INTEREST indexes
db.interests.createIndex({ userId: 1, brandId: 1 })
db.interests.createIndex({ userId: 1 })
db.interests.createIndex({ brandId: 1 })
db.interests.createIndex({ status: 1 })

// CHAT indexes
db.chats.createIndex({ user1: 1, user2: 1 })
db.chats.createIndex({ user1: 1 })
db.chats.createIndex({ user2: 1 })

// NOTIFICATION indexes
db.notifications.createIndex({ userId: 1 })
db.notifications.createIndex({ isRead: 1 })
db.notifications.createIndex({ createdAt: -1 })
```

---

## User Interface Design

### Design Principles

1. **User-Centric**: Clean, intuitive interface focused on user needs
2. **Responsive**: Works seamlessly on desktop, tablet, and mobile devices
3. **Accessibility**: WCAG 2.1 compliance for inclusive design
4. **Consistency**: Unified design language across all pages
5. **Performance**: Fast loading and smooth interactions

### Application Pages & Screens

#### 1. Authentication Pages

**Landing Page**
- Hero section with application overview
- Call-to-action buttons (Login/Register)
- Key features showcase
- Brief information about investors and brand owners
- Navigation to specific information

**Registration Page**
- Form fields:
  - Full Name
  - Email Address
  - Password (with strength indicator)
  - Phone Number
  - Role Selection (Investor/Brand Owner)
  - Address (optional)
  - Terms & Conditions checkbox
- Input validation with real-time feedback
- Submit and "Already have account?" link

**Login Page**
- Email input field
- Password input field
- "Remember Me" checkbox
- "Forgot Password?" link
- Login button
- "New to FranchiseConnect?" registration link

**Password Reset Page**
- Email verification form
- Reset token input
- New password creation form
- Confirmation message

#### 2. Investor Dashboard Pages

**Home/Dashboard**
- Welcome message with user name
- Quick statistics:
  - Total favorites
  - Pending interests
  - Active messages
- Featured franchises carousel
- Recent inquiries summary
- Quick action buttons

**Browse Franchises**
- Search bar with real-time search
- Filter options:
  - By investment range (slider)
  - By category (dropdown)
  - By location (dropdown)
  - By ROI range
- Results display:
  - Card layout showing:
    - Brand logo
    - Brand name
    - Brief description
    - Investment required
    - ROI projection
    - Location
    - Action buttons (View Details, Add to Favorite)
- Pagination or infinite scroll
- Sort options (Latest, Popular, Most Favorited)

**Franchise Details Page**
- Brand header with logo and cover image
- Brand information section:
  - Full description
  - Investment details
  - ROI information
  - Support provided
  - Training information
- Image gallery with multiple franchise photos
- Brand owner profile section:
  - Brand owner name and details
  - Contact information
  - Rating and reviews
- User action buttons:
  - Add to Favorites (with heart icon)
  - Send Interest (opens modal)
  - Message Brand Owner
  - View Reviews
- Reviews and ratings section
- Related franchises suggestion

**Send Interest Modal**
- Message textarea
- Investment capacity fields (min-max)
- Submit button
- Cancel option

**My Favorites**
- List of saved franchise opportunities
- Card view with:
  - Brand logo
  - Brand name
  - Investment range
  - Quick action buttons
- Remove from favorites option
- Sort and filter options
- Empty state message if no favorites

**My Interests**
- List of sent interest requests
- Status badges (Pending, Accepted, Rejected)
- Information displayed:
  - Brand name
  - Sent date
  - Status
  - Brand owner response
- Action buttons:
  - View Details
  - Send Message
  - Withdraw Interest

**Messages/Chat**
- Chat list on sidebar showing:
  - Brand owner names/profiles
  - Last message preview
  - Unread count
  - Timestamp
- Chat window with:
  - Conversation history
  - Message input box
  - Send button
  - Typing indicator
  - Timestamps on messages
- Search and filter messages

**Profile Page**
- Profile header with profile picture
- User information:
  - Full Name
  - Email
  - Phone
  - Address
  - Role
- Edit profile button
- Change password section
- Account preferences
- Logout button
- Account deactivation option

#### 3. Brand Owner Dashboard Pages

**Brand Owner Dashboard**
- Welcome message
- Statistics:
  - Total brands listed
  - Total interests received
  - Total messages
  - Profile views
- Recent interests summary
- Call-to-action to add new brand

**Add Brand/Brand Form**
- Step-by-step wizard (optional)
- Form sections:
  - **Basic Information**
    - Brand Name (required)
    - Description (required)
    - Category (required)
    - Year Established
  - **Investment Details**
    - Minimum Investment
    - Maximum Investment
    - Projected ROI (min-max)
  - **Brand Media**
    - Logo upload
    - Multiple photos upload
    - Drag-and-drop interface
  - **Franchise Details**
    - Experience required
    - Skills required
    - Support level
    - Training provided (yes/no)
  - **Contact Information**
    - Email
    - Phone
    - Website
    - Location (city, state, country)
  - **Additional Information**
    - Number of existing franchises
    - Support description
- Form validation with error messages
- Save as draft and publish options
- Preview before publishing

**My Brands**
- Table/card view of all brands
- Each brand showing:
  - Logo thumbnail
  - Brand name
  - Status (Pending/Approved/Rejected)
  - Investment range
  - Total interests received
  - Date created
- Action buttons:
  - View Details
  - Edit
  - Delete
  - View Interests
  - View Reviews
- Filter by status
- Search functionality
- Pagination

**Brand Interests**
- List of all interests received for brands
- For each interest showing:
  - Investor name
  - Brand interested in
  - Interest date
  - Status
  - Investor message
- Action buttons:
  - View Investor Profile
  - Accept Interest
  - Reject Interest
  - Send Message
  - View Brand Details

**Reviews & Ratings**
- Display of all reviews received
- Each review showing:
  - Star rating (1-5)
  - Investor name
  - Review text
  - Date posted
- Average rating displayed
- Total review count
- Filter and sort options

#### 4. Common Pages

**Search Results**
- Display search results based on query
- Filter options available
- Sort options available
- Result count
- No results message with suggestions

**Notifications**
- Bell icon with unread count
- Notification list showing:
  - Notification type icon
  - Title and content
  - Timestamp
  - Read/unread status
- Mark as read functionality
- Clear all notifications
- Filter by type

**Settings Page**
- Account Settings
  - Email preferences
  - Notification preferences
  - Privacy settings
- Security Settings
  - Change password
  - Two-factor authentication
  - Active sessions management
- Profile Settings
  - Edit profile information
  - Upload profile picture
  - Change role (if applicable)

### Design System

**Color Palette**
- Primary Color: #007AFF (Blue) - For main actions and links
- Secondary Color: #5AC8FA (Light Blue) - For secondary actions
- Success Color: #34C759 (Green) - For positive actions
- Warning Color: #FF9500 (Orange) - For warnings
- Danger Color: #FF3B30 (Red) - For destructive actions
- Neutral Color: #8E8E93 (Gray) - For secondary text
- Background Color: #F2F2F7 (Light Gray) - For backgrounds
- Surface Color: #FFFFFF (White) - For cards and surfaces

**Typography**
- Heading 1 (H1): 32px, Bold, Primary Color
- Heading 2 (H2): 28px, Bold, Primary Color
- Heading 3 (H3): 24px, Semibold, Primary Color
- Body Text: 16px, Regular, #333333
- Small Text: 14px, Regular, #666666
- Font Family: System fonts (Segoe UI, Roboto, Helvetica, Arial)

**Spacing**
- Extra Small: 4px
- Small: 8px
- Medium: 16px
- Large: 24px
- Extra Large: 32px
- Multiple of 8px for consistency

**Components**
- Buttons: Primary, Secondary, Danger, Disabled states
- Input Fields: Text, Email, Password, File upload, Textarea
- Cards: Basic, Hover effects, Responsive
- Modals: Dialog with overlay
- Forms: Validation, Error messages
- Navigation: Top navbar, Sidebar menu
- Icons: Lucide icons for consistency
- Loading States: Spinners, skeleton screens
- Status Badges: Approved, Pending, Rejected
- Alert Messages: Success, Error, Warning, Info

---

## Back End Design

### Architecture Overview

**3-Tier Architecture:**
1. **Presentation Layer**: REST API endpoints
2. **Business Logic Layer**: Controllers and middleware
3. **Data Access Layer**: MongoDB and Mongoose ODM

### Application Structure

```
franchiseconnect-backend/
├── server.js                 # Entry point
├── package.json              # Dependencies
├── .env                      # Environment variables
├── config/                   # Configuration files
│   ├── db.js                # MongoDB connection
│   ├── cloudinary.js        # Cloud storage config
│   ├── nodemailer.js        # Email configuration
│   └── roles.js             # Role definitions
├── models/                   # Database schemas
│   ├── userModel.js
│   ├── brandModel.js
│   ├── chatModel.js
│   ├── favouriteModel.js
│   ├── interestModel.js
│   ├── notificationModel.js
│   ├── reportModel.js
│   ├── reviewModel.js
│   └── messageModel.js
├── controllers/              # Business logic
│   ├── authController.js     # Authentication logic
│   ├── userController.js     # User management
│   ├── brandController.js    # Brand management
│   ├── chatController.js     # Messaging
│   ├── favoriteController.js # Favorites management
│   ├── interestController.js # Interest handling
│   ├── notificationController.js
│   ├── reportController.js
│   ├── reviewController.js
│   ├── uploadController.js   # File upload handling
│   └── analyticsController.js
├── routes/                   # API endpoints
│   ├── authRoutes.js
│   ├── userRoutes.js
│   ├── brandRoutes.js
│   ├── chatRoutes.js
│   ├── favoriteRoutes.js
│   ├── interestRoutes.js
│   ├── notificationRoutes.js
│   ├── reportRoutes.js
│   ├── reviewRoutes.js
│   ├── uploadRoutes.js
│   └── analyticsRoutes.js
├── middleware/               # Custom middleware
│   ├── authMiddleware.js     # JWT verification
│   ├── roleMiddleware.js     # Role-based access control
│   ├── uploadMiddleware.js   # File upload validation
│   ├── errorHandler.js       # Error handling
│   └── rateLimiter.js        # Rate limiting
├── utils/                    # Helper functions
│   ├── emailService.js       # Email sending
│   ├── tokenService.js       # Token management
│   ├── errorResponse.js      # Error utilities
│   └── validators.js         # Input validation
├── sockets/                  # WebSocket connections
│   └── socketHandler.js      # Real-time messaging
├── cron/                     # Scheduled tasks
│   ├── backup.js            # Database backups
│   └── cleanup.js           # Cleanup tasks
├── logs/                     # Application logs
└── uploads/                  # Temporary upload storage
```

### Core Modules

#### 1. Authentication Module (`authController.js`)

**Functions:**
- `register(email, password, fullName, role)` - User registration
  - Validate input
  - Check email uniqueness
  - Hash password with bcryptjs
  - Create user record
  - Generate JWT token
  
- `login(email, password)` - User authentication
  - Verify email existence
  - Compare password hash
  - Generate JWT token
  - Return user data
  
- `forgotPassword(email)` - Password reset initiation
  - Generate reset token
  - Set expiration time
  - Send email with reset link
  
- `resetPassword(token, newPassword)` - Password reset completion
  - Verify token validity
  - Verify token expiration
  - Update password
  - Clear reset token

#### 2. User Management Module (`userController.js`)

**Functions:**
- `getUserProfile(userId)` - Retrieve user details
- `updateProfile(userId, data)` - Update user information
- `changePassword(userId, oldPassword, newPassword)` - Change password
- `uploadProfilePic(userId, file)` - Upload profile picture
- `getAllUsers(filters)` - Admin: Get all users
- `getUserStats()` - Get user statistics

#### 3. Brand Management Module (`brandController.js`)

**Functions:**
- `createBrand(brandData, userId)` - Add new franchise
  - Validate input
  - Store logo and images in MongoDB
  - Create brand record
  - Set status to pending
  
- `getBrands(filters, page)` - Get franchise listings
  - Apply filters (category, investment, location)
  - Pagination
  - Return formatted results
  
- `getBrandDetails(brandId)` - Get franchise details
- `updateBrand(brandId, userId, data)` - Edit franchise information
- `deleteBrand(brandId, userId)` - Delete franchise listing
- `getBrandsByOwner(ownerId)` - Get owner's brands
- `approveBrand(brandId)` - Admin: Approve brand listing
- `rejectBrand(brandId, reason)` - Admin: Reject brand listing
- `searchBrands(query)` - Full-text search

#### 4. Favorite Management Module (`favoriteController.js`)

**Functions:**
- `addToFavorites(userId, brandId)` - Add to favorites
  - Check if already favorited
  - Create favorite record
  
- `removeFromFavorites(userId, brandId)` - Remove from favorites
- `getUserFavorites(userId, page)` - Get user's favorites list
- `isFavorited(userId, brandId)` - Check favorite status

#### 5. Interest Management Module (`interestController.js`)

**Functions:**
- `expressInterest(userId, brandId, message)` - Send interest request
  - Create interest record
  - Send notification to brand owner
  - Send email notification
  
- `getReceivedInterests(userId, page)` - Get interests for owner's brands
- `getSentInterests(userId, page)` - Get sent interest requests
- `acceptInterest(interestId, response)` - Accept interest
  - Update status
  - Send notification to investor
  - Send email
  
- `rejectInterest(interestId, reason)` - Reject interest
- `withdrawInterest(interestId)` - Withdraw sent interest

#### 6. Chat/Messaging Module (`chatController.js`)

**Functions:**
- `sendMessage(senderId, receiverId, content)` - Send message
  - Create or get chat room
  - Store message
  - Emit WebSocket event
  
- `getMessages(user1Id, user2Id, page)` - Get message history
- `getChatList(userId)` - Get user's chats
- `markAsRead(chatId)` - Mark messages as read
- `deleteMessage(messageId)` - Delete message

#### 7. Notification Module (`notificationController.js`)

**Functions:**
- `createNotification(userId, type, content)` - Create notification
- `getNotifications(userId, page)` - Get user notifications
- `markAsRead(notificationId)` - Mark notification as read
- `deleteNotification(notificationId)` - Delete notification
- `clearAllNotifications(userId)` - Clear all notifications

### API Endpoints

#### Authentication Routes

```
POST   /api/auth/register       - Register new user
POST   /api/auth/login          - User login
POST   /api/auth/forgot-password - Request password reset
POST   /api/auth/reset-password - Reset password
POST   /api/auth/logout         - User logout
```

#### User Routes

```
GET    /api/users/profile       - Get user profile
PUT    /api/users/profile       - Update profile
POST   /api/users/change-password - Change password
POST   /api/users/upload-pic    - Upload profile picture
GET    /api/users               - Admin: Get all users
GET    /api/users/:id           - Get user details
```

#### Brand Routes

```
POST   /api/brands              - Create new brand
GET    /api/brands              - Get all brands (with filters)
GET    /api/brands/search       - Search brands
GET    /api/brands/:id          - Get brand details
PUT    /api/brands/:id          - Update brand
DELETE /api/brands/:id          - Delete brand
GET    /api/brands/owner/:id    - Get owner's brands
POST   /api/brands/:id/approve  - Admin: Approve brand
POST   /api/brands/:id/reject   - Admin: Reject brand
```

#### Favorite Routes

```
POST   /api/favorites           - Add to favorites
DELETE /api/favorites/:brandId  - Remove from favorites
GET    /api/favorites           - Get user's favorites
GET    /api/favorites/:brandId  - Check if favorited
```

#### Interest Routes

```
POST   /api/interests           - Send interest request
GET    /api/interests/received  - Get received interests
GET    /api/interests/sent      - Get sent interests
PUT    /api/interests/:id/accept - Accept interest
PUT    /api/interests/:id/reject - Reject interest
DELETE /api/interests/:id       - Withdraw interest
```

#### Chat Routes

```
POST   /api/chats/message       - Send message
GET    /api/chats               - Get chat list
GET    /api/chats/:userId       - Get messages with user
PUT    /api/chats/read/:id      - Mark as read
DELETE /api/chats/message/:id   - Delete message
```

#### Notification Routes

```
GET    /api/notifications       - Get notifications
PUT    /api/notifications/:id/read - Mark as read
DELETE /api/notifications/:id   - Delete notification
DELETE /api/notifications       - Clear all
```

### Middleware Implementation

#### Authentication Middleware (`authMiddleware.js`)

```javascript
// Verifies JWT token in request headers
// Attached to protected routes
// Sets req.user with decoded token data
// Returns 401 if token is invalid or missing
```

#### Role-Based Access Control (`roleMiddleware.js`)

```javascript
// Checks user role for specific endpoints
// Example: Only brand owners can create brands
// Returns 403 if user lacks required role
```

#### Error Handler Middleware (`errorHandler.js`)

```javascript
// Catches all errors in the application
// Formats error response
// Logs errors for monitoring
// Returns appropriate HTTP status codes
```

#### Rate Limiter Middleware (`rateLimiter.js`)

```javascript
// Limits API requests per IP/user
// Prevents brute force attacks
// Configurable for different endpoints
// Returns 429 if limit exceeded
```

### Data Validation & Security

**Input Validation**
- Email format validation
- Password strength checking
- File type and size validation
- Data type checking
- XSS prevention through sanitization

**Security Measures**
- Password hashing with bcryptjs (10 salt rounds)
- JWT token-based authentication
- CORS configuration for frontend domain only
- Rate limiting on authentication endpoints
- Input sanitization
- Error message sanitization (no sensitive data leakage)
- HTTPS/TLS enforcement in production

### Error Handling

**Error Response Format:**
```javascript
{
  success: false,
  message: "Error description",
  statusCode: 400,
  error: "ErrorType"
}
```

**HTTP Status Codes:**
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 409: Conflict (e.g., duplicate email)
- 500: Internal Server Error
- 429: Too Many Requests

### Database Connection & Query Optimization

**Connection Pooling**
- MongoDB connection pool management
- Automatic retry on connection failure
- Connection timeout configuration

**Query Optimization**
- Database indexes on frequently queried fields
- Query result pagination
- Lean queries for read-only operations
- Aggregation pipelines for complex queries

### Real-Time Features (WebSocket)

**Socket.io Implementation:**
- Namespace: `/chats` for messaging
- Events:
  - `send_message` - New message event
  - `receive_message` - Message receipt
  - `typing` - User typing indicator
  - `user_online` - User online status
  - `user_offline` - User offline status

### Logging & Monitoring

**Logging Strategy**
- Error logs: All application errors
- Access logs: API requests and responses
- Business logic logs: Key operations
- Log file: Daily rotation
- Log level: Info, Warning, Error

### Deployment Considerations

**Environment Variables (`.env`):**
```
MONGO_URI=mongodb://...
JWT_SECRET=your_secret_key
JWT_EXPIRE=24h
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://yourdomain.com
CLOUDINARY_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

---

## Conclusion and Future Work

### Conclusion

FranchiseConnect successfully addresses the critical need for a centralized franchise discovery and management platform. Through its comprehensive feature set, robust backend architecture, and user-friendly frontend interface, the application provides significant value to both investors and brand owners.

### Key Achievements

1. **Complete Full-Stack Implementation**
   - Fully functional React frontend with responsive design
   - Robust Node.js/Express backend with proper API architecture
   - MongoDB database with well-designed schema and optimization

2. **Core Feature Implementation**
   - User authentication and authorization with JWT
   - Brand listing and management system
   - Investor interest tracking and management
   - Real-time messaging between platform users
   - Favorite management system
   - Notification system for key events

3. **Security & Best Practices**
   - Password hashing with bcryptjs
   - JWT-based token authentication
   - Role-based access control
   - Rate limiting and error handling
   - Input validation and sanitization

4. **User Experience**
   - Intuitive and responsive design
   - Smooth navigation across pages
   - Real-time communication capabilities
   - Comprehensive user profiles

### Impact

- **For Investors**: Provides easy access to diverse franchise opportunities with detailed information, enabling informed investment decisions
- **For Brand Owners**: Offers cost-effective channels to reach multiple potential investors and manage inquiries efficiently
- **For Society**: Facilitates entrepreneurship and business expansion opportunities

### Future Work & Enhancement Opportunities

#### Phase 2: Advanced Features

1. **Advanced Analytics Dashboard**
   - Investor demographics analysis
   - Brand performance metrics
   - Interest conversion rates
   - Revenue tracking for premium features
   - Detailed reporting for brand owners

2. **AI/ML Integration**
   - Personalized franchise recommendations based on investor profile
   - Chatbot for frequently asked questions
   - Automated fraud detection
   - Investor-brand matching algorithm
   - Natural language processing for interest messages

3. **Payment & Subscription System**
   - Stripe/PayPal integration
   - Premium brand listing features
   - Featured placement options
   - Subscription plans (Basic, Pro, Enterprise)
   - Payment history and invoicing

4. **Enhanced Communication**
   - Video call integration (Jitsi/Twilio)
   - Document sharing in chat
   - Meeting scheduling system
   - Email integration with chat history

5. **Advanced Search & Filtering**
   - AI-powered search suggestions
   - Saved search preferences
   - Search history and recommendations
   - Map-based franchise location search
   - Advanced filter combinations

#### Phase 3: Community & Trust Building

1. **Verification System**
   - Email verification badges
   - Phone verification
   - Document verification for brands
   - Investment history verification
   - KYC (Know Your Customer) process

2. **Review & Rating System**
   - Franchise reviews and ratings
   - Investor profile verification
   - Success stories showcase
   - Case studies from successful franchises
   - Community forum for discussion

3. **Insurance & Legal**
   - Legal document templates
   - Contract management system
   - Insurance information database
   - Dispute resolution system
   - Compliance tracking

#### Phase 4: Integration & Expansion

1. **Third-Party Integrations**
   - LinkedIn profile import
   - Google Maps integration
   - CRM system integration
   - Email service integration
   - Calendar integration

2. **Mobile Application**
   - Native iOS app (React Native)
   - Native Android app (React Native)
   - Offline browsing capability
   - Push notifications
   - Biometric authentication

3. **Internationalization**
   - Multi-language support (Spanish, French, Chinese, etc.)
   - Multi-currency support
   - Localized content
   - Region-specific features
   - RTL language support

4. **Business Expansion**
   - WhatsApp Business integration
   - SMS notifications
   - Telegram bot for alerts
   - Social media integration
   - Influencer partnership program

#### Phase 5: Scalability & Performance

1. **Infrastructure**
   - AWS/Azure cloud deployment
   - Docker containerization
   - Kubernetes orchestration
   - CDN for static assets
   - Database replication and sharding

2. **Performance Optimization**
   - Frontend lazy loading
   - Image optimization and compression
   - API response caching
   - Database query optimization
   - Load testing and optimization

3. **Monitoring & Maintenance**
   - Real-time application monitoring (New Relic, Datadog)
   - Error tracking and debugging (Sentry)
   - Performance metrics dashboard
   - Automated health checks
   - Incident management system

4. **Backup & Disaster Recovery**
   - Automated daily backups
   - Backup encryption
   - Disaster recovery plan
   - Data redundancy
   - Business continuity procedures

### Development Timeline (Recommended)

- **Months 1-2**: Phase 2 (Advanced Analytics, AI Integration)
- **Months 3-4**: Phase 3 (Verification & Trust System)
- **Months 5-6**: Phase 4 (Third-party Integrations, Mobile App)
- **Months 7-12**: Phase 5 (Scalability, Expansion Features)

### Success Metrics

1. **User Acquisition**
   - Monthly active users growth
   - Investor registration rate
   - Brand owner registration rate
   - User retention rate

2. **Engagement Metrics**
   - Average session duration
   - Interest expression rate
   - Message exchange volume
   - Favorite addition frequency

3. **Business Metrics**
   - Successful franchise connections
   - Average investment value
   - Customer satisfaction score
   - Revenue from premium features

### Sustainability & Maintenance

- Regular security audits and updates
- Performance monitoring and optimization
- User support and feedback integration
- Technology stack updates
- Feature enhancement based on user feedback
- Continuous integration and deployment (CI/CD)

---

## References

### Technology Documentation

1. **Node.js & Express.js**
   - Express.js Official Documentation: https://expressjs.com
   - Node.js Documentation: https://nodejs.org/docs

2. **React.js & Frontend**
   - React Official Documentation: https://react.dev
   - React Router Documentation: https://reactrouter.com
   - Vite Documentation: https://vitejs.dev

3. **Database**
   - MongoDB Official Documentation: https://docs.mongodb.com
   - Mongoose Documentation: https://mongoosejs.com

4. **Authentication & Security**
   - JWT.io Official Documentation: https://jwt.io
   - bcryptjs Documentation: https://github.com/dcodeIO/bcrypt.js
   - OWASP Security Guidelines: https://owasp.org

5. **File Upload & Storage**
   - Multer Documentation: https://github.com/expressjs/multer
   - Cloudinary Documentation: https://cloudinary.com/documentation

6. **Real-time Communication**
   - Socket.io Documentation: https://socket.io/docs
   - Nodemailer Documentation: https://nodemailer.com

### Design & UX References

1. **UI/UX Design Principles**
   - Google Material Design: https://material.io
   - Apple Human Interface Guidelines: https://developer.apple.com/design/human-interface-guidelines

2. **Responsive Design**
   - MDN Web Docs: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design
   - CSS-Tricks: https://css-tricks.com

### Industry Standards & Best Practices

1. **REST API Design**
   - REST API Best Practices: https://restfulapi.net
   - API Security: https://cheatsheetseries.owasp.org

2. **Code Quality**
   - Clean Code Principles: Based on "Clean Code" by Robert C. Martin
   - Code Review Best Practices: https://google.github.io/styleguide

3. **Project Management**
   - Agile Development: https://www.agilealliance.org
   - Git Workflow: https://git-scm.com/book

### Learning Resources

1. **Tutorials & Courses**
   - The Odin Project: https://www.theodinproject.com
   - FreeCodeCamp: https://www.freecodecamp.org
   - Udemy (Various Full-Stack Courses)

2. **Community Resources**
   - Stack Overflow: https://stackoverflow.com
   - GitHub: https://github.com
   - Dev.to: https://dev.to

### Tools & Utilities

1. **Development Tools**
   - Visual Studio Code: https://code.visualstudio.com
   - Postman: https://www.postman.com
   - MongoDB Compass: https://www.mongodb.com/products/compass

2. **Version Control**
   - Git: https://git-scm.com
   - GitHub: https://github.com

3. **Testing & Debugging**
   - Jest (Testing Framework): https://jestjs.io
   - Mocha (Testing Framework): https://mochajs.org
   - Chrome DevTools: https://developer.chrome.com/docs/devtools

---

## Appendices

### A. Environment Setup Guide

#### Prerequisites
- Node.js v18.0.0 or higher
- MongoDB v5.0 or higher
- npm v8.0.0 or higher
- Git v2.30.0 or higher
- Text editor (VS Code recommended)

#### Installation Steps

**1. Clone Repository**
```bash
git clone <repository-url>
cd FranchiseConnect
```

**2. Backend Setup**
```bash
cd franchiseconnect-backend
npm install
# Create .env file with configuration
npm run dev
```

**3. Frontend Setup**
```bash
cd frontend
npm install
npm run dev
```

### B. Testing Credentials

**Test Investor Account**
- Email: investor@test.com
- Password: TestPassword123!

**Test Brand Owner Account**
- Email: owner@test.com
- Password: TestPassword123!

### C. API Testing with Postman

Postman collection available for all API endpoints. Import collection for testing all routes with sample data.

---

**Report Prepared By**: [Your Name]  
**Date**: December 29, 2025  
**Version**: 1.0  
**Status**: Complete

---

*This report serves as complete documentation for the FranchiseConnect project suitable for academic submission.*
