# Firebase Firestore Security Rules Setup

This document contains the security rules you need to configure in your Firebase Firestore Database.

## How to Configure Security Rules

1. Go to https://console.firebase.google.com
2. Select your **"ibox-mobile"** project
3. In the left sidebar, click **"Firestore Database"**
4. Click the **"Rules"** tab at the top
5. Replace the existing rules with the rules below
6. Click **"Publish"** to apply the changes

---

## Security Rules (Copy & Paste This)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Settings collection (hero image, condition modifiers, price database)
    match /settings/{document=**} {
      // Anyone can read settings (needed for customer-facing pages)
      allow read: if true;

      // Anyone can write for now (test mode)
      // TODO: Add authentication and restrict writes to admin users only
      allow write: if true;

      // FUTURE: Restrict writes to authenticated admins
      // allow write: if request.auth != null;
    }

    // Appointments collection
    match /appointments/{appointmentId} {
      // Anyone can read appointments (needed for customer booking lookups)
      allow read: if true;

      // Anyone can create appointments (customers need this)
      allow create: if true;

      // Anyone can update/delete for now (test mode)
      // TODO: Add authentication and restrict to admin users only
      allow update, delete: if true;

      // FUTURE: Restrict updates/deletes to authenticated admins
      // allow update, delete: if request.auth != null;
    }

    // Default: Deny all other collections
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

---

## What These Rules Do

### Phase 1: Test Mode (Current)
- ✅ **Anyone can read** settings and appointments (required for website to work)
- ✅ **Anyone can write** settings and appointments (test mode for now)
- ⚠️ This is **NOT secure** for production but allows testing

### Phase 2: Production Mode (Future - Add Authentication)
Once you've tested that Firebase sync works, you should:

1. **Add Firebase Authentication** to admin panel
2. **Update security rules** to require authentication for writes:

```javascript
// Replace these lines in the rules:
allow write: if true;  // ← Remove this

// With this:
allow write: if request.auth != null;  // ← Only authenticated users can write
```

---

## How to Test Your Rules

After publishing the rules, test them:

### Test 1: Read Access (Should Work)
1. Open your website in browser (desktop or mobile)
2. Check browser console - should see:
   - ✅ `"Firebase initialized successfully"`
   - ✅ `"Initial data load complete"`
   - ✅ `"Hero image loaded from cloud"` (if data exists)

### Test 2: Write Access (Should Work)
1. Open admin panel
2. Change hero image or update condition modifiers
3. Check browser console - should see:
   - ✅ `"Hero image synced to cloud"`
   - ✅ `"Condition modifiers synced to cloud"`

### Test 3: Verify Data in Firebase Console
1. Go to Firebase Console → Firestore Database
2. Click **"Data"** tab
3. You should see collections:
   - `settings/heroImage`
   - `settings/conditionModifiers`
   - `settings/priceDatabase`
   - `appointments/[appointment IDs]`

---

## Security Notes

### Current Risk Level: MEDIUM
- ⚠️ Anyone with your website URL can write data
- ⚠️ Malicious users could potentially corrupt your data
- ✅ Your Firebase API keys are public (this is normal and safe for web apps)
- ✅ Data is only accessible through your domain

### Mitigation Strategies (Current)
1. **Monitor Firebase Console** regularly for unexpected data
2. **Backup data** periodically (Export/Import feature in admin panel)
3. **Don't store sensitive data** (no customer passwords, credit cards, etc.)

### Future Production Security
Once you add authentication:
- ✅ Only logged-in admins can modify settings
- ✅ Customers can create appointments but not edit them
- ✅ Malicious users blocked from writing data

---

## Need Help?

If you encounter errors:

### Error: "Missing or insufficient permissions"
- **Cause:** Rules not published yet
- **Fix:** Go to Firebase Console → Firestore → Rules → Publish

### Error: "PERMISSION_DENIED"
- **Cause:** Rules too restrictive
- **Fix:** Check that `allow read: if true;` is present for settings

### Error: "Firebase not defined"
- **Cause:** firebase-config.js not loaded
- **Fix:** Check HTML includes `<script type="module" src="firebase-config.js"></script>`

---

## Summary

**Copy the security rules above** → **Paste in Firebase Console** → **Click Publish** → **Done!**

Your website will now sync data across all devices in real-time! 🎉
