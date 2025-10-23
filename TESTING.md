# Testing Guide

This guide will help you test all features of the Shepherd Dashboard.

## Prerequisites

Before testing, ensure:
- ✅ Backend API is running at `http://localhost:3000`
- ✅ Dashboard is running at `http://localhost:5173`
- ✅ You have test credentials

## Starting the Application

```bash
# Terminal 1: Start the dashboard
cd shepherd-dashboard
npm run dev
```

The app will open at `http://localhost:5173`

## Test Scenarios

### 1. Authentication Tests

#### Test Login
1. Navigate to `http://localhost:5173/login`
2. Enter credentials:
   - Email: `admin@church.org`
   - Password: `Admin123!`
3. Click "Sign in"
4. ✅ Should redirect to dashboard
5. ✅ Should see "Welcome back, System" message
6. ✅ Sidebar should show user initials

#### Test Protected Routes
1. Open a new incognito/private window
2. Try to access `http://localhost:5173/members`
3. ✅ Should redirect to login page
4. Login with credentials
5. ✅ Should redirect back to members page

#### Test Logout
1. Click user avatar in top-right
2. Click "Sign out"
3. ✅ Should redirect to login
4. Try accessing `/members`
5. ✅ Should redirect to login

### 2. Dashboard Tests

#### Test Dashboard View
1. Login and navigate to dashboard (`/`)
2. ✅ Should see 4 stat cards:
   - Total Members
   - Unconnected
   - Active Groups
   - New Members This Month
3. ✅ Should see "Quick Actions" section
4. ✅ Should see "Recent Members" table
5. ✅ If unconnected members exist, should see yellow alert

#### Test Quick Actions
1. Click "Add New Member"
   - ✅ Should navigate to `/members/new`
2. Go back, click "View Unconnected"
   - ✅ Should navigate to `/members/unconnected`
3. Go back, click "View All Members"
   - ✅ Should navigate to `/members`

### 3. Member List Tests

#### Test Member List Display
1. Navigate to `/members`
2. ✅ Should see members table
3. ✅ Should see pagination at bottom
4. ✅ Should see "Add Member" button (if admin/staff role)
5. ✅ Should see action icons for each member

#### Test Search
1. Type a name in the search box
2. ✅ Results should filter in real-time
3. Clear search
4. ✅ Should show all members again

#### Test Filters
1. Select a status from dropdown (e.g., "Visitor")
2. ✅ Should filter members by status
3. Select "Children" from type filter
4. ✅ Should show only children
5. Click "Clear Filters"
6. ✅ Should reset all filters

#### Test Pagination
1. If more than 20 members:
2. Click "Next" button
3. ✅ Should load page 2
4. ✅ Page number should update
5. Click "Previous"
6. ✅ Should go back to page 1

### 4. Create Member Tests

#### Test Create Form
1. Click "Add Member" button
2. ✅ Should navigate to `/members/new`
3. ✅ Form should be empty
4. Try submitting without filling required fields
5. ✅ Should show validation errors

#### Test Form Validation
1. Enter only first name
2. Try to submit
3. ✅ Should show "Last name required" error
4. Fill all required fields:
   - First Name: "Test"
   - Last Name: "User"
   - Status: "Visitor"
5. Submit form
6. ✅ Should show success toast
7. ✅ Should redirect to members list
8. ✅ New member should appear in list

#### Test Form Cancel
1. Click "Add Member"
2. Fill in some fields
3. Click "Cancel"
4. ✅ Should navigate back
5. ✅ Changes should not be saved

### 5. Member Detail Tests

#### Test Member View
1. From members list, click eye icon on a member
2. ✅ Should navigate to `/members/:id`
3. ✅ Should see member's full information:
   - Name, email, phone
   - Date of birth, gender
   - Status
   - Household info (if exists)
   - Consent information
4. ✅ Should see "Edit" button
5. ✅ Should see "View Engagement" button

#### Test Quick Actions
1. Click email link
   - ✅ Should open default email client
2. Click phone link
   - ✅ Should initiate phone call (mobile) or open dialer
3. Click "View Engagement"
   - ✅ Should navigate to engagement page

### 6. Edit Member Tests

#### Test Edit Form
1. From member detail, click "Edit"
2. ✅ Should navigate to `/members/:id/edit`
3. ✅ Form should be pre-filled with current data
4. Change some fields:
   - Update phone number
   - Change status
5. Click "Update Member"
6. ✅ Should show success toast
7. ✅ Should redirect to member detail
8. ✅ Changes should be visible

#### Test Edit Validation
1. Edit a member
2. Clear required field (e.g., first name)
3. Try to submit
4. ✅ Should show validation error
5. ✅ Should not save

### 7. Member Engagement Tests

#### Test Engagement View
1. Navigate to member detail
2. Click "View Engagement"
3. ✅ Should navigate to `/members/:id/engagement`
4. ✅ Should see 4 summary cards:
   - Connect Groups
   - Serving Teams
   - Ministries
   - Completed Milestones
5. ✅ Should see sections for:
   - Connect Groups (with details)
   - Serving Teams (with roles)
   - Ministries (with roles)
   - Milestones (with progress)
6. ✅ If covenant partner, should see status
7. ✅ If skills exist, should see skills section

#### Test Navigation
1. Click back arrow
2. ✅ Should return to member detail

### 8. Unconnected Members Tests

#### Test Unconnected View
1. Navigate to `/members/unconnected`
2. ✅ Should see count of unconnected members
3. ✅ Should see table of members
4. ✅ Each member should show:
   - Name, email, phone
   - Status
   - First visit date
5. Click eye icon
6. ✅ Should navigate to member detail

### 9. Delete Member Tests

#### Test Delete Confirmation
1. From members list, find a test member
2. Click trash icon (if admin role)
3. ✅ Should show confirmation dialog
4. ✅ Dialog should show member name
5. Click "Cancel"
6. ✅ Dialog should close
7. ✅ Member should not be deleted

#### Test Delete Action
1. Click trash icon again
2. Click "Delete"
3. ✅ Should show success toast
4. ✅ Member should disappear from list
5. ✅ List should refresh

### 10. Responsive Design Tests

#### Test Mobile View
1. Resize browser to mobile width (< 768px)
2. ✅ Sidebar should be hidden
3. ✅ Should see hamburger menu icon
4. Click hamburger icon
5. ✅ Sidebar should slide in
6. ✅ Backdrop should appear
7. Click backdrop
8. ✅ Sidebar should close

#### Test Tablet View
1. Resize browser to tablet width (768px - 1024px)
2. ✅ Layout should adapt
3. ✅ Tables should be scrollable
4. ✅ Cards should stack properly

### 11. Role-Based Access Tests

#### Test Admin Role
1. Login as `admin@church.org`
2. ✅ Should see "Add Member" button
3. ✅ Should see delete icons on members
4. ✅ Should see all navigation items

#### Test Read-Only Role (if available)
1. Login as read-only user
2. ✅ Should NOT see "Add Member" button
3. ✅ Should NOT see edit/delete icons
4. ✅ Should only see view actions

### 12. Error Handling Tests

#### Test Network Errors
1. Stop the backend API
2. Try to load members list
3. ✅ Should show error message
4. Start backend again
5. Refresh page
6. ✅ Should load successfully

#### Test Invalid Member ID
1. Navigate to `/members/invalid-id`
2. ✅ Should show error message
3. ✅ Should offer way to go back

#### Test API Errors
1. Try to create member with duplicate email (if backend validates)
2. ✅ Should show error toast
3. ✅ Form should remain filled
4. ✅ Can correct and retry

### 13. Loading States Tests

#### Test Loading Indicators
1. Navigate to members list
2. ✅ Should see loading spinner while fetching
3. Navigate to member detail
4. ✅ Should see loading spinner
5. All actions should show loading state during API calls

### 14. UI/UX Tests

#### Test Toast Notifications
1. Create a member
   - ✅ Should show green success toast
2. Try invalid action
   - ✅ Should show red error toast
3. Toast should auto-dismiss after 4 seconds

#### Test Empty States
1. If no members exist:
   - ✅ Should show "No members found" message
2. If no unconnected members:
   - ✅ Should show "All members are connected"

### 15. Performance Tests

#### Test Page Load Speed
1. Clear browser cache
2. Navigate to dashboard
3. ✅ Should load within 2 seconds
4. Navigate between pages
5. ✅ Should be instant (React Router)

#### Test Search Performance
1. Go to members list
2. Type in search box
3. ✅ Should filter without lag
4. ✅ Should handle 100+ members smoothly

## Test Results Checklist

Use this checklist to track your testing:

### Authentication
- [ ] Login works
- [ ] Logout works
- [ ] Protected routes work
- [ ] Token refresh works

### Dashboard
- [ ] Stats display correctly
- [ ] Recent members show
- [ ] Quick actions work
- [ ] Alerts appear

### Members
- [ ] List displays
- [ ] Search works
- [ ] Filters work
- [ ] Pagination works
- [ ] Create works
- [ ] Edit works
- [ ] Delete works
- [ ] Detail view works

### Engagement
- [ ] Engagement displays
- [ ] All sections show
- [ ] Data is accurate

### Unconnected
- [ ] List shows correctly
- [ ] Count is accurate

### Responsive
- [ ] Mobile layout works
- [ ] Tablet layout works
- [ ] Desktop layout works

### Permissions
- [ ] Admin sees all features
- [ ] Staff has correct access
- [ ] Read-only is restricted

### Error Handling
- [ ] Network errors handled
- [ ] Invalid data handled
- [ ] User sees helpful messages

### Loading
- [ ] Spinners show
- [ ] No blank screens
- [ ] Smooth transitions

## Reporting Issues

If you find any issues:

1. Note the exact steps to reproduce
2. Include browser/device info
3. Check browser console for errors
4. Note any error messages shown
5. Document expected vs actual behavior

## Test Data Recommendations

Create test members with various scenarios:

- Regular adult member
- Child member
- Member with household
- Member without email
- Member in multiple groups
- Unconnected member
- Inactive member

This will help test all UI states and edge cases.

---

**Happy Testing!** 🧪
