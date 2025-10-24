import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { DashboardLayout } from './components/layout/DashboardLayout';

// Pages
import { Login } from './pages/auth/Login';
import { Dashboard } from './pages/dashboard/Dashboard';
import { MembersList } from './pages/members/MembersList';
import { MemberForm } from './pages/members/MemberForm';
import { MemberDetail } from './pages/members/MemberDetail';
import { MemberEngagement } from './pages/members/MemberEngagement';
import { UnconnectedMembers } from './pages/members/UnconnectedMembers';
import { UserProfile } from './pages/profile/UserProfile';
import { SearchResults } from './pages/search/SearchResults';
import { Settings } from './pages/settings/Settings';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Dashboard />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/members"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <MembersList />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/members/new"
              element={
                <ProtectedRoute roles={['SUPER_ADMIN', 'ADMIN_STAFF', 'PASTORAL_STAFF']}>
                  <DashboardLayout>
                    <MemberForm />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/members/unconnected"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <UnconnectedMembers />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/members/:id"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <MemberDetail />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/members/:id/edit"
              element={
                <ProtectedRoute roles={['SUPER_ADMIN', 'ADMIN_STAFF', 'PASTORAL_STAFF']}>
                  <DashboardLayout>
                    <MemberForm />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/members/:id/engagement"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <MemberEngagement />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <UserProfile />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/search"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <SearchResults />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Settings />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
