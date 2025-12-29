# Profile Page - Component Architecture & Flow

## 🏗️ Component Structure

```
Profile.jsx (Main Component)
│
├── State Management
│   ├── user: User profile data
│   ├── brands: Array of brand objects
│   ├── isEditing: Boolean for edit mode
│   ├── loading: Boolean for loading state
│   ├── formData: Form input state
│   └── deletingBrandId: Current delete operation
│
├── useEffect Hook
│   └── fetchProfile() on mount
│
├── Event Handlers
│   ├── fetchProfile()           → Load user and brands
│   ├── handleUpdateProfile()    → Save profile changes
│   ├── handleDeleteBrand()      → Delete brand from DB
│   └── handleLogout()           → Clear auth and redirect
│
└── JSX Structure
    └── <div className="profile-page">
        ├── Navigation Bar (<nav>)
        ├── Profile Card (<div class="profile-card-container">)
        ├── Edit Form (conditional)
        └── My Brands Section (<div class="my-brands-container">)
```

---

## 🎯 Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    PROFILE PAGE                              │
└─────────────────────────────────────────────────────────────┘
                            │
                    useEffect: mount
                            │
                            ▼
                  fetchProfile() called
                            │
            ┌───────────────┴───────────────┐
            │                               │
            ▼                               ▼
    userAPI.getProfile()         userAPI.getUserBrands()
            │                               │
            ▼                               ▼
    setUser(userData)            setBrands(brandsArray)
            │                               │
            └───────────────┬───────────────┘
                            │
                    setLoading(false)
                            │
                            ▼
                    Component renders
                            │
            ┌───────────────┼───────────────┐
            │               │               │
            ▼               ▼               ▼
        Navbar         Profile Card      My Brands
            │               │               │
    ┌───────┴───────┐       │       ┌───────┴───────┐
    │               │       │       │               │
View Details   Edit Profile  │   Brand Cards   No Brands
    │               │       │       │
    │       View Mode│Form  Confirm
    │               │       │       │
    │       Edit Mode│Buttons└──────┴─────┐
    │               │                     │
    │       Save/Cancel                   ▼
    │               │              Delete Dialog
    │       handleUpdateProfile()         │
    │               │              handleDeleteBrand()
    │        setUser()│                   │
    │      Success Msg│            Remove from UI
    │               │              Success Msg
    └───────────────┘                    │
                                        ▼
```

---

## 🎨 Styling Architecture

```
Profile.css (650+ lines)
│
├── Global Styles
│   ├── .profile-page (main container)
│   └── .loading-spinner (loading state)
│
├── Navigation Bar (.profile-navbar)
│   ├── .profile-nav-left (logo + title)
│   ├── .profile-nav-right (buttons)
│   ├── .profile-nav-btn (base button)
│   ├── .profile-nav-btn.edit-btn
│   ├── .profile-nav-btn.upload-btn
│   ├── .profile-nav-btn.dashboard-btn
│   └── .profile-nav-btn.logout-btn
│
├── Main Container (.profile-main-container)
│   └── max-width: 1200px, centered
│
├── Profile Card (.profile-card-container)
│   ├── .profile-header (photo + name)
│   ├── .profile-photo / .profile-photo-placeholder
│   ├── .profile-info-display (view mode)
│   │   └── .info-grid → .info-item
│   └── .profile-form (edit mode)
│       ├── .form-row
│       ├── .form-group
│       ├── form inputs
│       └── .form-actions (buttons)
│
├── Buttons
│   ├── .btn-save-changes (blue)
│   └── .btn-cancel (transparent)
│
├── My Brands (.my-brands-container)
│   ├── .brands-header
│   ├── .btn-add-brand
│   ├── .brands-grid
│   │   └── .brand-card
│   │       ├── .brand-logo / .brand-logo-placeholder
│   │       ├── .brand-info
│   │       │   ├── .brand-category
│   │       │   └── .brand-description
│   │       └── .brand-actions
│   │           ├── .btn-view-details (blue)
│   │           ├── .btn-edit-brand (tomato)
│   │           └── .btn-delete-brand (tomato)
│   └── .no-brands-message
│
└── Responsive Media Queries
    ├── @media (max-width: 768px)
    ├── @media (max-width: 480px)
    └── Specific adjustments for each breakpoint
```

---

## 🔄 State Update Flow

```
User Action
    │
    ├─→ Click "Edit Profile"
    │       └─→ setIsEditing(true)
    │           └─→ Form inputs appear
    │
    ├─→ Type in form fields
    │       └─→ onChange handler
    │           └─→ setFormData({...formData, field: value})
    │
    ├─→ Click "Save Changes"
    │       └─→ handleUpdateProfile()
    │           └─→ userAPI.updateProfile(formData)
    │               └─→ setUser(response.data.user)
    │               └─→ setIsEditing(false)
    │               └─→ Show success alert
    │
    ├─→ Click "Cancel"
    │       └─→ setIsEditing(false)
    │           └─→ Form hides, data reverts
    │
    ├─→ Click "View Details" (Brand)
    │       └─→ navigate(`/brand/${id}`)
    │
    ├─→ Click "Edit" (Brand)
    │       └─→ navigate(`/edit-brand/${id}`)
    │
    ├─→ Click "Delete" (Brand)
    │       └─→ window.confirm()
    │           └─→ setDeletingBrandId(id)
    │           └─→ brandAPI.deleteBrand(id)
    │               └─→ setBrands(brands.filter(...))
    │               └─→ setDeletingBrandId(null)
    │               └─→ Show success alert
    │
    └─→ Click "Logout"
            └─→ handleLogout()
                └─→ localStorage.removeItem("token")
                └─→ localStorage.removeItem("user")
                └─→ navigate("/login")
```

---

## 📡 API Integration Map

```
Profile.jsx
    │
    ├── On Mount (useEffect)
    │   │
    │   ├─→ GET /api/users/profile
    │   │   └─→ Response: { user: {...} }
    │   │       └─→ setUser(user)
    │   │       └─→ setFormData(user)
    │   │
    │   └─→ GET /api/users/brands
    │       └─→ Response: { brands: [...] }
    │           └─→ setBrands(brands)
    │
    ├── Edit Profile
    │   │
    │   └─→ PUT /api/users/profile
    │       ├─→ Request: formData
    │       └─→ Response: { user: {...} }
    │           └─→ setUser(user)
    │           └─→ setIsEditing(false)
    │
    └── Delete Brand
        │
        └─→ DELETE /api/brands/{id}
            ├─→ Request: brand id
            └─→ Response: { message: "Deleted" }
                └─→ Remove from brands array
```

---

## 🎯 Responsive Breakpoints Flow

```
Window Width
    │
    ├─ >= 1024px (Desktop)
    │   └─ 3-column brand grid
    │   └─ 2-column form fields
    │   └─ Full navbar
    │   └─ Normal spacing
    │
    ├─ 768px - 1023px (Tablet)
    │   └─ 2-column brand grid
    │   └─ 1-column form fields
    │   └─ Wrapped buttons
    │   └─ Medium spacing
    │
    ├─ 480px - 767px (Mobile)
    │   └─ 1-column brand grid
    │   └─ 1-column form fields
    │   └─ Stacked navigation
    │   └─ Reduced spacing
    │
    └─ < 480px (Small Mobile)
        └─ 1-column everything
        └─ Extra-small buttons
        └─ Minimal spacing
        └─ Touch-optimized
```

---

## 🔐 Authentication Flow

```
Initial State
    │
    ├─→ Check localStorage.token
    │   ├─→ Token exists: Continue to profile
    │   └─→ Token missing: Redirect to login
    │
    ├─→ Fetch profile data
    │   ├─→ Success: Display profile
    │   ├─→ 401 Error: Redirect to login
    │   └─→ Other Error: Show error message
    │
    └─→ Logout
        ├─→ Remove token from localStorage
        ├─→ Remove user from localStorage
        └─→ Redirect to /login
```

---

## 🎨 Color Application Map

```
#60a5fa (Primary Blue)
    │
    ├─→ Navigation title
    ├─→ Logo border
    ├─→ Edit Profile button
    ├─→ +Upload New Brand button
    ├─→ Dashboard button
    ├─→ Save Changes button
    ├─→ View Details button
    ├─→ Form labels
    ├─→ Category text
    ├─→ Borders (transparent)
    └─→ Link colors

#ff6347 (Tomato Red)
    │
    ├─→ Logout button
    ├─→ Edit button (brands)
    ├─→ Delete button (brands)
    └─→ Hover states

#ffffff (White)
    │
    ├─→ Main text
    ├─→ Button text
    ├─→ Headings
    └─→ Labels

#cbd5e1 (Light Gray)
    │
    └─→ Secondary text
        └─→ Brand description
        └─→ Body text
```

---

## 🔄 Form Validation Flow

```
User Input
    │
    ├─→ onChange handler
    │   └─→ setFormData({...formData, field: value})
    │
    ├─→ Form submit (handleUpdateProfile)
    │   │
    │   ├─→ Validation (optional)
    │   │   └─→ Check required fields
    │   │
    │   ├─→ API call (userAPI.updateProfile)
    │   │   ├─→ Success
    │   │   │   ├─→ Update user state
    │   │   │   ├─→ Exit edit mode
    │   │   │   └─→ Show success alert
    │   │   │
    │   │   └─→ Error
    │   │       └─→ Show error alert
    │   │
    │   └─→ finally
    │       └─→ setLoading(false)
    │
    └─→ Cancel button
        └─→ setIsEditing(false)
            └─→ Discard changes
```

---

## 🎯 Event Handler Map

```
Event Handler    │ Triggered By              │ Action
─────────────────┼──────────────────────────┼─────────────────────
fetchProfile()   │ useEffect on mount        │ Load user & brands
handleUpdateProfile()│ Form submit            │ Save profile changes
handleDeleteBrand()│ Delete button click      │ Delete brand from DB
handleLogout()   │ Logout button click       │ Clear auth, redirect
setIsEditing()   │ Edit Profile btn click    │ Toggle edit mode
setFormData()    │ Input onChange            │ Update form state
navigate()       │ Various button clicks     │ Navigate to routes
```

---

## 📊 Component Props & State Summary

```
Props: None (standalone component)

State:
├── user: Object | null
├── brands: Array
├── isEditing: Boolean
├── loading: Boolean
├── formData: Object
└── deletingBrandId: String | null

Derived State:
└── hasNoBrands: brands.length === 0

Effects:
└── useEffect(() => { fetchProfile() }, [])
```

---

## 🎭 UI States

```
Profile Page States:
├── 1. LOADING
│   └── Display loading spinner
│
├── 2. VIEW PROFILE
│   ├── Show user info in read-only display
│   └── Show "Edit Profile" button
│
├── 3. EDIT PROFILE
│   ├── Show form with editable fields
│   ├── Show "Save Changes" button
│   └── Show "Cancel" button
│
├── 4. SAVING
│   ├── Disable buttons
│   └── Show loading indicator
│
├── 5. BRAND LIST EMPTY
│   ├── Show empty state message
│   └── Show upload button
│
└── 6. BRAND LIST WITH ITEMS
    ├── Show brand cards grid
    ├── Show action buttons
    └── Handle delete with confirmation
```

---

## 💾 LocalStorage Integration

```
localStorage
    │
    ├─→ getItem("token")
    │   └─→ Used for API authentication
    │
    ├─→ getItem("user")
    │   └─→ Used for offline display (optional)
    │
    ├─→ removeItem("token") (on logout)
    │
    └─→ removeItem("user") (on logout)
```

---

## 🚀 Performance Optimization Points

```
Current Optimizations:
├─ Single API call for user profile
├─ Single API call for brands
├─ Event delegation on buttons
├─ Controlled form inputs
├─ Proper state management
└─ No unnecessary re-renders

Optional Improvements:
├─ Lazy load brand images
├─ Pagination for brands
├─ Debounce form inputs
├─ Memoize components
├─ Code splitting
└─ Image optimization
```

---

This architecture diagram shows the complete structure and flow of your profile page!
