# Changelog

All notable changes to the Shepherd Dashboard project will be documented in this file.

## [Unreleased]

### Changed - 2025-10-23

#### Rebranding: Church Dashboard → Shepherd Dashboard

**Project Name Changes:**
- Renamed project directory from `church-dashboard` to `shepherd-dashboard`
- Updated `package.json` name field to `shepherd-dashboard`
- Updated HTML title to "Shepherd Dashboard"

**Application Branding:**
- Changed sidebar logo from "Church Portal" to "Shepherd"
- Updated login page title from "Church Management System" to "Shepherd"
- Updated all documentation references

**Files Modified:**
1. `package.json` - Project name
2. `index.html` - Page title
3. `src/components/layout/Sidebar.jsx` - Logo text
4. `src/pages/auth/Login.jsx` - Page heading
5. `README.md` - All references updated
6. `QUICKSTART.md` - All references updated
7. `DEPLOYMENT.md` - All references updated
8. `TESTING.md` - All references updated
9. `PROJECT_SUMMARY.md` - All references updated

**Build Status:**
- ✅ Production build verified and working
- ✅ Development server tested and functional
- ✅ No breaking changes to functionality
- ✅ All features remain intact

**Migration Notes:**
- If you have the project already running, restart your dev server
- Update any bookmarks or shortcuts to use new project name
- No database or API changes required
- All environment variables remain the same

---

## [1.0.0] - 2025-10-23

### Added
- Complete authentication system with JWT and MFA
- Full member management (CRUD operations)
- Dashboard with statistics and recent activity
- Member engagement tracking
- Unconnected members view
- Role-based access control
- Responsive design for all screen sizes
- Search, filter, and pagination
- Toast notifications
- Confirmation dialogs
- Loading states and error handling

### Features
- Authentication & Authorization
- Member Management
- Dashboard & Analytics
- Engagement Tracking
- Modern UI/UX

### Tech Stack
- React 18
- Vite
- Tailwind CSS
- React Query
- React Router v6
- Axios
- Headless UI
- Heroicons

---

**Project Status:** Production Ready ✅
