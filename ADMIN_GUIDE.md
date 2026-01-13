# Admin Dashboard Guide - KT Mobile Singapore

## Overview
Complete admin system for managing phone models, prices, and brand settings.

## Login Credentials

### Master Admin Access (Full Control)
- **Email:** `master@ktmobile.sg`
- **Password:** `master123`
- **URL:** `login.html` → Select "Admin" → Login
- **Permissions:** Full access including user management

### Regular Admin Access
- **Email:** `admin@ktmobile.sg`
- **Password:** `admin123`
- **URL:** `login.html` → Select "Admin" → Login
- **Permissions:** Full access except user management

### Customer Access (Demo)
- **Email:** `customer@example.com`
- **Password:** `customer123`
- **URL:** `login.html` → Select "Customer" → Login

## Features

### 1. Phone Models Management
- **View all phones** in a grid layout
- **Add new phones** with:
  - Brand selection
  - Model name
  - Image upload or URL
  - Storage options (64GB, 128GB, 256GB, 512GB, 1TB)
  - Available colors
  - Base price
  - Storage-specific price modifiers
- **Edit existing phones**
- **Delete phones**
- **Filter by brand**
- **Search phones**

### 2. Price Management
- View all phones with storage options in a table
- Update prices individually
- Bulk price updates
- Real-time price calculation based on storage modifiers

### 3. Brand Settings
- Set default images for each brand
- Customize brand colors
- Manage brand-specific settings

### 4. User Management (Master Admin Only)
- **View all admin users** in a table
- **Add new admin users** with:
  - Full name
  - Email address
  - Password (minimum 6 characters)
  - Permission type selection:
    - **Admin** - Full access except user management
    - **Editor** - Can edit phones and prices, cannot delete
    - **Viewer** - Read-only access
- **Edit existing admin users** (change name, password, permissions)
- **Delete admin users** (cannot delete Master Admin or yourself)
- **Permission-based access control** throughout the system

### 5. System Settings
- Company information
- Contact details
- Currency settings
- Price update frequency
- Image source preferences

### 6. Phone Image Guidelines

**IMPORTANT:** All phone images must follow these standardized specifications for consistent display across the website.

#### Image Specifications
- **Dimensions:** 160 x 212 pixels (fixed size)
- **Aspect Ratio:** 3:4 (portrait orientation)
- **File Format:** JPEG (.jpg)
- **File Size:** Recommended < 50KB for optimal loading
- **Background:** Transparent or white background preferred
- **Quality:** High resolution, clear product shot
- **Naming Convention:** `brand-model-variant.jpg` (e.g., `iphone-16-pro-max.jpg`)

#### Image Requirements
1. **Centered Product:** Phone should be centered in the frame
2. **No Text Overlays:** Product image only, no promotional text
3. **Consistent Angle:** Front-facing, slightly angled (similar to other products)
4. **Good Lighting:** Well-lit, no harsh shadows
5. **Clean Background:** Plain white or transparent background
6. **No Watermarks:** Remove any brand watermarks or logos

#### File Location
- All phone images must be placed in: `/images/phones/`
- Use lowercase file names with hyphens (not spaces)

#### How to Add Images
1. **Prepare Image:**
   - Resize to exactly 160x212 pixels
   - Use tools like Photoshop, GIMP, or online resizers
   - Save as JPEG with 80-90% quality

2. **Upload to Project:**
   - Place file in `/images/phones/` directory
   - Name file according to convention: `brand-model.jpg`

3. **Update Admin Dashboard:**
   - Login to admin panel
   - Navigate to Phone Models
   - Edit the phone or add new phone
   - Enter image path: `images/phones/your-image-name.jpg`
   - Save changes

#### Quick Resize Commands
If you have ImageMagick installed:
```bash
# Resize to exact dimensions
convert input.jpg -resize 160x212! output.jpg

# Resize and maintain aspect ratio with padding
convert input.jpg -resize 160x212 -gravity center -extent 160x212 -background white output.jpg
```

#### Image Fallback System
The website has a built-in fallback system:
- Primary image loads from specified path
- If fails, tries alternative image sources
- Finally shows placeholder or hides image

#### Best Practices
✅ Always test images on both desktop and mobile
✅ Check image quality after upload
✅ Use consistent lighting across all products
✅ Verify image loads correctly in all browsers
✅ Keep file sizes small for fast loading

❌ Don't use images with text overlays
❌ Don't use low resolution or blurry images
❌ Don't mix different aspect ratios
❌ Don't use copyrighted images without permission

## Permission Types

### Master Admin
- ✅ Manage users (create, edit, delete admins)
- ✅ Manage phones (add, edit, delete)
- ✅ Manage prices
- ✅ Manage brand settings
- ✅ Manage system settings
- ✅ Delete operations

### Admin
- ❌ Manage users
- ✅ Manage phones (add, edit, delete)
- ✅ Manage prices
- ✅ Manage brand settings
- ✅ Manage system settings
- ✅ Delete operations

### Editor
- ❌ Manage users
- ✅ Manage phones (add, edit only - no delete)
- ✅ Manage prices
- ❌ Manage brand settings
- ❌ Manage system settings
- ❌ Delete operations

### Viewer
- ❌ All operations (read-only)

## File Structure

```
├── login.html          # Login page
├── login.css           # Login page styles
├── admin.html          # Admin dashboard
├── admin.css           # Admin dashboard styles
├── auth.js             # Authentication system
├── admin.js            # Admin CRUD operations
└── ADMIN_GUIDE.md      # This file
```

## Usage Instructions

### Adding a New Phone
1. Login as admin
2. Go to "Phone Models" section
3. Click "Add New Phone"
4. Fill in:
   - Brand (required)
   - Model name (required)
   - Image URL or upload file
   - Select storage options
   - Enter colors (comma-separated)
   - Set base price
   - Set storage price modifiers
5. Click "Save Phone"

### Editing a Phone
1. Find the phone in the grid
2. Click the edit icon (✏️)
3. Modify fields as needed
4. Click "Save Phone"

### Updating Prices
1. Go to "Price Management" section
2. Find the phone and storage option
3. Enter new price in the input field
4. Click "Save" button

### Setting Brand Images
1. Go to "Brand Settings" section
2. Click on a brand card
3. Enter image path (e.g., `images/phones/iphone-16-pro-max.jpg`)
4. Click "Save Image"

### Adding a New Admin User (Master Admin Only)
1. Login as Master Admin (`master@ktmobile.sg`)
2. Go to "User Management" section (only visible to Master Admin)
3. Click "Add New Admin"
4. Fill in:
   - Full name (required)
   - Email address (required, must be unique)
   - Password (required, minimum 6 characters)
   - Confirm password
   - Permission type (Admin, Editor, or Viewer)
5. Click "Create Admin"

### Editing an Admin User
1. Find the admin in the users table
2. Click "Edit" button
3. Modify name, password (optional), or permission type
4. Click "Create Admin" (button text stays the same)

### Deleting an Admin User
1. Find the admin in the users table
2. Click "Delete" button
3. Confirm deletion
4. Note: Cannot delete Master Admin or your own account

## Data Storage

Currently uses **localStorage** for demo purposes. In production:
- Replace with backend API calls
- Use proper database (PostgreSQL, MongoDB, etc.)
- Implement proper authentication (JWT tokens)
- Add password hashing (bcrypt)
- Add user role management

## Security Notes

⚠️ **Current Implementation is for Demo Only**

For production:
- Implement server-side authentication
- Use HTTPS
- Hash passwords (never store plain text)
- Implement CSRF protection
- Add rate limiting
- Use secure session management
- Validate all inputs server-side

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Support

For issues or questions, contact: sales@ktmobile.sg
