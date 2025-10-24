import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button, Input, Alert, LoadingSpinner } from '../../components/ui';
import { ShieldCheckIcon, QrCodeIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

/**
 * MFASetup Component
 *
 * Configure two-factor authentication
 */
export const MFASetup = ({ isEnabled, onSuccess }) => {
  const { setupMFA, verifyMFA } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(isEnabled ? 'enabled' : 'initial');
  const [qrCode, setQrCode] = useState('');
  const [secret, setSecret] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

  const handleSetupMFA = async () => {
    setLoading(true);
    setError('');

    try {
      const data = await setupMFA();
      setQrCode(data.qrCode);
      setSecret(data.secret);
      setStep('setup');
    } catch (err) {
      setError(err.message || 'Failed to setup MFA');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyMFA = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await verifyMFA(verificationCode);
      toast.success('Two-factor authentication enabled successfully!');
      setStep('enabled');
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.message || 'Invalid verification code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDisableMFA = async () => {
    // This would require another API call
    toast.info('Please contact support to disable MFA');
  };

  if (step === 'enabled' && isEnabled) {
    return (
      <div className="space-y-4">
        <div className="text-center py-6">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <ShieldCheckIcon className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">
            MFA is Enabled
          </h3>
          <p className="text-sm text-neutral-600">
            Your account is protected with two-factor authentication
          </p>
        </div>

        <Alert
          variant="info"
          message="Two-factor authentication adds an extra layer of security by requiring a code from your authenticator app in addition to your password."
        />

        <div className="pt-4 border-t border-neutral-200">
          <Button
            variant="outline"
            fullWidth
            onClick={handleDisableMFA}
          >
            Disable MFA
          </Button>
        </div>
      </div>
    );
  }

  if (step === 'initial') {
    return (
      <div className="space-y-4">
        <div className="text-center py-6">
          <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
            <ShieldCheckIcon className="h-8 w-8 text-indigo-600" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">
            Secure Your Account
          </h3>
          <p className="text-sm text-neutral-600">
            Add two-factor authentication for enhanced security
          </p>
        </div>

        <Alert
          variant="info"
          title="What is Two-Factor Authentication?"
          message="Two-factor authentication (2FA) adds an extra layer of security by requiring a verification code from your phone in addition to your password."
        />

        <div className="bg-neutral-50 rounded-lg p-4 space-y-2">
          <h4 className="font-semibold text-neutral-900 text-sm">How it works:</h4>
          <ol className="text-sm text-neutral-600 space-y-1 list-decimal list-inside">
            <li>Install an authenticator app (Google Authenticator, Authy, etc.)</li>
            <li>Scan the QR code with your app</li>
            <li>Enter the verification code to confirm</li>
            <li>Use the code from your app when logging in</li>
          </ol>
        </div>

        {error && (
          <Alert variant="error" message={error} />
        )}

        <Button
          variant="primary"
          fullWidth
          onClick={handleSetupMFA}
          loading={loading}
          disabled={loading}
        >
          {loading ? 'Setting up...' : 'Enable Two-Factor Authentication'}
        </Button>
      </div>
    );
  }

  if (step === 'setup') {
    return (
      <form onSubmit={handleVerifyMFA} className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">
            Scan QR Code
          </h3>
          <p className="text-sm text-neutral-600 mb-4">
            Use your authenticator app to scan this QR code
          </p>

          {qrCode ? (
            <div className="inline-block p-4 bg-white rounded-lg border-2 border-neutral-200">
              <img src={qrCode} alt="QR Code" className="w-48 h-48" />
            </div>
          ) : (
            <div className="inline-flex items-center justify-center w-48 h-48 bg-neutral-100 rounded-lg">
              <QrCodeIcon className="h-16 w-16 text-neutral-400" />
            </div>
          )}
        </div>

        {secret && (
          <div className="bg-neutral-50 rounded-lg p-4">
            <p className="text-xs text-neutral-600 mb-2">
              Can't scan? Enter this code manually:
            </p>
            <div className="flex items-center justify-between bg-white rounded border border-neutral-200 px-3 py-2">
              <code className="text-sm font-mono text-neutral-900">{secret}</code>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(secret);
                  toast.success('Secret copied to clipboard');
                }}
              >
                Copy
              </Button>
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-neutral-200">
          <Input
            label="Verification Code"
            name="verificationCode"
            type="text"
            placeholder="Enter 6-digit code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            required
            helpText="Enter the 6-digit code from your authenticator app"
            maxLength={6}
          />
        </div>

        {error && (
          <Alert variant="error" message={error} />
        )}

        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            fullWidth
            onClick={() => setStep('initial')}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={loading}
            disabled={loading || verificationCode.length !== 6}
          >
            {loading ? 'Verifying...' : 'Verify & Enable'}
          </Button>
        </div>
      </form>
    );
  }

  return null;
};
