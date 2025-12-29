# Profile Page - Visual Layout Guide

## 🎨 Complete Layout Structure

```
┌─────────────────────────────────────────────────────────────────────────┐
│ PROFILE PAGE                                                             │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│ NAVIGATION BAR (Sticky, Dark Background #020617)                       │
│                                                                          │
│  [LOGO] FranchiseConnect     Edit Profile | +Upload | Dashboard | Logout│
│                                                                          │
│  Colors: Logo Blue (#60a5fa)                                           │
│          Title Blue (#60a5fa) - Clickable                             │
│          Buttons Blue (#60a5fa) for Edit, Upload, Dashboard           │
│          Logout Tomato (#ff6347)                                       │
└─────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────┐
│                         MAIN CONTENT AREA (Centered)                      │
│                                                                            │
│  ┌──────────────────────────────────────────────────────────────────────┐│
│  │ PROFILE CARD                                                         ││
│  │                                                                      ││
│  │  ┌─────────┐  User Name                                            ││
│  │  │ PROFILE │  user.email@example.com                              ││
│  │  │  PHOTO  │                                                        ││
│  │  └─────────┘                                                        ││
│  │                                                                      ││
│  │  ───────────────────────────────────────────────────────────────  ││
│  │                                                                      ││
│  │  VIEW MODE:                                                         ││
│  │  ┌────────────┬──────────────┬────────────┬──────────────┐        ││
│  │  │   EMAIL    │   MOBILE     │   GENDER   │     DOB      │        ││
│  │  │ user@ex.com│ +91-XXXXXX   │   Male     │ DD/MM/YYYY   │        ││
│  │  └────────────┴──────────────┴────────────┴──────────────┘        ││
│  │  ┌────────────┬──────────────┬────────────┬──────────────┐        ││
│  │  │   STATE    │    CITY      │  PINCODE   │  QUALIFICATION        ││
│  │  │  Gujarat   │   Ahmedabad  │  380001    │  B.Tech      │        ││
│  │  └────────────┴──────────────┴────────────┴──────────────┘        ││
│  │  ┌────────────┐                                                   ││
│  │  │ ADDRESS    │  Full residential address                        ││
│  │  │ OCCUPATION │  Entrepreneur                                    ││
│  │  └────────────┘                                                   ││
│  │                                                                      ││
│  │  EDIT MODE:                                                         ││
│  │  ┌──────────────────┬──────────────────┐                          ││
│  │  │ First Name        │ Last Name        │                         ││
│  │  │ [input field]     │ [input field]    │                         ││
│  │  └──────────────────┴──────────────────┘                          ││
│  │  ┌──────────────────┬──────────────────┐                          ││
│  │  │ Email            │ Mobile           │                         ││
│  │  │ [input field]    │ [input field]    │                         ││
│  │  └──────────────────┴──────────────────┘                          ││
│  │  ┌──────────────────┬──────────────────┐                          ││
│  │  │ Gender           │ Date of Birth    │                         ││
│  │  │ [dropdown]       │ [date picker]    │                         ││
│  │  └──────────────────┴──────────────────┘                          ││
│  │  ┌──────────────────┬──────────────────┐                          ││
│  │  │ State            │ City             │                         ││
│  │  │ [input field]    │ [input field]    │                         ││
│  │  └──────────────────┴──────────────────┘                          ││
│  │  ┌──────────────────┬──────────────────┐                          ││
│  │  │ Pincode          │ Qualification    │                         ││
│  │  │ [input field]    │ [input field]    │                         ││
│  │  └──────────────────┴──────────────────┘                          ││
│  │  ┌────────────────────────────────────┐                           ││
│  │  │ Address (Full Width)               │                           ││
│  │  │ [textarea - larger input field]    │                           ││
│  │  └────────────────────────────────────┘                           ││
│  │  ┌────────────────────────────────────┐                           ││
│  │  │ Occupation (Full Width)            │                           ││
│  │  │ [input field]                      │                           ││
│  │  └────────────────────────────────────┘                           ││
│  │                                                                      ││
│  │  ───────────────────────────────────────────────────────────────  ││
│  │  [Save Changes]  [Cancel]                                         ││
│  │  (Blue #60a5fa)  (Transparent)                                    ││
│  │                                                                      ││
│  └──────────────────────────────────────────────────────────────────────┘│
│                                                                            │
│  ┌──────────────────────────────────────────────────────────────────────┐│
│  │ MY BRANDS                                                             ││
│  │                         [+Upload New Brand] (Blue Button)            ││
│  │                                                                      ││
│  │  ┌────────────────┐ ┌────────────────┐ ┌────────────────┐         ││
│  │  │ BRAND CARD #1  │ │ BRAND CARD #2  │ │ BRAND CARD #3  │         ││
│  │  │                │ │                │ │                │         ││
│  │  │ [Brand Logo]   │ │ [Brand Logo]   │ │ [Brand Logo]   │         ││
│  │  │                │ │                │ │                │         ││
│  │  │ Brand Name     │ │ Brand Name     │ │ Brand Name     │         ││
│  │  │ CATEGORY       │ │ CATEGORY       │ │ CATEGORY       │         ││
│  │  │ Brand descript..│ │ Brand descript..│ │ Brand descript..        ││
│  │  │                │ │                │ │                │         ││
│  │  │ ──────────────│ │ ──────────────│ │ ──────────────│         ││
│  │  │[View Details] │ │[View Details] │ │[View Details] │         ││
│  │  │(Blue #60a5fa) │ │(Blue #60a5fa) │ │(Blue #60a5fa) │         ││
│  │  │   [Edit]      │ │   [Edit]      │ │   [Edit]      │         ││
│  │  │(Tomato #ff63) │ │(Tomato #ff63) │ │(Tomato #ff63) │         ││
│  │  │   [Delete]    │ │   [Delete]    │ │   [Delete]    │         ││
│  │  │(Tomato #ff63) │ │(Tomato #ff63) │ │(Tomato #ff63) │         ││
│  │  └────────────────┘ └────────────────┘ └────────────────┘         ││
│  │                                                                      ││
│  │  If No Brands:                                                      ││
│  │  ┌────────────────────────────────────────────────────────────┐   ││
│  │  │ You haven't uploaded any brands yet.                       │   ││
│  │  │ Start by creating your first brand!                        │   ││
│  │  │         [+Upload New Brand] (Blue Button)                  │   ││
│  │  └────────────────────────────────────────────────────────────┘   ││
│  │                                                                      ││
│  └──────────────────────────────────────────────────────────────────────┘│
│                                                                            │
└──────────────────────────────────────────────────────────────────────────┘
```

## 📱 Mobile Responsive Behavior

### Tablet (768px)
```
Navigation Bar: Stacks vertically
- Logo + Title on left
- Buttons on right (may wrap if needed)

Profile Card: Full width with padding
- Photo on top
- Name and email below
- Info grid becomes 2 columns
- Form becomes single column

Brands Grid: 2 columns
```

### Mobile Phone (480px)
```
Navigation Bar: Single column stack
- Logo + Title
- Buttons wrap to next line

Profile Card: Single column
- All content stacks
- Form inputs full width

Brands Grid: Single column
- Cards full width
- Buttons stack vertically
```

## 🎯 Click Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    PROFILE PAGE                              │
└─────────────────────────────────────────────────────────────┘
                           │
           ┌───────────────┼───────────────┐
           │               │               │
           ▼               ▼               ▼
      [Logo/Title]  [Edit Profile]  [Brands Section]
      Click ──────→ HOME PAGE      Click ──────→ Enable Edit
                                                    │
                                         ┌──────────┴──────────┐
                                         ▼                     ▼
                                    [Save Changes]      [Cancel]
                                    Update Profile      Revert Changes
           
           ▼
    [+Upload Brand]
    Click ──────→ /upload-brand

           ▼
    [Dashboard]
    Click ──────→ /dashboard

           ▼
    [Logout]
    Click ──────→ Clear Token, /login


BRAND CARD INTERACTIONS:
┌───────────────────────────────────────────┐
│         BRAND CARD                         │
└───────────────────────────────────────────┘
     │           │            │
     ▼           ▼            ▼
[View Details] [Edit]      [Delete]
     │           │            │
     ▼           ▼            ▼
/brand/{id}  /edit-brand/  Confirm Dialog
             {id}          Delete from DB
```

## 🎨 Color Reference Card

| Element | Color | Hex Code | Usage |
|---------|-------|----------|-------|
| Primary Buttons | Blue | #60a5fa | Edit, Upload, Dashboard, View Details, Save |
| Secondary Buttons | Tomato | #ff6347 | Edit, Delete, Logout |
| Accent Elements | Light Blue | #93c5fd | Hover states |
| Background | Dark Blue | #0a1c2d | Page background |
| Cards Background | Darker Blue | #0f2438 | Card backgrounds |
| Nav Background | Almost Black | #020617 | Navigation bar |
| Text Primary | White | #ffffff | Main text |
| Text Secondary | Light Blue | #cbd5e1 | Secondary text |
| Borders | Blue Transparent | rgba(96,165,250,0.2) | Card borders |

## ✨ Animation Speeds

| Element | Duration | Easing | Effect |
|---------|----------|--------|--------|
| Button Hover | 0.3s | ease | Scale + Shadow |
| Card Hover | 0.3s | ease | Translate + Border |
| Input Focus | 0.3s | ease | Background + Border |
| All Transitions | 0.3s | ease | Smooth interaction |

## 🔧 Spacing System

| Size | Value | Used For |
|------|-------|----------|
| xs | 8px | Small gaps, borders |
| sm | 12px | Button gaps, nav items |
| md | 16px | Form fields, card padding |
| lg | 20px | Section padding, info items |
| xl | 24px | Grid gaps, card spacing |
| 2xl | 30px | Major sections |
| 3xl | 40px | Main container padding |

## 📐 Typography Hierarchy

| Element | Size | Weight | Color |
|---------|------|--------|-------|
| Page Title (h2) | 32px | 700 | White |
| Section Title (h3) | 28px | 700 | White |
| Card Title (h4) | 18px | 700 | White |
| Label | 14px | 600 | Blue #60a5fa |
| Body Text | 15px | 400 | White |
| Small Text | 13px | 600 | Light Blue |

---

This visual guide helps understand the complete structure and layout of your professional profile page!
