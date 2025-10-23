# Quick Start Guide

Get up and running with the Shepherd Dashboard in 5 minutes!

## Prerequisites

Make sure you have:
- ✅ Node.js 18 or higher installed
- ✅ Backend API running at `http://localhost:3000`
- ✅ Test credentials from backend setup

## Installation

### Step 1: Install Dependencies

```bash
npm install
```

This will install all required packages including React, Tailwind CSS, React Query, and more.

### Step 2: Configure API Connection

The `.env` file is already created with:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

If your backend runs on a different port, update this value.

### Step 3: Start the Development Server

```bash
npm run dev
```

The app will open at `http://localhost:5173`

### Step 4: Login

Use the default credentials:
- **Email**: `admin@church.org`
- **Password**: `Admin123!`

## What You'll See

After logging in, you'll have access to:

1. **Dashboard** - Overview of members, statistics, and quick actions
2. **Members** - Full member management (create, view, edit, delete)
3. **Unconnected** - Members not in any connect group
4. **Engagement** - View member involvement in groups, teams, and ministries

## Key Pages

### Dashboard (/)
- Member statistics
- Recent members
- Quick actions
- Unconnected members alert

### Members (/members)
- List all members
- Search and filter
- Pagination
- Create/Edit/Delete actions

### Member Detail (/members/:id)
- Complete member information
- Household details
- Consent information
- Quick actions

### Member Engagement (/members/:id/engagement)
- Connect groups
- Serving teams
- Ministries
- Milestone progress
- Skills and abilities

### Unconnected Members (/members/unconnected)
- Members without groups
- Follow-up tracking

## User Roles

The dashboard supports these roles:

- **SUPER_ADMIN** - Full access
- **ADMIN_STAFF** - Create, update members
- **PASTORAL_STAFF** - Create, update members
- **MINISTRY_LEADER** - View members
- **READ_ONLY** - View only

Different roles will see different navigation items and actions.

## Common Tasks

### Add a New Member

1. Click "Add Member" button
2. Fill in personal information
3. Set status (Newcomer, Visitor, etc.)
4. Manage consents
5. Click "Create Member"

### Search for Members

1. Go to Members page
2. Use the search box to find by name or email
3. Apply filters (status, adult/child)
4. Results update in real-time

### View Member Engagement

1. Go to member detail page
2. Click "View Engagement" button
3. See all groups, teams, ministries
4. Track milestone progress

### Track Unconnected Members

1. Go to Dashboard
2. See unconnected count in stats
3. Click "View unconnected members"
4. Reach out to help them connect

## Troubleshooting

### Can't login?

- Verify backend is running
- Check credentials match backend users
- Clear browser cache and try again

### Can't see data?

- Check `.env` has correct API URL
- Open browser console for errors
- Verify backend API is responding

### Build errors?

```bash
rm -rf node_modules
npm install
```

## Next Steps

- Explore all pages and features
- Create test members
- Test search and filtering
- Try different user roles
- Customize colors in `tailwind.config.js`

## Need Help?

- Check `README.md` for full documentation
- Review API documentation
- Check browser console for errors
- Contact your administrator

---

Happy church managing! 🙏
