# Shepherd Dashboard

A modern, responsive React dashboard for managing church members, groups, and engagement data. Built with React, Tailwind CSS, and React Query.

## Features

✅ **Authentication & Authorization**
- Secure login with JWT tokens
- Multi-factor authentication (MFA) support
- Role-based access control (RBAC)
- Auto token refresh
- Protected routes

✅ **Member Management**
- Complete CRUD operations for members
- Advanced search and filtering
- Pagination support
- Member detail views
- Engagement tracking

✅ **Dashboard & Analytics**
- Summary statistics
- Recent member activity
- Unconnected members tracking
- Quick action shortcuts

✅ **Engagement Tracking**
- Connect groups participation
- Serving teams involvement
- Ministry engagement
- Milestone progress
- Skills and abilities tracking

✅ **Modern UI/UX**
- Responsive design (mobile-first)
- Clean, professional interface
- Loading states and error handling
- Toast notifications
- Modal dialogs

## Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Headless UI
- **State Management**: React Query + Context API
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Icons**: Heroicons
- **Date Handling**: date-fns
- **Notifications**: React Hot Toast

## Prerequisites

- Node.js 18+ and npm
- Backend API running (see backend documentation)

## Getting Started

### 1. Clone and Install

```bash
cd shepherd-dashboard
npm install
```

### 2. Configure Environment

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 4. Login

Use the test credentials from your backend:

```
Email: admin@church.org
Password: Admin123!
```

## Project Structure

```
shepherd-dashboard/
├── src/
│   ├── api/                    # API client and endpoints
│   │   ├── client.js          # Axios configuration
│   │   ├── auth.js            # Auth API
│   │   └── members.js         # Members API
│   ├── components/
│   │   ├── layout/            # Layout components
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Header.jsx
│   │   │   └── DashboardLayout.jsx
│   │   ├── auth/              # Auth components
│   │   │   └── ProtectedRoute.jsx
│   │   └── common/            # Shared components
│   │       ├── LoadingSpinner.jsx
│   │       ├── Modal.jsx
│   │       └── ConfirmDialog.jsx
│   ├── contexts/              # React Context
│   │   └── AuthContext.jsx
│   ├── pages/                 # Page components
│   │   ├── auth/
│   │   │   └── Login.jsx
│   │   ├── dashboard/
│   │   │   └── Dashboard.jsx
│   │   └── members/
│   │       ├── MembersList.jsx
│   │       ├── MemberForm.jsx
│   │       ├── MemberDetail.jsx
│   │       ├── MemberEngagement.jsx
│   │       └── UnconnectedMembers.jsx
│   ├── utils/                 # Utility functions
│   │   └── permissions.js
│   ├── App.jsx               # Main app component
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles
├── .env                       # Environment variables
├── .env.example              # Environment template
├── tailwind.config.js        # Tailwind configuration
├── postcss.config.js         # PostCSS configuration
├── vite.config.js            # Vite configuration
└── package.json              # Dependencies
```

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## API Integration

The dashboard connects to the Church Management API. Configure the base URL in `.env`:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

### API Features

- **Authentication**: Login, refresh token, MFA
- **Members**: CRUD operations, search, filter
- **Engagement**: View member involvement
- **Unconnected**: Track members without groups

## User Roles & Permissions

| Role | Permissions |
|------|-------------|
| **SUPER_ADMIN** | Full access to all features |
| **ADMIN_STAFF** | Create, update, view members; Cannot delete |
| **PASTORAL_STAFF** | Create, update, view members |
| **MINISTRY_LEADER** | View members and manage ministry |
| **READ_ONLY** | View-only access |

## Key Features

### Authentication

- JWT-based authentication
- Automatic token refresh
- Secure password handling
- MFA support for enhanced security

### Member Management

- **List View**: Search, filter, paginate members
- **Create/Edit**: Form validation and consent management
- **Detail View**: Complete member information
- **Engagement**: Track member involvement

### Dashboard

- Summary statistics
- Recent member activity
- Quick actions
- Unconnected members alert

### Responsive Design

- Mobile-friendly navigation
- Collapsible sidebar
- Touch-optimized controls
- Adaptive layouts

## Color Theme

The dashboard uses a carefully selected color palette:

- **Primary**: `#262424` (Dark charcoal)
- **Secondary**: `#797B84` (Cool gray)
- **Accent**: `#D91E36` (Vibrant red)
- **Light**: `#EEEE5DA` (Warm beige)

## Development Tips

### Adding New Pages

1. Create component in `src/pages/[category]/`
2. Import in `App.jsx`
3. Add route with appropriate protection
4. Update sidebar navigation if needed

### API Calls

Use React Query for all API calls:

```javascript
const { data, isLoading, error } = useQuery({
  queryKey: ['members'],
  queryFn: () => membersAPI.getAll(),
});
```

### Protected Routes

Wrap routes that require authentication:

```javascript
<Route
  path="/members"
  element={
    <ProtectedRoute roles={['SUPER_ADMIN', 'ADMIN_STAFF']}>
      <DashboardLayout>
        <MembersList />
      </DashboardLayout>
    </ProtectedRoute>
  }
/>
```

### Styling

Use Tailwind utility classes and custom classes defined in `index.css`:

- `.btn-primary` - Primary button
- `.btn-secondary` - Secondary button
- `.btn-outline` - Outline button
- `.input-field` - Form input
- `.card` - Card container

## Troubleshooting

### API Connection Issues

1. Verify backend is running
2. Check `.env` file has correct API URL
3. Ensure CORS is enabled on backend

### Authentication Problems

1. Clear browser localStorage
2. Check token expiration
3. Verify credentials

### Build Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Production Build

```bash
# Build the application
npm run build

# The dist/ folder contains the production build
# Deploy to any static hosting service
```

### Deployment Options

- **Vercel**: `vercel deploy`
- **Netlify**: Drag and drop `dist/` folder
- **AWS S3**: Upload `dist/` contents
- **GitHub Pages**: Use `gh-pages` branch

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use for your church or organization.

## Support

For issues or questions:
- Check the API documentation
- Review this README
- Contact your system administrator

---

**Built with ❤️ for church communities**
