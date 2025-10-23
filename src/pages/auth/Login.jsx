import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mfaToken, setMfaToken] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [requiresMFA, setRequiresMFA] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (requiresMFA) {
        // Handle MFA verification
        await login({ email, password, mfaToken });
        toast.success('Login successful!');
        navigate(from, { replace: true });
      } else {
        // Initial login attempt
        const response = await login({ email, password });

        if (response.requiresMFA) {
          setRequiresMFA(true);
          toast.success('Please enter your MFA token');
        } else {
          toast.success('Login successful!');
          navigate(from, { replace: true });
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      const message = error.response?.data?.message || 'Invalid credentials';
      toast.error(message);
      setRequiresMFA(false);
      setMfaToken('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Shepherd
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to your account
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                disabled={requiresMFA}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  disabled={requiresMFA}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pr-10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {requiresMFA && (
              <div>
                <label htmlFor="mfaToken" className="block text-sm font-medium text-gray-700 mb-1">
                  MFA Token
                </label>
                <input
                  id="mfaToken"
                  name="mfaToken"
                  type="text"
                  required
                  value={mfaToken}
                  onChange={(e) => setMfaToken(e.target.value)}
                  className="input-field"
                  placeholder="Enter your 6-digit code"
                  maxLength={6}
                />
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing in...
                </>
              ) : requiresMFA ? (
                'Verify MFA'
              ) : (
                'Sign in'
              )}
            </button>
          </div>

          {requiresMFA && (
            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setRequiresMFA(false);
                  setMfaToken('');
                }}
                className="text-sm text-accent hover:text-accent-hover"
              >
                Back to login
              </button>
            </div>
          )}
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          <p>Test credentials:</p>
          <p className="mt-1">admin@church.org / Admin123!</p>
        </div>
      </div>
    </div>
  );
};
