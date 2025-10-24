import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';
import { EyeIcon, EyeSlashIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import logoIcon from '../../assets/icon.png';

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
    <div className="min-h-screen flex items-center justify-center px-4 bg-neutral-50 relative">
      {/* Login Card */}
      <div className="relative z-10 max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 overflow-hidden">
          {/* Header */}
          <div className="p-8 text-center">
            <div className="inline-flex items-center justify-center mb-6">
              <img src={logoIcon} alt="Shepherd Logo" className="w-24 h-24 rounded-2xl shadow-md" />
            </div>
            <h2 className="text-2xl font-bold text-primary mb-2">
              Welcome to Shepherd
            </h2>
            <p className="text-sm text-neutral-600 font-medium">
              {requiresMFA ? 'Enter your verification code' : 'Sign in to manage your community'}
            </p>
          </div>

          {/* Form */}
          <div className="px-8 pb-8">
            <form className="space-y-4" onSubmit={handleSubmit}>
              {!requiresMFA ? (
                <>
                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-neutral-900 mb-2">
                      Email address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 rounded-xl text-sm text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                      placeholder="admin@church.org"
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-bold text-neutral-900 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 pr-12 bg-neutral-50 border border-neutral-300 rounded-xl text-sm text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-neutral-500 hover:text-neutral-700 transition-colors"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeSlashIcon className="h-5 w-5" />
                        ) : (
                          <EyeIcon className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div>
                  <div className="flex items-center justify-center mb-4">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <ShieldCheckIcon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <label htmlFor="mfaToken" className="block text-sm font-bold text-neutral-900 mb-2 text-center">
                    Enter your 6-digit verification code
                  </label>
                  <input
                    id="mfaToken"
                    name="mfaToken"
                    type="text"
                    required
                    value={mfaToken}
                    onChange={(e) => setMfaToken(e.target.value)}
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 rounded-xl text-center text-2xl tracking-widest font-bold text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    placeholder="000000"
                    maxLength={6}
                    autoFocus
                  />
                </div>
              )}

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-neutral-900 text-white font-bold text-base rounded-xl hover:bg-neutral-800 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
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
                    'Verify Code'
                  ) : (
                    'Sign in to Dashboard'
                  )}
                </button>
              </div>

              {requiresMFA && (
                <div className="text-center pt-3">
                  <button
                    type="button"
                    onClick={() => {
                      setRequiresMFA(false);
                      setMfaToken('');
                    }}
                    className="text-sm text-primary hover:text-primary-dark font-semibold transition-colors"
                  >
                    ← Back to login
                  </button>
                </div>
              )}
            </form>

            {/* Test credentials */}
            <div className="mt-6 p-4 bg-neutral-100 rounded-xl border border-neutral-200">
              <p className="text-sm font-bold text-neutral-900 mb-2">Test Credentials:</p>
              <p className="text-sm text-neutral-700 font-mono mb-1">admin@church.org</p>
              <p className="text-sm text-neutral-700 font-mono">Admin123!</p>
            </div>
          </div>
        </div>

        {/* Footer text */}
        <p className="mt-6 text-center text-sm font-medium text-neutral-600">
          Secure church member management platform
        </p>
      </div>
    </div>
  );
};
