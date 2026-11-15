import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import SignInForm from '../components/auth/SignInForm';
import SignUpForm from '../components/auth/SignUpForm';
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../i18n';

export default function AuthPage({ defaultMode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { t } = useLanguage();

  const getModeFromPath = () => {
    if (defaultMode) return defaultMode;
    if (location.pathname === '/register' || location.pathname === '/signup') return 'signup';
    if (location.pathname === '/forgot-password' || location.pathname === '/forgot') return 'forgot';
    return 'signin';
  };

  const [mode, setMode] = useState(getModeFromPath);

  useEffect(() => {
    setMode(getModeFromPath());
  }, [location.pathname]);

  const handleSwitchMode = (newMode) => {
    setMode(newMode);
    if (newMode === 'signin') navigate('/login');
    else if (newMode === 'signup') navigate('/register');
    else if (newMode === 'forgot') navigate('/forgot-password');
  };

  const handleAuthSuccess = () => {
    navigate('/');
  };

  return (
    <AuthLayout activeTab={mode}>
      {/* If already authenticated, show an informative banner to quickly return to workspace */}
      {isAuthenticated && user && (
        <div className="mb-6 p-3.5 rounded-xl bg-forest/10 border border-forest/25 flex items-center justify-between gap-3 text-xs">
          <div>
            <p className="font-sans font-semibold text-forest flex items-center gap-1.5">
              <Sparkles size={13} />
              {t('auth.alreadySignedInAs', 'Already signed in as')} {user.name}
            </p>
            <p className="font-sans text-[11px] text-brown/60 mt-0.5">
              {t('auth.signedInHint', 'You can return directly to your artisan workspace or switch accounts below.')}
            </p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="flex-shrink-0 px-3 py-1.5 rounded-lg bg-forest text-ivory font-serif text-xs font-medium hover:bg-forest/90 transition-colors flex items-center gap-1"
          >
            {t('auth.goToWorkspace', 'Go to Workspace')}
            <ArrowRight size={12} />
          </button>
        </div>
      )}

      {mode === 'signin' && (
        <SignInForm
          onSwitchToSignUp={() => handleSwitchMode('signup')}
          onForgotPassword={() => handleSwitchMode('forgot')}
          onSuccess={handleAuthSuccess}
        />
      )}

      {mode === 'signup' && (
        <SignUpForm
          onSwitchToSignIn={() => handleSwitchMode('signin')}
          onSuccess={handleAuthSuccess}
        />
      )}

      {mode === 'forgot' && (
        <ForgotPasswordForm
          onSwitchToSignIn={() => handleSwitchMode('signin')}
        />
      )}
    </AuthLayout>
  );
}
