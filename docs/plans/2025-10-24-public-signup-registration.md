# Public Signup/Registration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a public signup/registration page for new users to create accounts without admin intervention.

**Architecture:** Create a new public registration endpoint in the backend API, add a signup page with form validation, and integrate with the existing authentication flow. The signup page will be accessible without authentication, validate user input, and create new user accounts with default "VIEWER" role.

**Tech Stack:** React, React Hook Form, Axios, React Router, React Hot Toast, Tailwind CSS

---

## Prerequisites

**Assumptions:**
- Backend API has or will have a `POST /auth/register` endpoint
- Default role for self-registration is "VIEWER"
- Email verification is optional for MVP (can be added later)
- MFA is optional during signup (can be enabled later in profile)

**Required Backend Endpoint** (if not exists):
```
POST /api/auth/register
Body: { firstName, lastName, email, password }
Response: { user, accessToken, refreshToken }
```

---

## Task 1: Add Register API Method

**Files:**
- Modify: `src/api/auth.js`

**Step 1: Add register method to authAPI**

Add this method to the `authAPI` object in `src/api/auth.js:28` (after the `login` method):

```javascript
  register: async (userData) => {
    const response = await client.post('/auth/register', userData);

    // Store tokens like login does
    if (response.data.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
    }
    if (response.data.refreshToken) {
      localStorage.setItem('refreshToken', response.data.refreshToken);
    }

    return response.data;
  },
```

**Step 2: Verify the file structure**

Run: `cat src/api/auth.js | grep -A 5 "login:"`

Expected: Should see the login method, and we'll add register after it

**Step 3: Commit**

```bash
git add src/api/auth.js
git commit -m "feat: add register API method"
```

---

## Task 2: Add Register Method to AuthContext

**Files:**
- Modify: `src/contexts/AuthContext.jsx`

**Step 1: Add register function to AuthContext**

Add this function inside the `AuthProvider` component at `src/contexts/AuthContext.jsx:42` (after the `login` function):

```javascript
  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await authAPI.register(userData);
      setUser(response.user);
      return { success: true };
    } catch (error) {
      console.error('Registration failed:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed. Please try again.',
      };
    } finally {
      setLoading(false);
    }
  };
```

**Step 2: Export register in value object**

Modify the value object at `src/contexts/AuthContext.jsx:108` to include `register`:

```javascript
  const value = {
    user,
    loading,
    login,
    register,  // Add this line
    logout,
    changePassword,
    setupMFA,
    verifyMFA,
    updateProfile,
    hasRole,
  };
```

**Step 3: Verify exports**

Run: `grep -n "const value" src/contexts/AuthContext.jsx`

Expected: Should show the value object with register included

**Step 4: Commit**

```bash
git add src/contexts/AuthContext.jsx
git commit -m "feat: add register method to AuthContext"
```

---

## Task 3: Create Signup Page Component

**Files:**
- Create: `src/pages/auth/Signup.jsx`

**Step 1: Write the signup page component**

Create `src/pages/auth/Signup.jsx` with this complete implementation:

```jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

export default function Signup() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const { confirmPassword, ...userData } = formData;
      const result = await register(userData);

      if (result.success) {
        toast.success('Account created successfully! Welcome!');
        navigate('/');
      } else {
        toast.error(result.message || 'Failed to create account');
      }
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img
              src="/logo.png"
              alt="Shepherd"
              className="h-12 w-auto"
            />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </Link>
          </p>
        </div>

        {/* Signup Form */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                autoComplete="given-name"
                value={formData.firstName}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.firstName ? 'border-red-300' : 'border-gray-300'
                } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                placeholder="John"
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                autoComplete="family-name"
                value={formData.lastName}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.lastName ? 'border-red-300' : 'border-gray-300'
                } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                placeholder="Doe"
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.email ? 'border-red-300' : 'border-gray-300'
                } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                placeholder="john.doe@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`block w-full px-3 py-2 border ${
                    errors.password ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm pr-10`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Must be at least 8 characters with uppercase, lowercase, and number
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`block w-full px-3 py-2 border ${
                    errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm pr-10`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Creating account...' : 'Create account'}
              </button>
            </div>
          </form>

          {/* Terms and Privacy */}
          <p className="mt-6 text-xs text-center text-gray-500">
            By creating an account, you agree to our{' '}
            <a href="#" className="text-blue-600 hover:text-blue-500">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-blue-600 hover:text-blue-500">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Verify file was created**

Run: `ls -la src/pages/auth/`

Expected: Should see both Login.jsx and Signup.jsx

**Step 3: Commit**

```bash
git add src/pages/auth/Signup.jsx
git commit -m "feat: create public signup page with validation"
```

---

## Task 4: Add Signup Route to App Router

**Files:**
- Modify: `src/App.jsx`

**Step 1: Import Signup component**

Add this import at the top of `src/App.jsx` with the other auth imports:

```javascript
import Signup from './pages/auth/Signup';
```

**Step 2: Add signup route**

Add this route in the Routes section, right after the login route:

```jsx
<Route path="/signup" element={<Signup />} />
```

**Step 3: Verify routes**

Run: `grep -n "Route path" src/App.jsx`

Expected: Should see /login and /signup routes listed

**Step 4: Commit**

```bash
git add src/App.jsx
git commit -m "feat: add signup route to app router"
```

---

## Task 5: Add Signup Link to Login Page

**Files:**
- Modify: `src/pages/auth/Login.jsx`

**Step 1: Find the login page structure**

Run: `grep -n "Don't have an account" src/pages/auth/Login.jsx`

Expected: Should show if there's already a signup link, or we'll add one

**Step 2: Add signup link to Login page**

Add or update the section below the login form to include a link to signup:

```jsx
<p className="mt-4 text-sm text-center text-gray-600">
  Don't have an account?{' '}
  <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
    Sign up
  </Link>
</p>
```

**Step 3: Ensure Link is imported**

Verify that `Link` is imported from react-router-dom at the top of the file:

```javascript
import { Link } from 'react-router-dom';
```

**Step 4: Commit**

```bash
git add src/pages/auth/Login.jsx
git commit -m "feat: add signup link to login page"
```

---

## Task 6: Manual Testing

**Step 1: Start development server**

Run: `npm run dev`

Expected: Dev server starts on http://localhost:5173

**Step 2: Test signup page navigation**

1. Navigate to http://localhost:5173/login
2. Click "Sign up" link
3. Verify redirects to /signup

Expected: Signup page renders with all form fields

**Step 3: Test form validation**

Test each validation rule:
1. Submit empty form → Should show all required field errors
2. Enter short name (1 char) → Should show min length error
3. Enter invalid email → Should show email format error
4. Enter short password (< 8 chars) → Should show password length error
5. Enter password without uppercase/lowercase/number → Should show password complexity error
6. Enter mismatched passwords → Should show "passwords do not match" error

Expected: All validation errors display correctly

**Step 4: Test successful signup** (requires backend)

1. Fill form with valid data:
   - First Name: John
   - Last Name: Doe
   - Email: john.doe@example.com
   - Password: Password123
   - Confirm Password: Password123
2. Click "Create account"

Expected (if backend ready):
- Loading state shows "Creating account..."
- Success toast appears
- Redirects to dashboard (/)
- User is logged in

Expected (if backend not ready):
- Error toast with API error message

**Step 5: Test UI/UX details**

1. Toggle password visibility icons → Should show/hide passwords
2. Type in fields with errors → Errors should clear on input
3. Test responsive design → Shrink browser, verify mobile layout
4. Test "Already have an account?" link → Should return to login

**Step 6: Document test results**

Create a checklist of what works and what needs backend support.

---

## Task 7: Final Verification & Build

**Step 1: Run linter**

Run: `npm run lint`

Expected: No new linting errors (existing unused vars are okay per user)

**Step 2: Run production build**

Run: `npm run build`

Expected: Build succeeds without errors

**Step 3: Preview production build**

Run: `npm run preview`

Navigate to preview URL and test signup flow again.

Expected: Works identically to dev mode

**Step 4: Final commit**

```bash
git add .
git commit -m "feat: complete public signup/registration feature"
```

---

## Post-Implementation Notes

**Backend Requirements:**
The following backend endpoint must be implemented for full functionality:

```
POST /api/auth/register
Request Body:
{
  "firstName": "string",
  "lastName": "string",
  "email": "string (valid email format)",
  "password": "string (min 8 chars, complexity rules)"
}

Response (Success - 201):
{
  "user": {
    "id": "string",
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "role": "VIEWER"
  },
  "accessToken": "string (JWT)",
  "refreshToken": "string (JWT)"
}

Response (Error - 400/409):
{
  "message": "Email already exists" | "Invalid input"
}
```

**Security Considerations:**
- Rate limiting on registration endpoint (prevent spam)
- Email verification flow (optional enhancement)
- CAPTCHA integration (optional enhancement)
- Password strength meter (optional enhancement)

**Future Enhancements:**
- Email verification before account activation
- Social authentication (Google, Facebook)
- Terms of Service and Privacy Policy modals
- Account creation success email
- Welcome onboarding flow

---

## DRY, YAGNI, TDD Compliance

**DRY (Don't Repeat Yourself):**
- Reuses existing auth patterns from Login page
- Leverages AuthContext infrastructure
- Shares validation patterns with UserForm

**YAGNI (You Aren't Gonna Need It):**
- No email verification (can add later if needed)
- No social auth (can add later if needed)
- No complex password strength meter (basic validation sufficient)
- No CAPTCHA (add only if spam becomes issue)

**TDD (Test-Driven Development):**
- Manual testing checklist provided in Task 6
- Frontend tests would require test framework (Vitest/Jest not configured)
- Form validation tested through manual interaction
- Backend endpoint testing separate concern

---

## Rollback Plan

If issues arise:

```bash
# View commit history
git log --oneline -10

# Rollback to before signup feature
git revert <commit-hash>

# Or reset completely
git reset --hard HEAD~7
```
